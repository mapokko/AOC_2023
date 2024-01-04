import * as fs from "node:fs/promises";

export async function readInput(path: string) {
    return (await fs.readFile(path, "utf8"))
        .split("\n")
        .map((el) => el.replace("\r", ""));
}
