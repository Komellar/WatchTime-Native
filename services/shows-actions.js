import {
  getDatabase,
  ref,
  set,
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
