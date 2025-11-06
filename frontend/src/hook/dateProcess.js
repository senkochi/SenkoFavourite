export function formatDate(dateString) {
  if (!dateString) return "";
  // Ví dụ: "2024-08-25T09:05:00" hoặc "2024-08-25T09:05"
  const [date, time] = dateString.split("T");
  if (!date || !time) return dateString;
  const [year, month, day] = date.split("-");
  const [hour = "00", minute = "00"] = time.split(":");
  // Đảm bảo luôn có 2 số cho giờ và phút
  const hourStr = hour.padStart(2, "0");
  const minuteStr = minute.padStart(2, "0");
  return `${day}/${month}/${year} ${hourStr}:${minuteStr}`;
}
