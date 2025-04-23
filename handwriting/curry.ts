/**
 * 函数柯里化工具类
 * 提供基础柯里化和高级柯里化功能
 */

/**
 * 基础柯里化函数
 * 将多参数函数转换为单参数函数链式调用
 * @param fn 需要柯里化的函数
 * @returns 柯里化后的函数
 * 
 * @example
 * const add = (a: number, b: number) => a + b;
 * const curriedAdd = curry(add);
 * curriedAdd(1)(2); // 3
 */
function curry<T extends (...args: any[]) => any>(fn: T): any {
    return function curried(...args: any[]): any {
        // 如果参数数量足够，直接调用原函数
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        // 否则返回一个新函数，等待接收更多参数
        return function(...moreArgs: any[]): any {
            return curried.apply(this, args.concat(moreArgs));
        };
    };
}

/**
 * 高级柯里化函数
 * 支持占位符和任意参数数量的函数
 * @param fn 需要柯里化的函数
 * @param arity 期望的参数数量，默认为原函数的参数数量
 * @returns 柯里化后的函数
 * 
 * @example
 * const add = (...args: number[]) => args.reduce((a, b) => a + b, 0);
 * const curriedAdd = advancedCurry(add, 3);
 * curriedAdd(1)(2)(3); // 6
 * curriedAdd(1, 2)(3); // 6
 * curriedAdd(1)(2, 3); // 6
 */
function advancedCurry<T extends (...args: any[]) => any>(
    fn: T,
    arity: number = fn.length
): any {
    return function curried(...args: any[]): any {
        // 如果参数数量足够，直接调用原函数
        if (args.length >= arity) {
            return fn.apply(this, args);
        }
        // 否则返回一个新函数，等待接收更多参数
        return function(...moreArgs: any[]): any {
            return curried.apply(this, args.concat(moreArgs));
        };
    };
}

/**
 * 带占位符的柯里化函数
 * 使用 _ 作为占位符，允许参数乱序传入
 * @param fn 需要柯里化的函数
 * @returns 柯里化后的函数
 * 
 * @example
 * const add = (a: number, b: number, c: number) => a + b + c;
 * const curriedAdd = placeholderCurry(add);
 * curriedAdd(_, 2, _)(1)(3); // 6
 */
const _ = Symbol('placeholder');

function placeholderCurry<T extends (...args: any[]) => any>(fn: T): any {
    return function curried(...args: any[]): any {
        // 检查是否所有参数都已填充（没有占位符）
        const isComplete = args.length >= fn.length && 
            !args.slice(0, fn.length).includes(_);

        if (isComplete) {
            return fn.apply(this, args);
        }

        return function(...moreArgs: any[]): any {
            // 合并参数，用新参数替换占位符
            const newArgs = args.map(arg => 
                arg === _ && moreArgs.length > 0 ? moreArgs.shift() : arg
            );
            return curried.apply(this, newArgs.concat(moreArgs));
        };
    };
}

// 测试用例
// 基础柯里化
const add = (a: number, b: number) => a + b;
const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)); // 3

// 高级柯里化
const sum = (...args: number[]) => args.reduce((a, b) => a + b, 0);
const curriedSum = advancedCurry(sum, 3);
console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6

// 带占位符的柯里化
const addThree = (a: number, b: number, c: number) => a + b + c;
const curriedAddThree = placeholderCurry(addThree);
console.log(curriedAddThree(_, 2, _)(1)(3)); // 6 