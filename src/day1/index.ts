import * as fs from "node:fs/promises";

async function main() {
  return (await fs.readFile("./input.txt", "utf8"))
    .split("\n")
    .map((line) => {
      let digits = line.match(/\d+/g);
      let numberString = digits
        ?.at(0)
        ?.at(0)
        ?.concat(digits.at(-1)?.at(-1) ?? "");
      return numberString ? Number.parseInt(numberString) : 0;
    })
    .reduce((acc, curr) => acc + curr, 0);
}

main().then((res) => {
  console.log(res);
});
