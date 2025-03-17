/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, useColorScheme} from 'react-native';

import WebViewScreen from './src/widgets/screen/WebViewScreen';
import Toast from 'react-native-toast-message';
import {KToast} from './src/components/KToast';
import {NativeHelper} from './src/util/NativeHelper';
import {NavigationContainer} from '@react-navigation/native';

// npx react-native start run-android
function App(): React.JSX.Element {
  const [phoneNum, setPhoneNum] = useState<string | null>('');

  // 휴대폰 정보를 가져옴
  useEffect(() => {
    async function fetchPhoneNumber() {
      const number = await NativeHelper.getPhoneInfo();
      setPhoneNum(number ?? '');
    }
    fetchPhoneNumber();
  }, []);

  let app = (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <WebViewScreen phoneNum={phoneNum} />
        <Toast config={KToast.toastConfig} />
      </SafeAreaView>
    </NavigationContainer>
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
  },
});

export default App;
