import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { login as loginApi } from "../../services/apiAuth";

export function useLogin() {
  const navigate = useNavigate();
  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: loginApi,
    onSuccess: ({ user }) => {
      // Login -> cache User data, avoid ProtectedRoute refetch
      queryClient.setQueryData(["user"], user);
      navigate("/dashboard");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Login error");
    },
  });

  return { login, error, isPending };
}
