import { getDatabase, ref, set, get, child, update } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { authActions } from '../store/auth-slice';

const getUserPremiumStatus = async (userId) => {
  let premiumBoolean = false;

  const dbRef = ref(getDatabase());
  await get(child(dbRef, `users/${userId}/info/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        premiumBoolean = snapshot.val().isPremium;
      } else {
        console.log('No user found');
      }
    })
    .catch((error) => {
      console.error(error);
    });

  return premiumBoolean;
};

export const getCurrentUser = () => {
  return (dispatch) => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { displayName, uid, photoURL: userImg } = user;
        const isPremium = await getUserPremiumStatus(uid);
        dispatch(
          authActions.setCurrentUser({ displayName, uid, userImg, isPremium })
        );
      } else {
        dispatch(
          authActions.setCurrentUser({
            displayName: null,
            uid: null,
            userImg: null,
            isPremium: undefined,
            isLoggedIn: false,
          })
        );
      }
    });
  };
};

export const setNewUser = async (userId, displayName, userImg) => {
  const db = getDatabase();
  set(ref(db, `users/${userId}/info/`), {
    userId,
    displayName,
    userImg,
    isPremium: false,
  });
};

export const setUserAsPremium = (userId) => {
  return (dispatch) => {
    const db = getDatabase();
    update(ref(db, `users/${userId}/info/`), {
      isPremium: true,
    });

    dispatch(authActions.updateToPremium());
  };
};
