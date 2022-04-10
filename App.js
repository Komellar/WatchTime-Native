import 'react-native-gesture-handler';
import { StyleSheet, View, StatusBar, Text, Image } from 'react-native';
import RootNavigation from './navigation';
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from './constants/index';
import './services/firebase';
import { Provider } from 'react-redux';
import store from './store';
import { LogBox } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

LogBox.ignoreLogs([
  'Setting a timer for a long period of time',
  'AsyncStorage has been extracted from react-native core',
]);

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  let fonts = {
    Roboto_400Regular: require('./assets/fonts/Roboto-Regular.ttf'),
    Roboto_500Medium: require('./assets/fonts/Roboto-Medium.ttf'),
    Roboto_700Bold: require('./assets/fonts/Roboto-Bold.ttf'),
  };

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

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while fetching resources
        await SplashScreen.preventAutoHideAsync();

        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(fonts);

        // await new Promise((resolve) => setTimeout(resolve, 5000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <StatusBar barStyle="light-content" />
          <RootNavigation isFirstLaunch={isFirstLaunch} />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGray,
  },
});
