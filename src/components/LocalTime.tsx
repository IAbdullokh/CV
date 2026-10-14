"use client";

import { useEffect, useState } from "react";

// Shows the current time in Tashkent. Renders the static "UTC+5" until the browser takes over.
export default function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    let format: Intl.DateTimeFormat;
    try {
      format = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Tashkent" });
    } catch {
      return;
    }
    const tick = () => setTime(format.format(new Date()));
    tick();
    const timer = window.setInterval(tick, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return <span>{time ? `${time} local · UTC+5` : "UTC+5"}</span>;
}
