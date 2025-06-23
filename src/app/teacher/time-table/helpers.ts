// Timetable helpers for teacher portal

export const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const TIMES = Array.from({ length: 11 }, (_, i) => 8 + i); // 8:00 to 18:00

export function getTimeLabel(hour: number) {
  return `${hour.toString().padStart(2, "0")}:00`;
}

export function getTimeRangeLabel(start: string, end: string) {
  return `${start} - ${end}`;
}

export function getColor(idx: number) {
  // Pick from a palette for visual distinction
  const palette = [
    "#2989FF", // blue
    "#22CBCC", // teal
    "#F2994A", // orange
    "#6C63FF", // purple
    "#27AE60", // green
    "#EB5757", // red
    "#9B51E0", // violet
    "#2D9CDB", // light blue
  ];
  return palette[idx % palette.length];
}
