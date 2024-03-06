import { useQuery } from "@tanstack/react-query";

import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return {
    isLoading,
    settings: data,
    error,
  };
}
