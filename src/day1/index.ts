import { readInput } from "../common/utils";

const numbers = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
};

function getNumber(line: string): number {
    const res = extractDigits(line);
    return Number.parseInt(res.first + "" + res.last);
}

async function main() {
    return (await readInput("./input.txt")).reduce(
        (acc, curr) => acc + getNumber(curr),
        0
    );
}

main().then((res) => {
    console.log(res);
});

const convertor = (num: string) => {
    return Number.isInteger(Number.parseInt(num))
        ? Number.parseInt(num)
        : numbers[num as keyof typeof numbers];
};

const matcher = (line: string) => {
    let results = [...line.matchAll(/(\d)/g)];
    Object.keys(numbers).forEach((el) => {
        const localRes = line.matchAll(new RegExp(el, "g"));
        results.push(...localRes);
    });

    return results.sort((a: any, b: any) => a.index! - b.index!);
};

function extractDigits(input: string): { first: number; last: number } {
    let arr = matcher(input);
    let first = convertor(arr[0][0]);
    let last = convertor(arr[arr.length - 1][0]);

    return { first, last };
}

/************************************************************************************************************************************************************************/

class MakeRange implements Iterable<number> {
    private _first: number;
    private _last: number;

    constructor(first: number, last: number) {
        this._first = first;
        this._last = last;
    }

    [Symbol.iterator](): Iterator<number> {
        throw new Error("Method not implemented");
    }
}

// for (let item of new MakeRange(0, 10)) {
//   console.log(item);
// }

// function* simpleGenerator() {
//   yield 1;
//   yield 2;
//   yield 3;
// }
// const genRes = simpleGenerator();
// console.log(genRes.next());
// console.log(genRes.next());
// console.log(genRes.next());
