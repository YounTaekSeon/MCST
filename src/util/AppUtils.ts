import {logger} from 'react-native-logs';

export class AppUtils {
  static init() {}

  static isEmptyList(list: Array<any>): boolean {
    if (list == null) {
      return true;
    }

    return false;
  }

  static printLog(log: Object): void {}
}
