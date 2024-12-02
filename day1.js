
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

export function day1() {

}

export function test1() {
    const testData = `3   4
4   3
2   5
1   3
3   9
3   3`;
    let lists = parse_numbers(testData);
    console.assert(_.isEqual(lists.list1, [3, 4, 2, 1, 3, 3]));
    console.assert(_.isEqual(lists.list2, [4, 3, 5, 3, 9, 3]));

    let result = compare_numbers_in_order(lists);
    console.log(result);
    console.assert(result === 11);
}