import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateBooking } from "../../services/apiBookings";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out.`);
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
    onError: () => toast.error("There war an error while checking out."),
  });

  return { isCheckingOut: isPending, checkOut: mutate };
}
