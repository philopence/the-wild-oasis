import supabase, { storageUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded.");
  }

  return data;
}

export async function deleteCabin(cabinId) {
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", cabinId);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted.");
  }

  return data;
}

// TODO REFACTOR
export async function createUpdateCabin(newCabin, id) {
  const { image } = newCabin;

  let imagePath = image;

  if (image instanceof File) {
    const imageName = `${Date.now()}-${image.name}`.replace(/\//g, "");

    const { data: storageData, error: storageError } = await supabase.storage
      .from("cabins-image")
      .upload(imageName, image);

    if (storageError) {
      console.error(storageError);
      throw new Error("Cabin image could not be uploaded.");
    }

    imagePath = `${storageUrl}/${storageData.fullPath}`;
  }

  let query = supabase.from("cabins");

  query = id
    ? query.update({ ...newCabin, image: imagePath }).eq("id", id)
    : query.insert([{ ...newCabin, image: imagePath }]);

  const { data, insertError } = await query.select();

  if (insertError) {
    const { error: removeError } = await supabase.storage
      .from("cabins-image")
      .remove([imagePath.split("/").pop()]);

    if (removeError) throw new Error("Cabin image could not be removed.");

    throw new Error("Cabins could not be inserted.");
  }

  return data;
}
