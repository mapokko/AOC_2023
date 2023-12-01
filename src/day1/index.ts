import * as fs from "node:fs/promises";

function getNumber(line: string): number {
  let digits = line.match(/\d+/g);
  return (
    Number.parseInt(
      `${digits?.[0]?.[0] ?? ""}${digits?.at(-1)?.slice(-1) ?? ""}`
    ) || 0
  );
}

async function main() {
  return (await fs.readFile("./input.txt", "utf8"))
    .split("\n")
    .reduce((acc, curr) => acc + getNumber(curr), 0);
}

main().then((res) => {
  console.log(res);
});
