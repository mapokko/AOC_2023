import { readInput } from "../common/utils";

type Card = {
    number: number;
    winningNum: number[];
    cardNum: number[];
    matchingNum: number[];
};

function countCards(card: Card, input: Card[]) {
    const matchingCount = card.matchingNum.length;
    let acc = 0;

    for (let i = 0; i < matchingCount; i++) {
        const nextCardNum = card.number + i;
        if (input.length <= nextCardNum) {
            break;
        }
        acc = acc + countCards(input[nextCardNum], input) + 1;
    }

    return acc;
}

async function main() {
    const input = await readInput("./input.txt");

    const cards: Card[] = input.map((el) => {
        const number = Number.parseInt(
            el
                .split(":")[0]
                .split(" ")
                .filter((n) => n)[1]
        );
        const winningNum = el
            .split(":")[1]
            .split("|")[0]
            .trim()
            .split(" ")
            .filter((n) => n)
            .map((n) => Number.parseInt(n));
        const cardNum = el
            .split(":")[1]
            .split("|")[1]
            .trim()
            .split(" ")
            .filter((n) => n)
            .map((n) => Number.parseInt(n));

        return {
            number,
            winningNum,
            cardNum,
            matchingNum: cardNum.filter((el) => winningNum.includes(el)),
        };
    });

    const test1Result = cards.reduce((acc, curr) => {
        return curr.matchingNum.length > 0
            ? Math.pow(2, curr.matchingNum.length - 1) + acc
            : acc;
    }, 0);

    const test2Result = cards.reduce((acc, curr) => {
        return countCards(curr, cards) + acc + 1;
    }, 0);

    return { test1Result, test2Result };
}

main().then((res) => {
    console.log(res);
});
