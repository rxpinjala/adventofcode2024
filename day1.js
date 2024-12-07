// @ts-check

function parse_numbers(input) {
    let lines = input.trim().split("\n");
    let list1 = [];
    let list2 = [];
    for (let line of lines) {
        let nums = line.trim().split(/\s+/);
        if (nums.length === 2) {
            list1.push(Number(nums[0]));
            list2.push(Number(nums[1]));
        }
    }

    return { list1, list2 };
}

function compare_numbers_in_order(lists) {
    let list1 = lists.list1;
    let list2 = lists.list2;

    list1.sort();
    list2.sort();

    let result = 0;
    for (let i = 0; i < list1.length; i++) {
        result += Math.abs(list1[i] - list2[i]);
    }

    return result;
}

/**
 * Calculate a total similarity score by adding up each number in the left list
 * after multiplying it by the number of times that number appears in the right list.
 */
function compute_similarity_score(lists) {
    let list1 = lists.list1;
    let list2 = lists.list2;

    // We can compute the similarity score in O(n log n) time by sorting
    // the lists and finding consecutive runs of the same number
    list1.sort();
    list2.sort();

    let run_length = function(list, i) {
        let count = 1;
        while (i < (list.length - 1) && list[i] == list[i + 1]) {
            count++;
            i++;
        }
        return count;
    }

    let i1 = 0;
    let i2 = 0;
    let result = 0;

    while (i1 < list1.length && i2 < list2.length) {
        // Get the next value from list1, and compute the run length in list1
        let current_num = list1[i1];
        let rl1 = run_length(list1, i1);

        // Search for a matching value in list2
        while (i2 < list2.length && list2[i2] < current_num) {
            i2++;
        }
        if (i2 == list2.length) {
            break;
        }
        if (list2[i2] > current_num) {
            // No matches for this run in list1, move to the next one
            i1 += rl1;
            continue;
        }

        // Sanity check
        if (list2[i2] != current_num) {
            throw new Error("This shouldn't happen");
        }

        // Compute the run length in list2
        let rl2 = run_length(list2, i2);
        let similarity = current_num * rl1 * rl2;
        result += similarity;

        // Advance to the next run
        i1 += rl1;
        i2 += rl2;
    }

    return result;
}

const provided_test_input = 
`3   4
4   3
2   5
1   3
3   9
3   3`;

/**
 * 
 * @param {string} input
 * @param {HTMLElement} outputDiv 
 */
function run_day1a(input, outputDiv) {
    const lists = parse_numbers(input);
    const result = compare_numbers_in_order(lists);
    outputDiv.innerText = String(result);
}

function test_day1a() {
    let lists = parse_numbers(provided_test_input);
    console.assert(_.isEqual(lists.list1, [3, 4, 2, 1, 3, 3]));
    console.assert(_.isEqual(lists.list2, [4, 3, 5, 3, 9, 3]));

    let result = compare_numbers_in_order(lists);
    console.log(result);
    console.assert(result === 11);
}

function run_day1b(input, outputDiv) {
    const lists = parse_numbers(input);
    const result = compute_similarity_score(lists);
    outputDiv.innerText = String(result);
}

function test_day1b() {
    const lists = parse_numbers(provided_test_input);
    const result = compute_similarity_score(lists);
    console.assert(result === 31);
}

export const day1a = {
    name: "Day 1a",
    default_input: provided_test_input,
    run_func: run_day1a,
    test_func: test_day1a,
};

export const day1b = {
    name: "Day 1b",
    default_input: provided_test_input,
    run_func: run_day1b,
    test_func: test_day1b,
};
