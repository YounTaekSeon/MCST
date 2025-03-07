/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import WebViewScreen from './src/screen/WebViewScreen';
import Toast from 'react-native-toast-message';
import { KToast } from './src/component/KToast';
import { NativeHelper } from './src/util/NativeHelper';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const deviceInfo = NativeHelper.getDeviceModel;
  const deviceNumber = NativeHelper.getPhoneNumber;

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  /*
   * To keep the template simple and small we're adding padding to prevent view
   * from rendering under the System UI.
   * For bigger apps the reccomendation is to use `react-native-safe-area-context`:
   * https://github.com/AppAndFlow/react-native-safe-area-context
   *
   * You can read more about it here:
   * https://github.com/react-native-community/discussions-and-proposals/discussions/827
   */

  let app = (
    <SafeAreaView style={styles.container}>
      <WebViewScreen />
      <Toast config={KToast.toastConfig} />
    </SafeAreaView>
  );

  return app;
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  webView: {
      flex: 1,
      alignItems: 'center',
  }
});

export default App;
