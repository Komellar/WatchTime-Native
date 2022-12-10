import {
  getDatabase,
  ref,
  set,
  remove,
  onValue,
  update,
  get,
  child,
} from 'firebase/database';
import { showsActions } from '../store/shows-slice';
import { statsActions } from '../store/stats-slice';

const updateGenres = (userId, genresList, add) => {
  const db = getDatabase();
  const dbRef = ref(db);

  let loadedGenres = {};

  // get number of shows with each genre
  get(child(dbRef, `users/${userId}/stats/genres`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        loadedGenres = snapshot.val();
      }
    })
    .then(() => {
      // for each genre in show - update count
      genresList.forEach((genre) => {
        let newValue;

        if (loadedGenres[genre]) {
          newValue = add ? loadedGenres[genre] + 1 : loadedGenres[genre] - 1;
        } else {
          newValue = add ? 1 : 0;
        }

        if (newValue !== 0) {
          update(ref(db, `users/${userId}/stats/genres`), {
            [genre]: newValue,
          });
        } else {
          set(ref(db, `users/${userId}/stats/genres/${genre}`), {});
        }
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

//
///////////// FAVOURITE SHOWS ////////////
//
export const addToFavourite = (userId, show) => {
  return (dispatch) => {
    // add show to favourite list in app state in store
    dispatch(showsActions.addToFav(show));

    // add to database
    const db = getDatabase();
    set(ref(db, `users/${userId}/favourite/${show.id}`), {
      id: show.id,
      title: show.title,
      image: show.image,
    });
  };
};

export const removeShowFromFav = (userId, show) => {
  return (dispatch) => {
    // remove show from favourite list in app state in store
    dispatch(showsActions.removeFromFavList(show));

    // remove from database
    const db = getDatabase();
    remove(ref(db, `users/${userId}/favourite/${show.id}`));
  };
};

export const getFavShowsList = (userId) => {
  return (dispatch) => {
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}/favourite`);

    // get data from database reference
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();

      // if user has favourite shows
      if (data) {
        // convert data to array
        const convertedData = Object.values(data);
        const idList = [];

        // get id list of favourite shows
        convertedData.forEach((show) => {
          idList.push(show.id);
        });

        // update favourite shows list in app state in store
        dispatch(
          showsActions.updateFavList({
            showList: convertedData,
            idList: idList,
          })
        );
      }
    });
  };
};

//
///////////// FOLLOWED SHOWS ////////////
//

export const addShowToDB = (userId, show, numberOfEpisodes) => {
  return (dispatch) => {
    // add show to app state in store
    dispatch(showsActions.addToList(show));

    // add show to database
    const db = getDatabase();
    set(ref(db, `users/${userId}/followed/${show.id}`), {
      id: show.id,
      title: show.title,
      image: show.image,
      watchedCount: 0,
      runtime: show.averageRuntime,
      watchStatus: 'notStarted',
      episodes: numberOfEpisodes,
      timeSpent: 0,
    });

    updateGenres(userId, show.genres, true);
  };
};

export const removeShowFromDB = (userId, show) => {
  return (dispatch) => {
    // remove show from showsList and favourites shows in app state in store
    dispatch(showsActions.removeFromList(show));

    // remove show from database
    const db = getDatabase();
    remove(ref(db, `users/${userId}/followed/${show.id}`));
    dispatch(removeShowFromFav(userId, show));

    updateGenres(userId, show.genres, false);
  };
};

export const getShowsList = (userId) => {
  return (dispatch) => {
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}/followed`);

    // get data from database reference
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();

      // if user has followed shows
      if (data) {
        // convert data to array
        const convertedData = Object.values(data);
        const idList = [];

        // add id of each show to array
        convertedData.forEach((show) => {
          idList.push(show.id);
        });

        // update shows list in app state in store
        dispatch(
          showsActions.updateList({ showsList: convertedData, idList: idList })
        );
      }
    });
  };
};

//
///////////// EPISODES ////////////
//

const updateWatchedCountAndStatus = (userId, show, add) => {
  const db = getDatabase();
  let watchedCount = 0;
  let episodes = 0;
  const watchedCountRef = ref(db, `users/${userId}/followed/${show.id}`);

  // get show data from database
  onValue(watchedCountRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      watchedCount = parseInt(data.watchedCount);
      episodes = parseInt(data.episodes);
      add ? (watchedCount += 1) : (watchedCount -= 1);
    }
  });

  // update watchedCount in database
  update(ref(db, `users/${userId}/followed/${show.id}`), {
    watchedCount: watchedCount,
  }).then(() => {
    add ? watchedCount-- : watchedCount++;

    // change watching status
    const updateRef = ref(db, `users/${userId}/followed/${show.id}`);

    if (watchedCount === episodes) {
      update(updateRef, { watchStatus: 'finished' });
    } else if (watchedCount === 0) {
      update(updateRef, { watchStatus: 'notStarted' });
    } else if (watchedCount > 0) {
      update(updateRef, { watchStatus: 'started' });
    }
  });
};

const updateTimeSpent = (userId, show, add, episodeDuration) => {
  const db = getDatabase();
  const watchedCountRef = ref(db, `users/${userId}/followed/${show.id}`);
  let timeSpent = 0;

  // get show data from database
  onValue(watchedCountRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      timeSpent = parseInt(data.timeSpent);
    }
  });

  add ? (timeSpent += episodeDuration) : (timeSpent -= episodeDuration);

  // update watchedCount in database
  update(ref(db, `users/${userId}/followed/${show.id}`), {
    timeSpent: timeSpent,
  });
};

export const addEpisodeToDB = (userId, show, episode) => {
  const db = getDatabase();
  set(
    ref(
      db,
      `users/${userId}/followed/${show.id}/seasons/${episode.season}/${episode.id}`
    ),
    {
      id: episode.id,
      episode: episode.episode,
    }
  );
  updateWatchedCountAndStatus(userId, show, true);
  updateTimeSpent(userId, show, true, episode.runtime);
};

export const removeEpisodeFromDB = (userId, show, episode) => {
  const db = getDatabase();
  set(
    ref(
      db,
      `users/${userId}/followed/${show.id}/seasons/${episode.season}/${episode.id}`
    ),
    {}
  );
  updateWatchedCountAndStatus(userId, show, false);
  updateTimeSpent(userId, show, false, episode.runtime);
};

export const addSeasonToDB = (userId, show, season) => {
  const db = getDatabase();

  // for each episode in season add it to database
  season.forEach((episode) => {
    set(
      ref(
        db,
        `users/${userId}/followed/${show.id}/seasons/${episode.season}/${episode.id}`
      ),
      {
        id: episode.id,
        episode: episode.episode,
      }
    );
    updateWatchedCountAndStatus(userId, show, true);
    updateTimeSpent(userId, show, true, episode.runtime);
  });
};

export const removeSeasonFromDB = (userId, show, season) => {
  const db = getDatabase();
  season.forEach((episode) => {
    set(
      ref(
        db,
        `users/${userId}/followed/${show.id}/seasons/${episode.season}/${episode.id}`
      ),
      {}
    );
    updateWatchedCountAndStatus(userId, show, false);
    updateTimeSpent(userId, show, false, episode.runtime);
  });
};

export const getWatchedEpisodes = (userId, show, season) => {
  const db = getDatabase();
  const seasonRef = ref(
    db,
    `users/${userId}/followed/${show.id}/seasons/${season}/`
  );

  let dataToReturn = [];
  onValue(seasonRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const convertedData = Object.values(data);
      const idList = [];
      convertedData.forEach((episode) => {
        idList.push(episode.id);
      });
      dataToReturn = idList;
    }
  });
  return dataToReturn;
};

//
///////////// STATISTICS ////////////
//

export const getWatchCount = (userId, show) => {
  const db = getDatabase();
  let watchedCount = 0;
  let timeSpent = 0;

  const watchedCountRef = ref(db, `users/${userId}/followed/${show.id}`);
  onValue(watchedCountRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      watchedCount = parseInt(data.watchedCount);
      timeSpent = parseInt(data.timeSpent);
    }
  });
  return { watchedCount, timeSpent };
};

export const getGenres = (userId) => {
  return (dispatch) => {
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}/stats/genres`);

    onValue(userRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        dispatch(statsActions.updateGenres(data));
      }
    });
  };
};

export const getMostWatchedShow = (userId) => {
  return (dispatch) => {
    const db = getDatabase();

    const userRef = ref(db, `users/${userId}/followed`);

    // get data from database reference
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();

      // if user has followed shows
      if (data) {
        // convert data to array
        const convertedData = Object.values(data);

        let mostWatchedShow;
        let mostEpisodes = 0;

        convertedData.forEach((show) => {
          if (show.watchedCount > mostEpisodes) {
            mostEpisodes = show.watchedCount;
            mostWatchedShow = {
              id: show.id,
              watchedCount: show.watchedCount,
              title: show.title,
              image: show.image,
            };
          }
        });

        dispatch(statsActions.setMostWatched(mostWatchedShow));
      }
    });
  };
};

//
///////////// SHOW RATING ////////////
//

export const addComment = (user, showId, stars, comment, date) => {
  const db = getDatabase();
  set(ref(db, `shows/${showId}/comments/${user.userId}`), {
    userId: user.userId,
    userName: user.userName,
    userImg: user.userImg,
    stars,
    comment,
    date,
  });
};

export const getUserComment = async (userId, showId) => {
  const dbRef = ref(getDatabase());
  const snapshot = await get(
    child(dbRef, `shows/${showId}/comments/${userId}`)
  );
  return snapshot.exists() ? snapshot.val() : null;
};

export const getShowComments = async (showId) => {
  const dbRef = ref(getDatabase());

  const snapshot = await get(child(dbRef, `shows/${showId}/comments`));

  if (snapshot.exists()) {
    const data = snapshot.val();

    if (data) {
      // convert data to array
      const convertedData = Object.values(data);

      let sum = 0;
      convertedData.forEach((comment) => {
        sum += comment?.stars;
      });

      const average = Number((sum / convertedData.length).toFixed(1));
      return { comments: convertedData, average };
    }
  }

  return { comments: [], average: 0 };
};
