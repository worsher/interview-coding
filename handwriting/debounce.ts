/**
 * 防抖工具类
 * 用于限制函数在指定时间内只能执行一次
 */

/**
 * 创建防抖函数
 * @param func 需要防抖的函数
 * @param wait 等待时间（毫秒）
 * @returns 防抖后的函数
 */
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: number | null = null;

    return function(this: any, ...args: Parameters<T>) {
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}

// 测试用例
// 创建一个防抖的搜索函数
const debouncedSearch = debounce((query: string) => {
    console.log('Searching for:', query);
}, 300);

// 模拟用户输入
debouncedSearch('a');
debouncedSearch('ap');
debouncedSearch('app');
// 只有最后一次调用会执行，输出: Searching for: app
