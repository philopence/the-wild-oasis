import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { insertEditCabin } from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: ({ newCabinData, id }) => insertEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited.");
      queryClient.invalidateQueries("cabins");
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isEditing: isPending,
    editCabin: mutate,
  };
}
