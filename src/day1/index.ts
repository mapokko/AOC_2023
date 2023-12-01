import * as fs from "node:fs/promises";

function getNumber(text: string) {
  let digits = text
    .match(/\d+/g)
    ?.map((el) => el.split(""))
    .flat();

  return digits ? Number.parseInt(digits[0] + digits.slice(-1)[0]) : 0;
}

async function main() {
  const lines = (await fs.readFile("./input.txt", "utf8")).split("\n");
  return lines.map((el) => getNumber(el)).reduce((acc, curr) => acc + curr, 0);
}

main().then((res) => {
  console.log(res);
});
