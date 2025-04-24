/**
 * 题目：2799. 统计完全子数组的数目
 * 
 * 描述：
 * 给你一个由正整数组成的数组 nums。
 * 如果数组中的某个子数组满足下述条件，则称之为完全子数组：
 * 子数组中不同元素的数目等于整个数组不同元素的数目。
 * 返回数组中完全子数组的数目。
 * 
 * 子数组是数组中的一个连续非空序列。
 */

/**
 * @param {number[]} nums - 输入的正整数数组
 * @return {number} - 返回完全子数组的数目
 */
var countCompleteSubarrays = function(nums) {
    // 获取整个数组中不同元素的数目
    const totalUnique = new Set(nums).size;
    let count = 0;
    
    // 使用滑动窗口遍历所有可能的子数组
    for (let i = 0; i < nums.length; i++) {
        const set = new Set();
        
        for (let j = i; j < nums.length; j++) {
            // 将当前元素添加到集合中
            set.add(nums[j]);
            
            // 如果当前窗口中的不同元素数等于整个数组的不同元素数
            if (set.size === totalUnique) {
                count++;
            }
        }
    }
    
    return count;
}; 