import * as fs from "node:fs/promises";

async function main() {
  return (await fs.readFile("./input.txt", "utf8"))
    .split("\n")
    .map((line) => {
      let digits = line
        .match(/\d+/g)
        ?.map((el) => el.split(""))
        .flat();

      return digits ? Number.parseInt(digits[0] + digits.slice(-1)[0]) : 0;
    })
    .reduce((acc, curr) => acc + curr, 0);
}

main().then((res) => {
  console.log(res);
});
