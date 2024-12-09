// @ts-check

/**
 * 
 * @param {string} input
 * @returns {number[][]}
 */
function parse_input(input) {
    const lines = input.trim().split("\n");
    let result = [];
    for (const line of lines) {
        const values = line.split(/\s+/).map((v) => Number(v));
        result.push(values);
    }
    return result;
}

const provided_test_input = 
`7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

function test_parse_input() {
    const result = parse_input(provided_test_input);
    console.assert(result.length === 6);
    console.assert(result[0].length === 5);
    console.assert(result[0][0] === 7);
}

/**
 * So, a report only counts as safe if both of the following are true:

    The levels are either all increasing or all decreasing.
    Any two adjacent levels differ by at least one and at most three.

 * @param {number[]} report 
 */
function is_safe_report_part1(report) {
    const MIN_SAFE_DELTA = 1;
    const MAX_SAFE_DELTA = 3;

    let deltas = [];
    for (let i = 1; i < report.length; i++) {
        deltas.push(report[i] - report[i - 1]);
    }
    const min = Math.min(...deltas);
    const max = Math.max(...deltas);

    if (min < 0 && max > 0) {
        // Means that at least one pair was increasing, and at least one was decreasing
        return false;
    }

    if (min >= MIN_SAFE_DELTA && max <= MAX_SAFE_DELTA) {
        return true;
    }

    if (min >= -MAX_SAFE_DELTA && max <= -MIN_SAFE_DELTA) {
        return true;
    }

    return false;
}

function is_safe_report_part2(report) {
    if (is_safe_report_part1(report)) {
        return true;
    }

    // Apply the Problem Dampener by checking whether
    // removing any single level makes the report safe
    for (let i = 0; i < report.length; i++) {
        const candidate = report.toSpliced(i, 1);
        if (is_safe_report_part1(candidate)) {
            return true;
        }
    }

    return false;
}

function test_is_safe_report_part1() {
    console.assert(is_safe_report_part1([1, 2, 3]));
    console.assert(is_safe_report_part1([1, 3, 5]));
    console.assert(!is_safe_report_part1([1, 1, 2]));
    console.assert(!is_safe_report_part1([1, 5, 6]));
}

function test_is_safe_report_part2() {
    console.assert(is_safe_report_part2([1, 2, 100, 3]));
    console.assert(!is_safe_report_part2([1, 2, 100, 101, 3]));
}

/**
 * 
 * @param {number[][]} input
 * @param {function(number[]): boolean} is_safe_report
 */
function count_safe_reports(input, is_safe_report) {
    let safe_count = 0;
    for (const report of input) {
        if (is_safe_report(report)) {
            safe_count++;
        }
    }

    return safe_count;
}

function test_day2a() {
    const reports = parse_input(provided_test_input);
    const result = count_safe_reports(reports, is_safe_report_part1);
    console.assert(result === 2);
}

function run_day2a(input, outputDiv) {
    const reports = parse_input(input);
    const result = count_safe_reports(reports, is_safe_report_part1);
    outputDiv.innerText = `Safe reports: ${result}`;
}

function test_day2b() {
    const reports = parse_input(provided_test_input);
    const result = count_safe_reports(reports, is_safe_report_part2);
    console.assert(result === 4);
}

function run_day2b(input, outputDiv) {
    const reports = parse_input(input);
    const result = count_safe_reports(reports, is_safe_report_part2);
    outputDiv.innerText = `Safe reports: ${result}`;
}

export const day2a = {
    name: "Day 2a",
    default_input: provided_test_input,
    run_func: run_day2a,
    tests: [test_parse_input, test_is_safe_report_part1, test_day2a]
};

export const day2b = {
    name: "Day 2b",
    default_input: provided_test_input,
    run_func: run_day2b,
    tests: [test_is_safe_report_part2, test_day2b]
}