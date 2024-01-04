"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var utils_1 = require("../common/utils");
function countCards(card, input) {
    var matchingCount = card.matchingNum.length;
    console.log("processing card ", card.number, "with matching numbers: ", matchingCount);
    console.log("GOD: ", matchingCount);
    var acc = 0;
    console.log("   BEFORE curr card: ", card);
    console.log();
    console.log();
    var i = 0;
    for (i; i < matchingCount; i++) {
        console.log("   curr card: ", card);
        console.log("entered cycle: i=", i, " len=", matchingCount);
        var nextCardNum = card.number + i;
        if (input.length <= nextCardNum) {
            console.log("       breaking");
            break;
        }
        // console.log("   next card: ", input[nextCardNum]);
        acc++;
        acc = acc + countCards(input[nextCardNum], input);
    }
    // console.log("card " + card.number + " found " + acc + " new cards");
    return acc;
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var input, cards, test1Result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, utils_1.readInput("./input.txt")];
                case 1:
                    input = _a.sent();
                    cards = input.map(function (el) {
                        var number = Number.parseInt(el.split(":")[0].split(" ")[1]);
                        var winningNum = el
                            .split(":")[1]
                            .split("|")[0]
                            .trim()
                            .split(" ")
                            .filter(function (n) { return n; })
                            .map(function (n) { return Number.parseInt(n); });
                        var cardNum = el
                            .split(":")[1]
                            .split("|")[1]
                            .trim()
                            .split(" ")
                            .filter(function (n) { return n; })
                            .map(function (n) { return Number.parseInt(n); });
                        return {
                            number: number,
                            winningNum: winningNum,
                            cardNum: cardNum,
                            matchingNum: cardNum.filter(function (el) { return winningNum.includes(el); })
                        };
                    });
                    console.log(cards);
                    test1Result = cards.reduce(function (acc, curr) {
                        return curr.matchingNum.length > 0
                            ? Math.pow(2, curr.matchingNum.length - 1) + acc
                            : acc;
                    }, 0);
                    return [2 /*return*/, { test1Result: test1Result, test2Result: countCards(cards[0], cards) }];
            }
        });
    });
}
main().then(function (res) {
    console.log(res);
});
