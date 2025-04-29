/**
 * 给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。
 * 
 * 示例 1:
 * 输入: nums = [1,2,3,4,5,6,7], k = 3
 * 输出: [5,6,7,1,2,3,4]
 * 解释:
 * 向右轮转 1 步: [7,1,2,3,4,5,6]
 * 向右轮转 2 步: [6,7,1,2,3,4,5]
 * 向右轮转 3 步: [5,6,7,1,2,3,4]
 * 
 * 示例 2:
 * 输入：nums = [-1,-100,3,99], k = 2
 * 输出：[3,99,-1,-100]
 * 解释: 
 * 向右轮转 1 步: [99,-1,-100,3]
 * 向右轮转 2 步: [3,99,-1,-100]
 */

/**
 * 解法一：使用额外数组
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    const n = nums.length;
    k = k % n; // 处理 k 大于数组长度的情况
    
    const temp = [...nums];
    for (let i = 0; i < n; i++) {
        nums[(i + k) % n] = temp[i];
    }
};

/**
 * 解法二：三次反转
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate2 = function(nums, k) {
    const n = nums.length;
    k = k % n;
    
    // 反转整个数组
    reverse(nums, 0, n - 1);
    // 反转前k个元素
    reverse(nums, 0, k - 1);
    // 反转剩余元素
    reverse(nums, k, n - 1);
};

// 辅助函数：反转数组指定范围
function reverse(nums, start, end) {
    while (start < end) {
        [nums[start], nums[end]] = [nums[end], nums[start]];
        start++;
        end--;
    }
}

// 测试用例
let nums1 = [1,2,3,4,5,6,7];
rotate(nums1, 3);
console.log(nums1); // 输出: [5,6,7,1,2,3,4]

let nums2 = [-1,-100,3,99];
rotate2(nums2, 2);
console.log(nums2); // 输出: [3,99,-1,-100] 