export default function formatBengaliDate() {
  // Define arrays for Bengali month names and day names
  const bengaliMonths = [
    "জানুয়ারী",
    "ফেব্রুয়ারী",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];
  const bengaliDays = [
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
    "শনিবার",
  ];

  // Get the current date
  const currentDate = new Date();

  // Extract day, month, year and day of the week
  const day = currentDate.getDate().toString(); // date of the month (1-31)
  const monthIndex = currentDate.getMonth(); // month (0-11)
  const year = currentDate.getFullYear().toString(); // full year (e.g., 2024)
  const dayIndex = currentDate.getDay(); // day of the week (0-6)

  // Format day with "ই" suffix for Bengali date format
  const formattedDay = day + "ই";

  // Construct the formatted date string
  const formattedDate = `${formattedDay} ${bengaliMonths[monthIndex]}, ${year}, ${bengaliDays[dayIndex]}`;

  return formattedDate;
}
