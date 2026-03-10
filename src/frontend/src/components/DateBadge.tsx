import { useEffect, useState } from "react";

const DATE_PUBLISHED = "9 Mar 2026";
const STORAGE_KEY = "portfolio_last_modified";

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function DateBadge() {
  const [dateModified, setDateModified] = useState(DATE_PUBLISHED);

  useEffect(() => {
    const today = new Date();
    const todayStr = today.toDateString();
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored !== todayStr) {
      localStorage.setItem(STORAGE_KEY, todayStr);
    }

    setDateModified(formatDate(today));
  }, []);

  return (
    <div
      className="fixed bottom-6 left-6 z-40 flex flex-col gap-0.5 text-right"
      data-ocid="date_badge.panel"
    >
      <span className="text-[10px] text-zinc-500 font-mono tracking-wide">
        Published: {DATE_PUBLISHED}
      </span>
      <span className="text-[10px] text-zinc-500 font-mono tracking-wide">
        Modified: {dateModified}
      </span>
    </div>
  );
}
