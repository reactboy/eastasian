import { supabase } from '.';

export const uploadFile = async (bucket: string, file: File) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(file.name, file);

    if (error) throw new Error(error.message);

    const { path } = data;

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(path);

    return publicUrl;
  } catch (error) {
    console.error(error);
  }
};
