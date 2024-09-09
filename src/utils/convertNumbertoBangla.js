function convertToBanglaNumber(number) {
  const banglaNumerals = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

  return String(number).replace(/\d/g, (digit) => {
    return banglaNumerals[parseInt(digit, 10)];
  });
}

export default convertToBanglaNumber;
