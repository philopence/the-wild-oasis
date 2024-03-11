import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getBookings } from "../../services/apiBookings";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const filter =
    status && status !== "all"
      ? {
          field: "status",
          value: status,
          method: "eq",
        }
      : null;
  const { data, isLoading, error } = useQuery({
    queryKey: ["bookings", filter],
    queryFn: () => getBookings({ filters: [filter] }),
  });

  return {
    bookings: data,
    isLoading,
    error,
  };
}
