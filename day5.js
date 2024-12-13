// @ts-check

/**
 * @typedef {Object} PageOrderRule
 * @property {number} l
 * @property {number} r
 * 
 * @typedef {number[]} Update
 * 
 * @typedef {Object} ParseResult
 * @property {PageOrderRule[]} rules
 * @property {Update[]} updates
 * 
 * @param {string} input
 * @returns {ParseResult}
 */
function parse_input(input) {
    const lines = input.trim().split("\n");
    let rules = [];
    let updates = [];
    let parsing_rules = true;

    for (const line of lines) {
        if (line.length === 0) {
            parsing_rules = false;
            continue;
        }

        if (parsing_rules) {
            // Rule format: 'a|b', where a and b are integers
            const parts = line.split("|");
            if (parts.length != 2) {
                throw new Error(`Invalid rule: ${line.trim()}`);
            }
            rules.push({
                l: parseInt(parts[0]),
                r: parseInt(parts[1])
            });

        } else {
            // Update format: any number of comma-separated integers
            const update = line.split(",").map(x => parseInt(x));
            updates.push(update);
        }
    }

    return {
        rules: rules,
        updates: updates,
    }
}

/**
 * 
 * @param {PageOrderRule[]} rules 
 * @param {Update} update
 */
function check_update(rules, update) {
    for (let i = 0; i < update.length; i++) {
        for (const rule of rules) {
            if (rule.l === update[i]) {
                // rule.r must not be to the left of i
                const violates_rule = update.slice(0, i).includes(rule.r);
                if (violates_rule) {
                    return false;
                }
            }

            if (rule.r === update[i]) {
                // rule.l must not be to the right of i
                const violates_rule = update.slice(i+1).includes(rule.l);
                if (violates_rule) {
                    return false;
                }
            }
        }
    }

    return true;
}

function count_correct_updates(rules, updates) {
    let count = 0;
    for (const update of updates) {
        if (check_update(rules, update)) {
            count++;
        }
    }
    return count;
}

function test_check_update() {
    const rules = [
        {l:1, r:2},
        {l:2, r:3},
        {l:3, r:4},
    ];

    console.assert(check_update(rules, [1, 2, 3, 4]));
    console.assert(!check_update(rules, [1, 3, 2, 4]));
}

function run_day5a(input, outputDiv) {
    const problem = parse_input(input);
    let result = 0;
    for (const update of problem.updates) {
        if (check_update(problem.rules, update)) {
            result += update[update.length >> 1];
        }
    }
    outputDiv.innerText = `Result: ${result}`;
}

const provided_test_input = `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`.trim();

function test_parse_input() {
    const result = parse_input(provided_test_input);

    console.assert(result.rules.length === 21);
    console.assert(result.rules[0].l === 47);
    console.assert(result.rules[0].r === 53);

    console.assert(result.updates.length === 6);
    console.assert(_.isEqual(result.updates[0], [75,47,61,53,29]));
}

function test_day5a() {
    const problem = parse_input(provided_test_input);
    console.assert(check_update(problem.rules, problem.updates[0]));
    console.assert(check_update(problem.rules, problem.updates[1]));
    console.assert(check_update(problem.rules, problem.updates[2]));
    console.assert(!check_update(problem.rules, problem.updates[3]));
    console.assert(!check_update(problem.rules, problem.updates[4]));
    console.assert(!check_update(problem.rules, problem.updates[5]));
}

export const day5a = {
    name: "Day 5a",
    default_input: provided_test_input,
    run_func: run_day5a,
    tests: [test_parse_input, test_check_update, test_day5a],
};
