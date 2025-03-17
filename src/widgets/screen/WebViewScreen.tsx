import {useEffect, useRef, useState} from 'react';
import {BackHandler} from 'react-native';
import WebView from 'react-native-webview';
import {KToast} from '../../components/KToast';

interface WebViewScreenProps {
  phoneNum: string | null;
}

const WebViewScreen = ({phoneNum}: WebViewScreenProps) => {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [lastPress, setLastPress] = useState<number | null>(null);
  const BASE_URL = `http://mtecsoft.co.kr:5800/pms/mobile/HpCheck.do?hpAuthNum=${phoneNum}`;

  useEffect(() => {
    // 뒤로가기 기능
    const backAction = () => {
      // 뒤로 이동이 가능하면 이동
      if (canGoBack) {
        webViewRef.current?.goBack();
        return true;
      }

      // 뒤로 이동이 불가능하면 연속으로 눌렀을 때 종료
      const now = new Date().getTime();
      if (lastPress && now - lastPress < 1000) {
        BackHandler.exitApp();
      } else {
        KToast.showToast('뒤로가기 버튼을 한번 더 누르면 종료됩니다.', false);
        setLastPress(now);
      }

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [canGoBack, lastPress]);

  // console.log(BASE_URL);

  return (
    <WebView
      ref={webViewRef}
      source={{uri: BASE_URL}}
      onNavigationStateChange={navState => setCanGoBack(navState.canGoBack)}
    />
  );
};

export default WebViewScreen;
