import { SafeAreaView, StyleSheet } from "react-native";
import WebView from "react-native-webview";
import { NativeHelper } from "../util/NativeHelper";

const WebViewScreen = () => {
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
