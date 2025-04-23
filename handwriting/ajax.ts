/**
 * AJAX 请求工具类
 * 提供基于 XMLHttpRequest 的 HTTP 请求方法
 */

/**
 * 发送 AJAX 请求
 * @param url 请求地址
 * @param method 请求方法，默认为 'GET'
 * @param data 请求数据，仅在 POST 请求时使用
 * @returns Promise 对象，包含响应数据
 */
function ajax(url: string, method: string = 'GET', data: any = null): Promise<any> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.responseText);
                } else {
                    reject(new Error(`Request failed with status: ${xhr.status}`));
                }
            }
        };

        xhr.onerror = function() {
            reject(new Error('Network error'));
        };

        if (method === 'POST' && data) {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        } else {
            xhr.send();
        }
    });
}

// 测试用例
// GET 请求
ajax('https://api.example.com/data')
    .then(response => console.log('GET response:', response))
    .catch(error => console.error('GET error:', error));

// POST 请求
ajax('https://api.example.com/data', 'POST', { name: 'test', value: 123 })
    .then(response => console.log('POST response:', response))
    .catch(error => console.error('POST error:', error));
