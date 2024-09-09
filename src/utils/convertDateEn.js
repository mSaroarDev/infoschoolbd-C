export const convertDateEn = (dateStr) => {
  const date = new Date(dateStr);

  // Convert to GMT+6
  const options = {
    timeZone: "Asia/Dhaka", // GMT+6
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-GB", options);
  const formattedDate = formatter.format(date).replace(/\//g, "-");

  return formattedDate;
};
