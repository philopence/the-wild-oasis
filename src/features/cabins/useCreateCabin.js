import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { insertEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: insertEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created.");
      queryClient.invalidateQueries("cabins");
      // reset();
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isCreating: isPending,
    createCabin: mutate,
  };
}
