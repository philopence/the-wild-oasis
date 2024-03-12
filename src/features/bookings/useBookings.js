import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getBookings } from "../../services/apiBookings";
import { NUM_PER_PAGE } from "../../utils/constants";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const status = searchParams.get("status");
  const filter =
    status && status !== "all"
      ? {
          field: "status",
          value: status,
          method: "eq",
        }
      : null;

  const [field, direction] = (
    searchParams.get("sort-by") || "startDate-desc"
  ).split("-");
  const sortBy = { field: field, direction };

  const page = Number(searchParams.get("page") || 1);

  const {
    data = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () =>
      getBookings({
        filters: [filter],
        sortBy,
        page,
      }),
  });

  const numPage = Math.ceil(data.count / NUM_PER_PAGE);

  if (page < numPage)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () =>
        getBookings({
          filters: [filter],
          sortBy,
          page: page + 1,
        }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () =>
        getBookings({
          filters: [filter],
          sortBy,
          page: page - 1,
        }),
    });

  return {
    bookings: data,
    isLoading,
    error,
  };
}
