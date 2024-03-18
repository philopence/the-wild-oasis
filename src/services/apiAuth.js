import supabase from "./supabase";

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

  if (error) throw new Error(error.message);

  console.log(data);

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

// TEST APIs
// await getCurrentUser();
