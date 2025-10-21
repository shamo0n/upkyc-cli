// src/@types/rn-pdf-generator.d.ts
declare module 'rn-pdf-generator' {
  interface GenerateOptions {
    html: string;
    fileName?: string;
    base64?: boolean;
    directory?: string;
  }

  interface GenerateResult {
    filePath: string;
  }

  const RNHTMLtoPDF: {
    generate: (options: GenerateOptions) => Promise<GenerateResult>;
  };

  export default RNHTMLtoPDF;
}
