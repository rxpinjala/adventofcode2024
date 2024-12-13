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

    //console.log(`Found ${needle} at (${y}, ${x})(${dy}, ${dx})`);
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

function is_x_mas(haystack, y, x) {
    if (haystack[y][x] != 'A') {
        return false;
    }

    // Can we access adjacent positions?
    if (!is_valid_coord(haystack, y-1, x-1) ||
        !is_valid_coord(haystack, y+1, x-1) ||
        !is_valid_coord(haystack, y+1, x+1) ||
        !is_valid_coord(haystack, y-1, x+1)) {
        return false;
    }

    // Go around the circle of diagonal letters twice
    // If we find the pattern "MMSS", that means that we have an M across from an S in both directions
    const chars = [
        haystack[y-1][x-1],
        haystack[y-1][x+1],
        haystack[y+1][x+1],
        haystack[y+1][x-1],
        haystack[y-1][x-1],
        haystack[y-1][x+1],
        haystack[y+1][x+1],
    ].join("");
    const result = chars.includes("MMSS");
    return result;
}

function count_x_mas(input) {
    // Split into lines
    const haystack = input.split("\n");

    let count = 0;
    for (let y = 0; y < haystack.length; y++) {
        for (let x = 0; x < haystack[y].length; x++) {
            if (is_x_mas(haystack, y, x)) {
                count++;
            }
        }
    }

    return count;
}

function run_day4b(input, outputDiv) {
    const result = count_x_mas(input);
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
    const result = count_words(provided_test_input, "XMAS");
    console.assert(result === 18);
}

function test_day4b() {
    const result = count_x_mas(provided_test_input);
    console.assert(result === 9);
}

export const day4a = {
    name: "Day 4a",
    default_input: provided_test_input,
    run_func: run_day4a,
    tests: [test_day4a],
};

export const day4b = {
    name: "Day 4b",
    default_input: provided_test_input,
    run_func: run_day4b,
    tests: [test_day4b],
}