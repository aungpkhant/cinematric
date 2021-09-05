import React, { useState, useEffect } from "react";
import { useIsMounted } from "@/hooks/useIsMounted";

// https://stackoverflow.com/a/63420842
export function useContainerDimensions(myRef) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const isMounted = useIsMounted();

  useEffect(() => {
    const getDimensions = () => ({
      width: (myRef && myRef.current?.offsetWidth) || 0,
      height: (myRef && myRef.current?.offsetHeight) || 0,
    });

    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (myRef.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [myRef, isMounted]);

  return dimensions;
}
