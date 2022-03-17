export const rnd = (min: number, max: number) => {
    return Math.round(Math.random() * (max - min) + min);
}

export const sleep = (delay: number) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, delay);
    })
}