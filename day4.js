// @ts-check

/**
 * @param {string[]} haystack
 * @param {number} y  
 * @param {number} x
 */
function is_valid_coord(haystack, y, x) {
    if (y < 0 || y >= haystack.length) {
        return false;
    }
    if (x < 0 || x >= haystack[y].length) {
        return false;
    }
    return true;
}

/**
 * Return 1 if we find the word at the given position and direction, 0 otherwise
 * 
 * @param {string[]} haystack 
 * @param {number} y 
 * @param {number} x
 * @param {number} dy
 * @param {number} dx
 * @param {string} needle 
 */
function count_word(haystack, y, x, dy, dx, needle) {
    const len = needle.length;

    // Check that we can read a string with the given position, len, and direction
    if (!is_valid_coord(haystack, y, x) ||
        !is_valid_coord(haystack, y + dy * (len-1), x + dx * (len-1))) {
        return 0;
    }

    for (let i = 0; i < len; i++) {
        const char = haystack[y + dy * i][x + dx * i];
        if (char !== needle[i]) {
            return 0;
        }
    }

    console.log(`Found ${needle} at (${y}, ${x})(${dy}, ${dx})`);
    return 1;
}

function count_words(input, needle) {
    // Split into lines
    const haystack = input.split("\n");
    let count = 0;
    for (let y = 0; y < haystack.length; y++) {
        for (let x = 0; x < haystack[y].length; x++) {
            // Check each direction we're searching
            count += count_word(haystack, y, x, 0, 1, needle);
            count += count_word(haystack, y, x, 1, 1, needle);
            count += count_word(haystack, y, x, 1, 0, needle);
            count += count_word(haystack, y, x, 1, -1, needle);
            count += count_word(haystack, y, x, 0, -1, needle);
            count += count_word(haystack, y, x, -1, -1, needle);
            count += count_word(haystack, y, x, -1, 0, needle);
            count += count_word(haystack, y, x, -1, 1, needle);
        }
    }

    return count;
}

function run_day4a(input, outputDiv) {
    const result = count_words(input, "XMAS");
    outputDiv.innerText = `Result: ${result}`;
}

const provided_test_input = 
`
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`.trim();

function test_day4a() {
    console.assert(count_word(provided_test_input.split("\n"), 9, 3, -1, -1, "XMAS") === 1);

    const result = count_words(provided_test_input, "XMAS");
    console.assert(result === 18);
}

export const day4a = {
    name: "Day 4a",
    default_input: provided_test_input,
    run_func: run_day4a,
    tests: [test_day4a],
}