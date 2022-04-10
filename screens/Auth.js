import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import useInput from '../hooks/use-input';
import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import AuthButtons from '../components/auth/AuthButtons';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth-slice';

const Auth = ({ navigation }) => {
  const [isLogging, setIsLogging] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [showErrors, setShowErrors] = useState(false);

  const [avatarImage, setAvatarImage] = useState(
    `https://avatars.dicebear.com/api/avataaars/smil4e12ya2.svg?background=%23AF5FFD&radius=50`
  );

  const changeAvatarHandler = () => {
    setAvatarImage(
      `https://avatars.dicebear.com/api/avataaars/${Math.random()
        .toString(36)
        .substr(2, 5)}.svg?background=%23AF5FFD&radius=50`
    );
  };

  const {
    inputValue: enteredName,
    isValid: nameIsValid,
    error: nameError,
    changeValue: nameChangeHandler,
  } = useInput(
    (value) => /^(?!\s)[A-Za-z_][A-Za-z0-9_():'"#^.?,!\s]+$/.test(value),
    'Invalid username'
  );

  const {
    inputValue: enteredEmail,
    isValid: emailIsValid,
    error: emailError,
    changeValue: emailChangeHandler,
  } = useInput((value) => /^\S+@\S+\.\S+$/.test(value), 'Invalid email!');

  const {
    inputValue: enteredPassword,
    isValid: passwordIsValid,
    error: passwordError,
    changeValue: passwordChangeHandler,
  } = useInput();

  const {
    inputValue: enteredPassword2,
    isValid: password2IsValid,
    error: password2Error,
    changeValue: password2ChangeHandler,
  } = useInput();

  const usernameCollection = {
    enteredName,
    nameChangeHandler,
    nameError,
  };
  const emailCollection = {
    enteredEmail,
    emailChangeHandler,
    emailError,
  };
  const passwordCollection = {
    enteredPassword,
    passwordChangeHandler,
    passwordError,
  };
  const password2Collection = {
    enteredPassword2,
    password2ChangeHandler,
    password2Error,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (isLogging && emailIsValid && passwordIsValid) {
        setFormIsValid(true);
      } else if (
        !isLogging &&
        nameIsValid &&
        emailIsValid &&
        passwordIsValid &&
        password2IsValid &&
        enteredPassword === enteredPassword2
      ) {
        setFormIsValid(true);
      } else {
        setFormIsValid(false);
      }
    }

    return () => (mounted = false);
  }, [isLogging, nameIsValid, emailIsValid, passwordIsValid, password2IsValid]);

  // Handle submitting the form
  const submitFormHandler = async () => {
    console.log('logging...');
    setAuthError(null);
    setShowErrors(true);

    if (formIsValid) {
      const auth = getAuth();
      if (isLogging) {
        try {
          await signInWithEmailAndPassword(auth, enteredEmail, enteredPassword);
        } catch (err) {
          if (err.code === 'auth/user-not-found') {
            setAuthError('USER NOT FOUND!!!');
          } else if (err.code === 'auth/wrong-password') {
            setAuthError('WRONG PASSWORD!!!');
          } else {
            setAuthError(err.message);
          }
        }
      } else {
        try {
          await createUserWithEmailAndPassword(
            auth,
            enteredEmail,
            enteredPassword
          );
          await updateProfile(auth.currentUser, {
            displayName: enteredName,
            photoURL: avatarImage,
          });
        } catch (err) {
          if (err.code === 'auth/email-already-in-use') {
            setAuthError('EMAIL ALREADY EXISTS!!!');
          } else {
            setAuthError(err.message);
          }
        }
      }
      if (!authError) {
        try {
          const user = auth.currentUser;
          if (user !== null) {
            const displayName = user.displayName;
            const uid = user.uid;
            const userImg = user.photoURL;
            dispatch(authActions.setCurrentUser({ displayName, uid, userImg }));
            isLogging
              ? navigation.navigate('Profile', { useriId: uid })
              : navigation.navigate('FirstShows');
          }
        } catch (err) {
          setAuthError('FAILED TO GET LOGIN');
          console.log('error loging', err);
        }
      }
    } else {
      console.log('auth form not valid');
      if (!isLogging && enteredPassword !== enteredPassword2) {
        setAuthError('PASSWORDS MUST BE THE SAME!');
      }
    }
  };

  if (authError) console.log(authError);

  return (
    <ScrollView style={styles.scroll}>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={styles.wrapper}
      >
        <View style={styles.container}>
          <Text style={styles.header}>
            {isLogging ? 'Welcome back' : 'Create an account'}
          </Text>

          {/* Input Forms */}
          {isLogging && (
            <Login
              email={emailCollection}
              password={passwordCollection}
              showErrors={showErrors}
              setShowErrors={setShowErrors}
              authError={authError}
            />
          )}
          {!isLogging && (
            <Register
              username={usernameCollection}
              email={emailCollection}
              password={passwordCollection}
              password2={password2Collection}
              showErrors={showErrors}
              setShowErrors={setShowErrors}
              avatarImage={avatarImage}
              changeAvatarHandler={changeAvatarHandler}
              authError={authError}
            />
          )}

          <AuthButtons
            submitFormHandler={submitFormHandler}
            isLogging={isLogging}
            setIsLogging={setIsLogging}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    paddingBottom: 80,
  },
  wrapper: {
    flex: 1,
  },
  header: {
    color: COLORS.white,
    ...FONTS.h2,
    marginTop: SIZES.xxxl,
    marginBottom: SIZES.xxl,
  },
});

export default Auth;
