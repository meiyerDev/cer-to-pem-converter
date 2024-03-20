import { CerBase64ToPemConverterAction, CerToBase64TranslatorAction } from "../../actions";

export class CerToPemConverterService {
  constructor(
    private translator: CerToBase64TranslatorAction,
    private converter: CerBase64ToPemConverterAction
  ) {
  }

  static make(): CerToPemConverterService {
    return new CerToPemConverterService(
      CerToBase64TranslatorAction.make(),
      CerBase64ToPemConverterAction.make()
    );
  }

  async execute(file: File): Promise<File> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (!e.target?.result) {
          return;
        }

        const cerData = e.target.result;
        const base64Content = this.translator.execute(cerData.toString());
        const pemContent = this.converter.execute(base64Content);
        const newName = file.name.replace(/\.cer$/, ".pem");

        const blob = new File([pemContent], newName, {
          type: "application/x-x509-ca-cert",
        });

        resolve(blob);
      };

      reader.onerror = (e) => {
        reject(e);
      };

      reader.readAsDataURL(file);
    });
  }
}
