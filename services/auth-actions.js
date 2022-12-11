import { getDatabase, ref, set, onValue, update } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { authActions } from '../store/auth-slice';

const getUserPremiumStatus = async (userId) => {
  const db = getDatabase();
  const userRef = ref(db, `users/${userId}/info/`);

  onValue(userRef, (snapshot) => {
    const data = snapshot.val();

    if (data) {
      return data.isPremium;
    }
  });
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
