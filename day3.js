// @ts-check

/**
 * 
 * @param {string} input 
 */
function run_instructions_part1(input) {
    const mul_regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    const matches = input.matchAll(mul_regex);
    let result = 0;
    for (const match of matches) {
        const i1 = parseInt(match[1]);
        const i2 = parseInt(match[2]);
        result += i1 * i2;
    }

    return result;
}

function run_instructions_part2(input) {
    const inst_regex = /(?:mul\((\d{1,3}),(\d{1,3})\))|(?:don't\(\))|(?:do\(\))/g;
    const matches = input.matchAll(inst_regex);
    let result = 0;
    let is_enabled = true;
    for (const match of matches) {
        if (match[0] == "do()") {
            is_enabled = true;
            continue;
        }
        else if (match[0] == "don't()") {
            is_enabled = false;
            continue;
        }
        else if (match[0].startsWith("mul") && is_enabled) {
            const i1 = parseInt(match[1]);
            const i2 = parseInt(match[2]);
            result += i1 * i2;
        }
    }

    return result;
}

function run_day3a(input, outputDiv) {
    const result = run_instructions_part1(input);
    outputDiv.innerText = `Result: ${String(result)}`;
}

function run_day3b(input, outputDiv) {
    const result = run_instructions_part2(input);
    outputDiv.innerText = `Result: ${String(result)}`;
}

const provided_test_input_1 = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
const provided_test_input_2 = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

function test_day3a() {
    const result = run_instructions_part1(provided_test_input_1);
    console.assert(result === 161);
}

function test_day3b() {
    const result = run_instructions_part2(provided_test_input_2);
    console.assert(result === 48);
}

export const day3a = {
    name: "Day 3a",
    default_input: provided_test_input_1,
    run_func: run_day3a,
    tests: [test_day3a],
};

export const day3b = {
    name: "Day 3b",
    default_input: provided_test_input_2,
    run_func: run_day3b,
    tests: [test_day3b],
}