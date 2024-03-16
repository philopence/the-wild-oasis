import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { logout as logoutApi } from "../../services/apiAuth";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // clean all cache
      queryClient.removeQueries();

      navigate("/login", { replace: true });
      toast.success("Logout success");
    },
    onError: () => toast.error("Logout error"),
  });

  return { logout, isPending };
}
