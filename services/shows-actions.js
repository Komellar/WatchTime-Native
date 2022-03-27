import {
  getDatabase,
  ref,
  set,
  push,
  remove,
  onValue,
  update,
} from 'firebase/database';
import { showsActions } from '../store/shows-slice';

//
// FAVOURITE SHOW
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
// FOLLOWED SHOWS
//

export const addShowToDB = (userId, show) => {
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
    });
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
          showsActions.updateList({ showList: convertedData, idList: idList })
        );
      }
    });
  };
};

//
///////////// EPISODES ////////////
//

const updateWatchedCount = (userId, show, add) => {
  const db = getDatabase();
  let watchedCount = 0;
  const watchedCountRef = ref(db, `users/${userId}/followed/${show.id}`);

  // get data from show in user list in database
  onValue(watchedCountRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      // if there is some data
      watchedCount = parseInt(data.watchedCount);
      add ? watchedCount++ : watchedCount--;
    } else {
      // if no data then watchedCount = 1
      if (add) {
        watchedCount = 1;
      }
    }
  });

  // update data in database
  update(ref(db, `users/${userId}/followed/${show.id}`), {
    watchedCount: watchedCount,
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
  updateWatchedCount(userId, show, true);
};

// export const addEpisodeToDB = (userId, show, episode) => {
//   const db = getDatabase();

//   update(
//     ref(
//       db,
//       `users/${userId}/followed/${show.id}/seasons/${episode.season}/${episode.id}`
//     ),
//     {
//       id: episode.id,
//       episode: episode.episode,
//     }
//   );
//   updateWatchedCount(userId, show, true);
// };

export const removeEpisodeFromDB = (userId, show, episode) => {
  const db = getDatabase();
  set(
    ref(
      db,
      `users/${userId}/followed/${show.id}/seasons/${episode.season}/${episode.id}`
    ),
    {}
  );
  updateWatchedCount(userId, show, false);
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
    updateWatchedCount(userId, show, true);
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
      // return idList;
      dataToReturn = idList;
      // setWatchedEpisodes(idList);
    }
    // else {
    // return [];
    // setWatchedEpisodes([]);
    // }
  });
  // console.log('dataToReturn: ', dataToReturn);
  return dataToReturn;
};
