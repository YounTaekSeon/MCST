import {NativeModules, PermissionsAndroid, Platform} from 'react-native';
import SimCardsManager from 'react-native-sim-cards-manager';
import {KToast} from '../components/KToast';
import {CommonDialog} from '../components/CommonDialog';
import {DialogResult} from '../models/Types';
import {sleep} from './utils';

export class NativeHelper {
  // 사용 안 하는 기능
  // async handleBackPress(): Promise<void> {
  //     const {InitiationModule} = NativeModules;

  //     const confirmed = await CommonDialog.shotwAsync(
  //         '종료',
  //         '앱을 종료 하시겠습니까?',
  //         true,
  //     );
  //     if (confirmed === DialogResult.Confirmed) {
  //         await sleep(100);

  //         InitiationModule.finishApp();
  //     }
  // }

  // 휴대폰 번호 가져옴
  static async getPhoneInfo(): Promise<string | null> {
    if (Platform.OS !== 'android') {
      return '';
    }

    try {
      // 권한 요청
      const stateGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
        {
          title: '휴대폰 정보 권한',
          message: '휴대폰 모델명을 받기 위한 권한 설정',
          buttonNeutral: '다음에',
          buttonNegative: '아니요',
          buttonPositive: '예',
        },
      );

      if (stateGranted === PermissionsAndroid.RESULTS.GRANTED) {
        const simInfo = await SimCardsManager.getSimCards();
        if (simInfo.length > 0 && simInfo[0].phoneNumber) {
          console.log(simInfo[0]);
          return simInfo[0].phoneNumber;
        }
      }
    } catch (error) {
      console.log(`${error}`);
      return '';
    }
    return '';
  }
}
