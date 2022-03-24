import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { authActions } from '../store/auth-slice';

export const getCurrentUser = () => {
  return (dispatch) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const displayName = user.displayName;
        const uid = user.uid;
        const userImg = user.photoURL;
        dispatch(authActions.setCurrentUser({ displayName, uid, userImg }));
      }
    });
  };
};
