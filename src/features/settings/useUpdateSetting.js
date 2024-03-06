import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Settings successfully edited.");
      queryClient.invalidateQueries("settings");
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isUpdating: isPending,
    updateSetting: mutate,
  };
}
