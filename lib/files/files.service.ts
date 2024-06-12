import { EncodedFile, ErrorFile } from "@/types/files";


export const loadFile = (file: File): Promise<EncodedFile> => new Promise((res, rej) => {
  var reader = new FileReader();
  let base = {
    name: file.name,
    size: file.size,
  }
  reader.addEventListener("abort", e => rej(`File upload aborted:${e}`));
  reader.addEventListener("error", e => rej(`File upload error: ${e}`));
  reader.addEventListener("load", () => res({
    ...base,
    encoded: reader.result as string
  }), false);
  reader.readAsDataURL(file);
})

export const rejectFiles = (files: File[]): ErrorFile[] => files.map(f => ({
  name: f.name,
  size: f.size,
  error: 'File rejected'
}))
