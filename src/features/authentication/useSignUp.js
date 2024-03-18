import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { signUp as signUpApi } from "../../services/apiAuth";

export function useSignUp() {
  const { isPending, mutate: signUp } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signUpApi({ email, password, fullName }),
    onSuccess: () => {
      toast.success(
        "Sign Up successful. Please check your email for verification.",
      );
    },
    onError: () => {},
  });

  return { isPending, signUp };
}
