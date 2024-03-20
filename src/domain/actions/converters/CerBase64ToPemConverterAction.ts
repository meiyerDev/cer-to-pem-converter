export class CerBase64ToPemConverterAction {
  static make(): CerBase64ToPemConverterAction {
    return new CerBase64ToPemConverterAction();
  }

  execute(base64Content: string): string {
    let output = "";
    for (let i = 0; i < base64Content.length; i += 64) {
      output += base64Content.slice(i, i + 64) + "\n";
    }
    return `-----BEGIN CERTIFICATE-----\n${output}-----END CERTIFICATE-----`;
  }
}
