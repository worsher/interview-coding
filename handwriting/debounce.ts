function debounce(func: Function, wait: number) {
    let timeout: number | null = null;

    return function(...args: any[]) {
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}
