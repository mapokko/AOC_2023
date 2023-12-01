import * as fs from "node:fs/promises";

function getNumber(line: string): number {
  let digits = line.match(/\d+/g);
  return (
    Number.parseInt(
      (digits?.at(0)?.at(0) ?? "")?.concat(digits?.at(-1)?.at(-1) ?? "")
    ) || 0
  );
}

async function main() {
  return (await fs.readFile("./input.txt", "utf8"))
    .split("\n")
    .map((line) => getNumber(line))
    .reduce((acc, curr) => acc + curr, 0);
}

main().then((res) => {
  console.log(res);
});
