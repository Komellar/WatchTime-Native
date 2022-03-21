import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import useInput from '../hooks/use-intput';
import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';

const Auth = ({ navigation }) => {
  const [isLogging, setIsLogging] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);
  const [authError, setAuthError] = useState(null);

  const [avatarImage, setAvatarImage] = useState(
    `https://avatars.dicebear.com/api/avataaars/smil4e12ya2.svg`
  );

  const changeAvatarHandler = () => {
    setAvatarImage(
      `https://avatars.dicebear.com/api/avataaars/${Math.random()
        .toString(36)
        .substr(2, 5)}.svg`
    );
  };

  const {
    inputValue: enteredName,
    isTouched: nameIsTouched,
    isValid: nameIsValid,
    error: nameError,
    changeValue: nameChangeHandler,
    checkValidity: nameCheckHandler,
  } = useInput(
    (value) => /^(?!\s)[A-Za-z_][A-Za-z0-9_():'"#^.?,!\s]+$/.test(value),
    'Invalid username'
  );

  const {
    inputValue: enteredEmail,
    isTouched: emailIsTouched,
    isValid: emailIsValid,
    error: emailError,
    changeValue: emailChangeHandler,
    checkValidity: emailCheckHandler,
  } = useInput((value) => /^\S+@\S+\.\S+$/.test(value), 'Invalid email!');

  const {
    inputValue: enteredPassword,
    isTouched: passwordIsTouched,
    isValid: passwordIsValid,
    error: passwordError,
    changeValue: passwordChangeHandler,
    checkValidity: passwordCheckHandler,
  } = useInput();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (
        isLogging &&
        // emailIsTouched &&
        emailIsValid &&
        // passwordIsTouched &&
        passwordIsValid
      ) {
        setFormIsValid(true);
      } else if (
        !isLogging &&
        // nameIsTouched &&
        nameIsValid &&
        // emailIsTouched &&
        emailIsValid &&
        // passwordIsTouched &&
        passwordIsValid
      ) {
        setFormIsValid(true);
      } else {
        setFormIsValid(false);
      }
    }

    return () => (mounted = false);
  }, [
    isLogging,
    // nameIsTouched,
    nameIsValid,
    // emailIsTouched,
    emailIsValid,
    // passwordIsTouched,
    passwordIsValid,
  ]);

  const submitFormHandler = async () => {
    setAuthError(null);

    if (formIsValid) {
      const auth = getAuth();
      if (isLogging) {
        try {
          // await setPersistence(auth, browserLocalPersistence);
          await signInWithEmailAndPassword(auth, enteredEmail, enteredPassword);
        } catch (err) {
          if (err.code === 'auth/user-not-found') {
            setAuthError('USER NOT FOUND!!!');
          } else if (err.code === 'auth/wrong-password') {
            setAuthError('WRONG PASSWORD!!!');
          }
        }
      } else {
        try {
          // await setPersistence(auth, browserLocalPersistence);
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
          }
        }
      }
      try {
        const user = auth.currentUser;
        if (user !== null) {
          const displayName = user.displayName;
          const uid = user.uid;
          const userImg = user.photoURL;
          // dispatch(authActions.setCurrentUser({ displayName, uid, userImg }));
          // isLogging ? history.push('/profile') : history.push('/choosing');
          navigation.navigate('Profile');
        }
      } catch (err) {
        setAuthError('FAILED TO GET LOGIN');
        console.log('error loging', err);
      }
    } else {
      if (inputError) console.log(inputError);
    }
  };

  let inputError = null;
  if (passwordError) {
    inputError = `Password: ${passwordError}`;
  } else if (emailError) {
    inputError = `Email: ${emailError}`;
  } else if (nameError) {
    inputError = `Username: ${nameError}`;
  }

  if (authError) console.log(authError);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {isLogging ? 'Welcome back' : 'Create an account'}
      </Text>
      {/* Form inputs */}
      {isLogging && (
        <>
          <View style={styles.form_control}>
            <Ionicons name="mail" size={26} color="white" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              // ref={emailInputRef}
              value={enteredEmail}
              onChangeText={(text) => emailChangeHandler(text)}
              // onChangeText={() =>
              //   emailChangeHandler(emailInputRef.current.value)
              // }
              onBlur={emailCheckHandler}
              placeholderTextColor={COLORS.lightGray}
            />
          </View>
          <View style={styles.form_control}>
            <Ionicons name="ios-lock-closed" size={26} color="white" />
            <TextInput
              style={styles.input}
              placeholderTextColor={COLORS.lightGray}
              secureTextEntry={true}
              placeholder="Password"
              // ref={passwordInputRef}
              value={enteredPassword}
              onChangeText={(text) => passwordChangeHandler(text)}
              onBlur={passwordCheckHandler}
            />
          </View>
        </>
      )}
      {/*  */}
      {/*  */}
      {/*  */}
      {!isLogging && (
        <>
          <View style={styles.form_control}>
            <FontAwesome5 name="user-alt" size={24} color="white" />
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={enteredName}
              onChangeText={(text) => nameChangeHandler(text)}
              onBlur={nameCheckHandler}
              placeholderTextColor={COLORS.lightGray}
            />
          </View>
          <View style={styles.form_control}>
            <Ionicons name="mail" size={26} color="white" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={enteredEmail}
              onChangeText={(text) => emailChangeHandler(text)}
              onBlur={emailCheckHandler}
              placeholderTextColor={COLORS.lightGray}
            />
          </View>
          <View style={styles.form_control}>
            <Ionicons name="ios-lock-closed" size={26} color="white" />
            <TextInput
              style={styles.input}
              placeholderTextColor={COLORS.lightGray}
              secureTextEntry={true}
              placeholder="Password"
              value={enteredPassword}
              onChangeText={(text) => passwordChangeHandler(text)}
              onBlur={passwordCheckHandler}
            />
          </View>
          {/* <View style={styles.form_control}>
            <Ionicons name="ios-lock-closed" size={26} color="white" />
            <TextInput
              style={styles.input}
              placeholderTextColor={COLORS.lightGray}
              secureTextEntry={true}
              placeholder="Repeat Password"
              onChangeText={() => {}}
            />
          </View> */}
        </>
      )}
      {/* Buttons */}
      <TouchableOpacity
        onPress={() => submitFormHandler()}
        style={{
          width: (SIZES.width * 80) / 100,
          backgroundColor: COLORS.primary,
          marginTop: SIZES.xxl,
          paddingHorizontal: SIZES.xxxl,
          paddingVertical: SIZES.m,
          borderRadius: SIZES.xxl,
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h4,
            fontSize: 22,
            lineHeight: 24,
            alignSelf: 'center',
          }}
        >
          {isLogging ? 'Sign In' : 'Sign Up'}
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          color: COLORS.lightGray,
          marginVertical: SIZES.m,
          ...FONTS.body4,
        }}
      >
        OR
      </Text>
      <TouchableOpacity
        onPress={() => {
          setIsLogging(!isLogging);
        }}
      >
        <Text
          style={{
            color: COLORS.onDark,
            ...FONTS.h4,
            fontSize: 20,
            lineHeight: 24,
            alignSelf: 'center',
          }}
        >
          {isLogging ? 'Create an account' : 'Already have an account'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
  },
  header: {
    color: COLORS.white,
    ...FONTS.h2,
    marginTop: SIZES.xxxl,
    marginBottom: SIZES.xxl,
  },
  input: {
    width: (SIZES.width * 80) / 100,
    height: 40,
    ...FONTS.body3,
    letterSpacing: 0.2,
    paddingLeft: SIZES.m,
    color: COLORS.white,
  },
  form_control: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.l,
    borderBottomWidth: 1,
    borderColor: COLORS.onDark,
  },
});

export default Auth;
