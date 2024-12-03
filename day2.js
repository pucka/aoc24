import { readFileSync } from "node:fs";

const lines = readFileSync("./day2.txt", { encoding: "UTF8" })
  .split("\n")
  .filter((line) => line);

const isBadLevel = (distance, direction, prevDirection) =>
  distance < 1 ||
  distance > 3 ||
  (prevDirection !== undefined && direction !== prevDirection);

const parseReport = (numbers) => {
  let prevDirection, prevLevel;

  const failure = numbers.findIndex((currentLevel, index) => {
    if (index > 0) {
      prevLevel = numbers[index - 1];

      const distance = Math.abs(prevLevel - currentLevel);
      const direction =
        currentLevel < prevLevel ? -1 : currentLevel > prevLevel ? 1 : 0;

      const badLevel = isBadLevel(distance, direction, prevDirection);

      if (badLevel) return true;

      prevDirection = direction;
    }

    return false;
  });

  return failure;
};

const safeLines = lines
  .map((line) => {
    const numbers = line.split(" ").map((str) => Number(str));

    return parseReport(numbers) === -1;
  })
  .filter((safe) => safe);

const safeLinesWithDamper = lines
  .map((line) => {
    const numbers = line.split(" ").map((str) => Number(str));
    const failureIndex = parseReport(numbers);

    if (failureIndex > -1) {
      let count = 0,
        safe = false,
        newIndex = Math.max(failureIndex - 2, 0);

      // Try to remove the bad number and check if the report is safe
      while (count < 3 && !safe) {
        safe =
          parseReport(numbers.filter((_, index) => index !== newIndex)) === -1;
        newIndex++;
        count++;
      }

      return safe;
    }

    return true;
  })
  .filter((safe) => safe);

console.log("1) Safe lines: ", safeLines.length);
console.log("2) Safe lines with damper: ", safeLinesWithDamper.length);
