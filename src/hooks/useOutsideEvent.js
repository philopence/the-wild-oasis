import { useEffect, useRef } from "react";

export function useOutsideEvent(event, handler) {
  const ref = useRef();
  useEffect(
    function () {
      function handleOutsideEvent(e) {
        if (!ref.current || ref.current.contains(e.target)) return;

        handler();
      }
      document.addEventListener(event, handleOutsideEvent, true);

      return () =>
        document.removeEventListener(event, handleOutsideEvent, true);
    },
    [event, handler],
  );

  return ref;
}
