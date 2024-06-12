export interface EncodedFile {
  name: string;
  size: number;
  encoded: string; // base64 encoded content
}
export interface ErrorFile {
  name: string;
  size: number;
  error: string; // error description
}
