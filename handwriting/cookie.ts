/**
 * Cookie 操作工具类
 * 提供设置、获取和删除 cookie 的原生方法
 */

/**
 * 设置 cookie
 * @param name cookie 名称
 * @param value cookie 值
 * @param options 可选配置项
 * @param options.expires 过期时间（天数）
 * @param options.path cookie 路径
 * @param options.domain cookie 域名
 * @param options.secure 是否只在 HTTPS 连接中传输
 * @param options.sameSite 同站策略
 */
function setCookie(
    name: string,
    value: string,
    options: {
        expires?: number;
        path?: string;
        domain?: string;
        secure?: boolean;
        sameSite?: 'Strict' | 'Lax' | 'None';
    } = {}
): void {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    // 设置过期时间
    if (options.expires) {
        const date = new Date();
        date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
        cookieString += `; expires=${date.toUTCString()}`;
    }

    // 设置路径
    if (options.path) {
        cookieString += `; path=${options.path}`;
    }

    // 设置域名
    if (options.domain) {
        cookieString += `; domain=${options.domain}`;
    }

    // 设置安全标志
    if (options.secure) {
        cookieString += '; secure';
    }

    // 设置同站策略
    if (options.sameSite) {
        cookieString += `; samesite=${options.sameSite}`;
    }

    document.cookie = cookieString;
}

/**
 * 获取 cookie
 * @param name cookie 名称
 * @returns cookie 值，如果不存在则返回 null
 */
function getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(`${encodeURIComponent(name)}=`)) {
            return decodeURIComponent(cookie.substring(name.length + 1));
        }
    }
    return null;
}

/**
 * 删除 cookie
 * @param name cookie 名称
 * @param options 可选配置项
 * @param options.path cookie 路径
 * @param options.domain cookie 域名
 */
function deleteCookie(
    name: string,
    options: {
        path?: string;
        domain?: string;
    } = {}
): void {
    setCookie(name, '', {
        ...options,
        expires: -1 // 设置为过去的时间，使 cookie 立即过期
    });
}

// 测试用例
// 设置 cookie
setCookie('testCookie', 'hello world', {
    expires: 7,
    path: '/',
    secure: true,
    sameSite: 'Strict'
});

// 获取 cookie
const value = getCookie('testCookie');
console.log('Cookie value:', value); // 输出: hello world

// 删除 cookie
deleteCookie('testCookie');
console.log('Cookie after deletion:', getCookie('testCookie')); // 输出: null 