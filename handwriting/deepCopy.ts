/**
 * 深拷贝工具类
 * 用于创建对象的完整副本，包括嵌套对象和数组
 */

/**
 * 创建对象的深拷贝
 * @param obj 需要拷贝的对象
 * @returns 拷贝后的新对象
 */
function deepCopy<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        const copy: any[] = [];
        for (let i = 0; i < obj.length; i++) {
            copy[i] = deepCopy(obj[i]);
        }
        return copy as T;
    }

    const copy: { [key: string]: any } = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            copy[key] = deepCopy((obj as any)[key]);
        }
    }
    return copy as T;
}

// 测试用例
// 创建一个包含嵌套对象和数组的测试对象
const testObj = {
    name: 'test',
    numbers: [1, 2, 3],
    nested: {
        a: 1,
        b: [4, 5, 6],
        c: {
            x: 7,
            y: 8
        }
    }
};

// 进行深拷贝
const copiedObj = deepCopy(testObj);

// 修改原始对象
testObj.numbers[0] = 9;
testObj.nested.c.x = 10;

// 验证深拷贝是否成功
console.log('Original:', testObj);
console.log('Copied:', copiedObj);
// 输出显示两个对象是独立的，修改一个不会影响另一个

