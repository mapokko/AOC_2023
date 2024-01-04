import { readInput } from "../common/utils";

type numType = {
    value: number;
    stringIndex: number;
    stringIndexStart: number;
    stringIndexEnd: number;
    index: number;
    numLength: number;
};

type starType = {
    stringIndexStart: number;
    stringIndexEnd: number;
    index: number;
    numLength: number;
};

function checkAdjacent(data: numType, input: string[]) {
    let localInput = [...input];

    localInput.splice(
        data.index !== localInput.length - 1 ? data.index + 2 : 0,
        data.index !== localInput.length - 1
            ? localInput.length - data.index - 1
            : 0
    );
    localInput.splice(0, data.index !== 0 ? data.index - 1 : 0);

    localInput = localInput.map((el) => {
        if (data.stringIndex < el.length - 2) {
            el = el.slice(0, data.stringIndex + data.numLength + 1);
        }

        if (data.stringIndex > 0) {
            el = el.slice(data.stringIndex - 1, el.length);
        }
        return el.replace(/[\.]*[\d]*[\.]*/g, "");
    });
    return localInput.join("").length > 0;
}

function checkAdjacentStar(data: starType, numbers: numType[]) {
    let localInput = numbers.filter(
        (num) =>
            num.index === data.index ||
            num.index === data.index - 1 ||
            num.index === data.index + 1
    );
    localInput = localInput.filter(
        (el) =>
            el.stringIndexStart <= data.stringIndexEnd &&
            el.stringIndexEnd >= data.stringIndexStart
    );

    return localInput.length == 2
        ? localInput[0].value * localInput[1].value
        : 0;
}

async function main() {
    const input = await readInput("./input.txt");

    const numbers = input
        .map((el, index): numType[] => {
            return [...el.matchAll(/(\d)+/g)].map((m) => {
                return {
                    value: Number.parseInt(m[0]),
                    stringIndex: m.index!,
                    stringIndexStart: m.index!,
                    stringIndexEnd: m.index! + m[0].length - 1,
                    index,
                    numLength: m[0].length,
                };
            });
        })
        .flat();

    const stars = input
        .map((el, index): starType[] => {
            return [...el.matchAll(/[*]/g)].map((m) => {
                return {
                    stringIndexStart: m.index! > 0 ? m.index! - 1 : 0,
                    stringIndexEnd: m.index! + m[0].length,
                    index,
                    numLength: m[0].length,
                };
            });
        })
        .flat();

    const test1Result = numbers.reduce(
        (acc, curr) => (checkAdjacent(curr, input) ? acc + curr.value : acc),
        0
    );

    const test2Result = stars.reduce(
        (acc, curr) => checkAdjacentStar(curr, numbers) + acc,
        0
    );

    return { test1Result, test2Result };
}
main().then((res) => {
    console.log(res);
});
