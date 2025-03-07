import { PermissionsAndroid, Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import SimCardsManager from "react-native-sim-cards-manager";
import { KToast } from "../component/KToast";

export class NativeHelper {
    static async getPhoneNumber(): Promise<string | null> {
        if(Platform.OS !== 'android') {
            return '';
        } 
        
        try {
            // 권한 요청
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              const simInfo = await SimCardsManager.getSimCards();
              if (simInfo.length > 0 && simInfo[0].number) {
                return simInfo[0].number;
              }
            }
          } catch (error) {
            KToast.showToast('휴대폰 번호 가져오기 실패');
            return '';
          }

          return '';
        }

    static getDeviceModel(): any {
        const modelNm = DeviceInfo.getModel;
        const uID = DeviceInfo.getUniqueId;

        return {modelNm: String, uID: String};
    }
}
