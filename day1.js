import { readFile } from "node:fs/promises";

const lines = (await readFile("./day1.txt", { encoding: "UTF8" }))
  .split("\n")
  .filter((line) => line);

const leftList = lines.map((line) => Number(line.split(/\s+/)[0])).sort();
const rightList = lines.map((line) => Number(line.split(/\s+/)[1])).sort();

let distance = 0;
let similarityScore = 0;
leftList.forEach((nr, index) => {
  distance += Math.abs(nr - rightList[index]);
  similarityScore += nr * rightList.filter((nr2) => nr2 === nr).length;
});

console.log("1) Distance: ", distance);
console.log("2) Similarity score: ", similarityScore);
