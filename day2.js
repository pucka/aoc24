import { readFileSync } from "node:fs";

const lines = readFileSync("./day2.txt", { encoding: "UTF8" })
  .split("\n")
  .filter((line) => line);

const parseReport = (numbers) => {
  let prevLevel, isAscending;

  return numbers.every((currentLevel, index) => {
    if (index === 0) return true;

    prevLevel = numbers[index - 1];

    const distance = Math.abs(prevLevel - currentLevel);
    const isCurrentAscending = currentLevel > prevLevel;

    if (isAscending === undefined) isAscending = isCurrentAscending;

    return isCurrentAscending === isAscending && distance >= 1 && distance <= 3;
  });
};

// Nr 1
const safeLines = lines
  .map((line) => parseReport(line.split(" ").map((str) => +str)))
  .filter(Boolean);

// Nr 2
const safeLinesWithDamper = lines
  .map((line) => {
    const numbers = line.split(" ").map((str) => +str);

    if (!parseReport(numbers)) {
      let isSafe = false;

      for (let i = 0; i < numbers.length; i++) {
        isSafe = parseReport(numbers.filter((_, index) => index !== i));

        if (isSafe) break;
      }

      return isSafe;
    }

    return true;
  })
  .filter(Boolean);

console.log("1) Safe lines: ", safeLines.length);
console.log("2) Safe lines with damper: ", safeLinesWithDamper.length);
