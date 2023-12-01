import * as fs from "node:fs/promises";

async function main() {
  return (await fs.readFile("./input.txt", "utf8"))
    .split("\n")
    .map((line) => {
      let digits = line.match(/\d+/g)?.reduce((acc, curr) => acc + curr, "");
      return digits ? Number.parseInt(digits[0] + digits.slice(-1)[0]) : 0;
    })
    .reduce((acc, curr) => acc + curr, 0);
}

main().then((res) => {
  console.log(res);
});
