export class CerToBase64TranslatorAction {
    static make(): CerToBase64TranslatorAction {
        return new CerToBase64TranslatorAction();
    }

    execute(cerData: string): string {
        return cerData.toString().split(',')[1];
    }
}