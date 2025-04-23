/**
 * 节流工具类
 * 用于限制函数在指定时间内最多执行一次
 */

/**
 * 创建节流函数
 * @param func 需要节流的函数
 * @param limit 时间限制（毫秒）
 * @returns 节流后的函数
 */
function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
    let lastFunc: number | undefined;
    let lastRan: number | undefined;

    return function(this: any, ...args: Parameters<T>) {
        const context = this;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan!) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan!));
        }
    };
}

// 测试用例
// 创建一个节流的滚动处理函数
const throttledScroll = throttle(() => {
    console.log('Scroll event triggered');
}, 1000);

// 模拟滚动事件
throttledScroll();
throttledScroll();
throttledScroll();
// 在1秒内只会执行一次，输出: Scroll event triggered
