import { DialogResult } from "../model/Types";

let onShowCallback : ((title: string, message: string, cancelVisible?: boolean) => void) | undefined;
let onConfirmCallback : (() => void) | undefined;
let onCancelCallback : (() => void) | undefined;
let hideDialog : (() => void) | undefined;

export class CommonDialog {
    static shotwAsync (title: string, message: string, cancelVisible?: boolean) : Promise<DialogResult> {
        const promise = new Promise<DialogResult>(resolve => {
            onConfirmCallback = () => {
                resolve(DialogResult.Confirmed);
                hideDialog?.();
            };
            onCancelCallback = () => {
                resolve(DialogResult.Cancelled);
                hideDialog?.();
            };
        });

        onShowCallback?.(title, message, cancelVisible);
        return promise;
    }
}