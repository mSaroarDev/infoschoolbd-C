export const convertToGmtPlus6 = (dateString) => {
  const date = new Date(dateString);

  // Options for displaying only the time in 24-hour format
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Dhaka", // GMT+6
  };

  return date.toLocaleTimeString("en-US", options);
};
