import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { SIZES, COLORS, FONTS } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { SvgUri } from 'react-native-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Register = ({
  username,
  email,
  password,
  password2,
  showErrors,
  setShowErrors,
  avatarImage,
  changeAvatarHandler,
  authError,
}) => {
  const [nameActive, setNameActive] = useState(false);
  const [emailActive, setEmailActive] = useState(false);
  const [pwdActive, setPwdActive] = useState(false);
  const [pwd2Active, setPwd2Active] = useState(false);

  return (
    <>
      {/* Avatar picker */}
      <View
        style={{
          padding: SIZES.s,
          marginBottom: SIZES.xl,
          width: 150,
          height: 150,
          alignItems: 'center',
        }}
      >
        <SvgUri width="100%" height="100%" uri={avatarImage} />
        <TouchableOpacity
          onPress={() => changeAvatarHandler()}
          style={{
            marginTop: -14,
            backgroundColor: COLORS.gray,
            borderRadius: 50,
            padding: 4,
          }}
        >
          <MaterialCommunityIcons
            name="reload"
            size={24}
            color={COLORS.onDark}
          />
        </TouchableOpacity>
      </View>

      {/* Authentication error */}
      {authError && <Text style={styles.auth_error}>{authError}</Text>}

      {/* Inputs */}
      {/* Username */}
      <View style={styles.form_control}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: SIZES.s,
            borderBottomWidth: 1,
            borderBottomColor: nameActive ? COLORS.primaryLight : COLORS.onDark,
          }}
        >
          <FontAwesome5 name="user-alt" size={24} color="white" />
          <TextInput
            style={styles.input}
            placeholderTextColor={COLORS.lightGray}
            placeholder="Username"
            value={username.enteredName}
            onChangeText={(text) => {
              username.nameChangeHandler(text);
              setShowErrors(false);
            }}
            onFocus={() => setNameActive(true)}
            onBlur={() => setNameActive(false)}
          />
        </View>
        {username.nameError && showErrors && (
          <Text style={styles.input_error}>{username.nameError}</Text>
        )}
      </View>

      {/* Email */}
      <View style={styles.form_control}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: SIZES.s,
            borderBottomWidth: 1,
            borderBottomColor: emailActive
              ? COLORS.primaryLight
              : COLORS.onDark,
          }}
        >
          <Ionicons name="mail" size={26} color="white" />
          <TextInput
            style={styles.input}
            placeholderTextColor={COLORS.lightGray}
            placeholder="Email"
            keyboardType="email-address"
            value={email.enteredEmail}
            onChangeText={(text) => {
              email.emailChangeHandler(text);
              setShowErrors(false);
            }}
            onFocus={() => setEmailActive(true)}
            onBlur={() => setEmailActive(false)}
          />
        </View>
        {email.emailError && showErrors && (
          <Text style={styles.input_error}>{email.emailError}</Text>
        )}
      </View>

      {/* Password */}
      <View style={styles.form_control}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: SIZES.s,
            borderBottomWidth: 1,
            borderBottomColor: pwdActive ? COLORS.primaryLight : COLORS.onDark,
          }}
        >
          <Ionicons name="ios-lock-closed" size={26} color="white" />
          <TextInput
            style={styles.input}
            placeholderTextColor={COLORS.lightGray}
            secureTextEntry={true}
            placeholder="Password"
            value={password.enteredPassword}
            onChangeText={(text) => {
              password.passwordChangeHandler(text);
              setShowErrors(false);
            }}
            onFocus={() => setPwdActive(true)}
            onBlur={() => setPwdActive(false)}
          />
        </View>
        {password.passwordError && showErrors && (
          <Text style={styles.input_error}>{password.passwordError}</Text>
        )}
      </View>

      {/* Password Repeat */}
      <View style={styles.form_control}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: SIZES.s,
            borderBottomWidth: 1,
            borderBottomColor: pwd2Active ? COLORS.primaryLight : COLORS.onDark,
          }}
        >
          <Ionicons name="ios-lock-closed" size={26} color="white" />
          <TextInput
            style={styles.input}
            placeholderTextColor={COLORS.lightGray}
            secureTextEntry={true}
            placeholder="Repeat Password"
            value={password2.enteredPassword2}
            onChangeText={(text) => {
              password2.password2ChangeHandler(text);
              setShowErrors(false);
            }}
            onFocus={() => setPwd2Active(true)}
            onBlur={() => setPwd2Active(false)}
          />
        </View>
        {password.passwordError && showErrors && (
          <Text style={styles.input_error}>{password.passwordError}</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    width: (SIZES.width * 80) / 100,
    height: 40,
    ...FONTS.body3,
    letterSpacing: 0.2,
    paddingLeft: SIZES.m,
    color: COLORS.white,
  },
  form_control: {
    marginVertical: SIZES.m,
  },
  input_error: {
    color: COLORS.error,
    ...FONTS.h4,
  },
  auth_error: {
    marginBottom: SIZES.m,
    color: COLORS.error,
    ...FONTS.h4,
  },
});

export default Register;
