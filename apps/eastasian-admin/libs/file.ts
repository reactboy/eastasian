//TODO(eastasian) extract to utils
export const convertBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};
