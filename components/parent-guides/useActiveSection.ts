"use client";

import { useEffect, useState } from "react";

// The section whose heading has passed the upper third of the screen.
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let current: string | undefined;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  return active;
}
