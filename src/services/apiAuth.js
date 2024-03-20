import supabase, { storageUrl } from "./supabase";

// supabase signup
export async function signUp({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { fullName, avatar: "" },
  });

  if (error) throw new Error(error.message);

  return data;
}

// supabase login with email and password
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // handle error
  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  // get session
  const { data: session } = await supabase.auth.getSession();
  if (!session) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

// supabase update user
export async function updateUser({ fullName, avatar, password }) {
  let userAttrs;
  if (fullName) userAttrs = { data: { fullName } };
  if (password) userAttrs = { password };

  const { data, error: updateFullNameOrPasswordError } =
    await supabase.auth.updateUser(userAttrs);

  if (updateFullNameOrPasswordError)
    throw new Error(updateFullNameOrPasswordError.message);

  if (!avatar) return data;

  const avatarName = `${Date.now()}-${avatar.name}`.replace(/\//g, "");

  const { data: avatarData, error: avatarError } = await supabase.storage
    .from("avatars")
    .upload(avatarName, avatar);

  if (avatarError) throw new Error(avatarError.message);

  const avatarPath = `${storageUrl}/${avatarData.fullPath}`;

  const { data: updatedAvatarUser, error: updatedAvatarError } =
    await supabase.auth.updateUser({ data: { avatar: avatarPath } });

  if (updatedAvatarError) throw new Error(updatedAvatarError.message);

  return updatedAvatarUser;
}

// TEST APIs
// await getCurrentUser();
