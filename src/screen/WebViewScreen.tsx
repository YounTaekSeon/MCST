import { useEffect, useRef, useState } from "react";
import { Alert, BackHandler} from "react-native";
import WebView from "react-native-webview";

const WebViewScreen = () => {
    useEffect(() => {
        const backAction = () => {
            Alert.alert('주의', '정말 앱을 종료하시겠습니까?', [
                {
                    text: '아니요',
                    onPress: () => null,
                    style: 'cancel',
                },
                {
                    text: '예', 
                    onPress: () => BackHandler.exitApp()
                },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    return (
        <WebView
        source={{uri: 'http://mtecsoft.co.kr:5800/pms/mobile/HpCheck.do?hpAuthNum=$'}}
        onLoad={() => console.log("WebView 로드 성공")}
        onError={(syntheticEvent) => {
            const {nativeEvent} = syntheticEvent;
            console.error("WebView 로드 실패", nativeEvent);
        }}
        >
        </WebView>
    );
}

export default WebViewScreen;
