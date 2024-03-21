import { useEffect, useRef } from "react";

export function useOutsideEvent(event, handler, option = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleOutsideEvent(e) {
        if (!ref.current || ref.current.contains(e.target)) return;

        handler();
      }
      document.addEventListener(event, handleOutsideEvent, option);

      return () =>
        document.removeEventListener(event, handleOutsideEvent, option);
    },
    [event, handler, option],
  );

  return ref;
}
