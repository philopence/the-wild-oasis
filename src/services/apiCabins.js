import supabase, { storageUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

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

export async function insertCabin(newCabin) {
  const { image: imageFile } = newCabin;

  const imageName = `${Date.now()}-${imageFile.name}`.replace(/\//g, "");

  const { data: storageData, error: storageError } = await supabase.storage
    .from("cabins-image")
    .upload(imageName, imageFile);

  if (storageError) {
    console.error(storageError);
    throw new Error("Cabin image could not be uploaded.");
  }

  const imagePath = `${storageUrl}/${storageData.fullPath}`;

  const { data, error: insertError } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (insertError) {
    const { error: removeError } = await supabase.storage
      .from("cabins-image")
      .remove([imageName]);

    if (removeError) throw new Error("Cabin image could not be removed.");

    throw new Error("Cabins could not be inserted.");
  }

  return data;
}
