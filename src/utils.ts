export function generateRandomString(length: number = 4): string {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }
  return Date.now() + result;
}

export function formatNumber(number: number) {
  // Check if the number is a float
  if (Number.isInteger(number)) {
    return number; // Return integer as it is
  } else {
    // Convert the number to a string with two decimal places
    return parseFloat(number.toFixed(2));
  }
}
