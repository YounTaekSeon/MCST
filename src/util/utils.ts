import {Dimensions} from 'react-native';
import moment from 'moment';
import {NativeModules} from 'react-native';
import AesLib from 'react-native-aes-crypto';
const Aes: typeof AesLib = NativeModules.Aes;

export class Utils {
    static isNumeric(str: string): boolean {
        return !isNaN(Number(str));
    }

    static isInteger(value: number): boolean {
        return value % 1 === 0;
    }

    static parseNumberString(str: string, defaultValue?: number): number {
        const value = parseFloat(str);
        return value ?? defaultValue;
    }

    static hasFinalConsonant(str: string): boolean {
        const lastChar = str.charAt(str.length - 1);
        if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(lastChar)) {
            const uniCode = lastChar.charCodeAt(0);
            const finalConsonant = (uniCode - 44032) % 28;

            return finalConsonant > 0;
        } else {
            return false;
        }
    }

    static isValidEmail(email: string): boolean {
        const regExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return regExp.test(email);
    }

    static changeFormat(
        sourceTime: string,
        sourceFormat: string,
        targetFormat: string,
    ) {
        try {
            let theTime = moment(sourceTime, sourceFormat);
            return theTime.format(targetFormat);
        } catch (e) {
            console.error(e);
        }
        return null;
    }

    static convertPxToVh = (pixel: number) => {
        const oneVhInPx = Dimensions.get('window').height / 100;
        return pixel / oneVhInPx;
    };

    static generateRandomNumber = (min = 1, max = 100000000) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    static dateFromMilliSeconds = (milliseconds: number) => {
        let utcOffset = new Date().getTimezoneOffset();
        return new Date(milliseconds - utcOffset * 60 * 1000);
    };

    static dateFromString = (dateStr: string, format: string) => {
        try {
            return moment(dateStr, format).toDate();
        } catch (error) {
            console.error(error);
        }
        return null;
    };

    static dateStringFromMilliSeconds = (
        milliseconds: number,
        format: string,
    ) => {
        try {
            return moment(milliseconds).format(format);
        } catch (error) {
            console.error(error);
        }
        return null;
    };

    static dateMonthAgo = (date: Date, month = 1) => {
        return moment(date).subtract(month, 'month').toDate();
    };

    static formatDate(date: Date, format: string) {
        try {
            return moment(date).format(format);
        } catch (error) {
            console.error(error);
        }
        return '';
    }

    static getBeginOfWeek() {
        // const result = new Date(date);
        // while (result.getDay() !== startOfWeek) {
        //     result.setDate(result.getDate() - 1);
        // }
        // return result;

        // return moment(date).startOf('week').isoWeekday(startOfWeek).toDate();
        const now = moment();
        return now.clone().weekday(1).toDate();
    }

    static isImageFile(filename: string): boolean {
        let fileType = this.getFileExtension(filename);
        return (
            fileType === 'jpg' ||
            fileType === 'png' ||
            fileType === 'gif' ||
            fileType === 'jpeg' ||
            fileType === 'bmp' ||
            fileType === 'svg' ||
            fileType === 'webp'
        );
    }

    static getFileExtension(filename: string): string {
        let ext =
            filename.substring(
                filename.lastIndexOf('.') + 1,
                filename.length,
            ) || filename;
        return ext.toLowerCase();
    }

    static getMimeTypeFromUri(uri: string): string {
        let exp = this.getFileExtension(uri);
        return this.getMimeType(exp);
    }

    static getMimeType(extension: string): string {
        switch (extension.toLowerCase()) {
            case 'docs':
                return 'application/msword';
            case 'docx':
                return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            case 'ppt':
                return 'application/vnd.ms-powerpoint';
            case 'pptx':
                return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
            case 'xls':
                return 'application/vnd.ms-excel';
            case 'xlsx':
                return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            case 'pdf':
                return 'application/pdf';
            case 'png':
                return 'image/png';
            case 'jpeg':
            case 'jpg':
                return 'image/jpeg';
            case 'gif':
                return 'image/gif';
            case 'bmp':
                return 'image/bmp';
            case 'svg':
                return 'image/svg+xml';
            case 'webp':
                return 'image/webp';
            case 'hwp':
                return 'application/vnd.hancom.hwp';
            default:
                return 'application/octet-stream';
        }
    }

    static addAlpha(color: string, opacity: number) {
        // coerce values so it is between 0 and 1.
        var _opacity = Math.round(Math.min(Math.max(opacity ?? 1, 0), 1) * 255);
        return color + _opacity.toString(16).toUpperCase();
    }
}

export const sleep = (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms));
