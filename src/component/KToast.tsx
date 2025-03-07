import Toast from "react-native-toast-message";
import {Text, View} from "react-native";
import {ToastConfig, ToastConfigParams} from "react-native-toast-message/lib/src/types";

export class KToast {
  static showToast(message: string, longDuration?: boolean) {
    Toast.show({type: 'ktoast', position: 'bottom', bottomOffset: 80, text1: message});
  }

  static toastConfig: ToastConfig = {
    'ktoast': (props: ToastConfigParams<any>) => {
      return (
        <Text style={{color: '#ffffff', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6, backgroundColor: '#222222cc'}}>{props.text1}</Text>
      );
    },
  }

}