export function numberValidator(number) {
  const isnum = /^\d+$/.test(number);
  if (!number) return "Mobile Number can't be empty";
  if (!isnum) return "Please enter a valid number.";
  if (number.length !== 10) return "Mobile Number should be 10 characters long.";
  return "";
}
