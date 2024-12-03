import { readFileSync } from "node:fs";

const line = readFileSync("./day3.txt", { encoding: "UTF8" });

const result = [...line.matchAll(/mul\((\d+),(\d+)\)/g)].reduce(
  (acc, match) => {
    acc += parseInt(match[1]) * parseInt(match[2]);
    return acc;
  },
  0
);

let flag = true;
const result2 = [
  ...line.matchAll(/mul\((\d+),(\d+)\)|don't\(\)|do\(\)/g),
].reduce((acc, match) => {
  if (match[0] === "don't()") {
    flag = false;
  } else if (match[0] === "do()") {
    flag = true;
  } else if (flag) {
    acc += parseInt(match[1]) * parseInt(match[2]);
  }
  return acc;
}, 0);

console.log("1) ", result);
console.log("2) ", result2);
