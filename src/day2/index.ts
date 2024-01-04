import { readInput } from "../common/utils";

type Cubes = {
    red: number;
    green: number;
    blue: number;
};

type Game = {
    gameNumber: number;
    readings: Cubes[];
};

function cleanData(line: string) {
    const gameNumber: number = Number.parseInt(
        line.split(":")[0].split(" ")[1]
    );
    const readings: Cubes[] = line
        .split(": ")[1]
        .split("; ")
        .map((r) => {
            let colors = r.split(", ");
            let retValue: Cubes = { red: 0, green: 0, blue: 0 };
            for (let colorEl of colors) {
                let color: string = colorEl.split(" ")[1];
                let num = Number.parseInt(colorEl.split(" ")[0]);
                retValue[color as keyof Cubes] = num;
            }
            return retValue;
        });
    return { gameNumber, readings };
}

function compareReading(reading1: Cubes, reading2: Cubes): Boolean {
    return (
        reading1.red >= reading2.red &&
        reading1.blue >= reading2.blue &&
        reading1.green >= reading2.green
    );
}

function sorterByColor(readings: Cubes[], color: string) {
    return readings.sort(
        (a, b) => b[color as keyof Cubes] - a[color as keyof Cubes]
    )[0][color as keyof Cubes];
}

async function main() {
    const input: Game[] = (await readInput("./input.txt")).map(cleanData);
    const limit: Cubes = { red: 12, green: 13, blue: 14 };

    const test1 = input.reduce((prev, curr) => {
        return curr.readings.filter((r) => compareReading(limit, r)).length ==
            curr.readings.length
            ? prev + curr.gameNumber
            : prev;
    }, 0);

    const test2 = input.reduce((prev, curr) => {
        const maxRed = sorterByColor(curr.readings, "red");
        const maxGreen = sorterByColor(curr.readings, "green");
        const maxBlue = sorterByColor(curr.readings, "blue");
        return maxRed * maxGreen * maxBlue + prev;
    }, 0);

    return { test1Result: test1, test2Result: test2 };
}

main().then((res) => {
    console.log(res);
});
