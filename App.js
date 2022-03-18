import 'react-native-gesture-handler';
import { StyleSheet, View, Platform, StatusBar, Text } from 'react-native';
import RootNavigation, { OnboardNavigation } from './navigation';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from './constants/index';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_500Medium,
} from '@expo-google-fonts/roboto';

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_500Medium,
  });

  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value === null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading</Text>
      </View>
    );
  } else {
    if (isFirstLaunch === null) {
      return null;
    } else if (isFirstLaunch === true) {
      return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <OnboardNavigation />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <RootNavigation />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGray,
    // backgroundColor: COLORS.background,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
