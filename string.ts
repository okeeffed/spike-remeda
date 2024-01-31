import * as R from "remeda";

// Take a string to capitizlize the first letter
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Take a string to uppercase the last letter
export const uppercaseLastLetter = (str: string): string => {
  return str.slice(0, -1) + str.slice(-1).toUpperCase();
};

// reverse a string
export const reverseString = (str: string): string => {
  return str.split("").reverse().join("");
};

function main() {
  const helloStr = "hello";
  console.log(capitalize(helloStr));
  console.log(uppercaseLastLetter(helloStr));
  console.log(reverseString(helloStr));

  const pipedRes = R.createPipe(capitalize, uppercaseLastLetter, reverseString);

  // It knows it's a string
  console.log(pipedRes(helloStr));
}

main();
