import * as fs from "node:fs/promises";

function getNumber(text: string) {
  let regex = /\d+/g;
  let digits = text
    .match(regex)
    ?.map((el) => el.split(""))
    .flat();
  let number = 0;
  if (digits) {
    number = Number.parseInt(digits[0] + digits.slice(-1)[0]);
  }
  return number;
}

async function main() {
  const lines = (await fs.readFile("./input.txt", "utf8")).split("\n");
  return lines.map((el) => getNumber(el)).reduce((acc, curr) => acc + curr, 0);
}

main().then((res) => {
  console.log(res);
});
