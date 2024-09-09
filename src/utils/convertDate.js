function convertDateFormat(dateString) {
  const monthNames = [
    "জানুয়ারী",
    "ফেব্রুয়ারী",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "অগাস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];

  const numerals = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Convert numeric characters to Bengali numerals
  const formattedDay = day
    .toString()
    .split("")
    .map((char) => numerals[parseInt(char)])
    .join("");
  const formattedYear = year
    .toString()
    .split("")
    .map((char) => numerals[parseInt(char)])
    .join("");

  return `${formattedDay} ${month}, ${formattedYear}`;
}

export default convertDateFormat;
