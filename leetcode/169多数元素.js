/**
 * 给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数大于 ⌊n / 2⌋ 的元素。
 * 你可以假设数组是非空的，并且给定的数组总是存在多数元素。
 * 
 * 示例 1：
 * 输入：nums = [3,2,3]
 * 输出：3
 * 
 * 示例 2：
 * 输入：nums = [2,2,1,1,1,2,2]
 * 输出：2
 * 
 * 
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    nums.sort((a, b) => a - b);
    return nums[Math.floor(nums.length / 2)];
};

console.log(majorityElement([3,2,3]));
console.log(majorityElement([2,2,1,1,1,2,2]));

// Boyer-Moore
/**
 * @param {number[]} nums
 * @return {number}
 */
// Boyer-Moore 投票算法是一种用于寻找数组中多数元素的有效方法。
// 多数元素是指在数组中出现次数大于 ⌊n / 2⌋ 的元素。
// 该算法的核心思想是通过维护一个候选者和计数器来跟踪可能的多数元素。
// 初始时，候选者为数组的第一个元素，计数器为 0。
// 遍历数组时，如果计数器为 0，则将当前元素设为候选者，并将计数器设为 1。
// 如果当前元素等于候选者，则计数器加 1，否则计数器减 1。
// 由于多数元素的出现次数大于数组长度的一半，最终候选者即为多数元素。

var majorityElement = function(nums) {
    let count = 0;
    let candidate = nums[0];

    for (let num of nums) {
        if (count === 0) {
            candidate = num;
            count = 1;
        } else if (candidate === num) {
            count++;
        } else {
            count--;
        }
    }
    return candidate;
};

console.log(majorityElement([3,2,3]));
console.log(majorityElement([2,2,1,1,1,2,2]));
