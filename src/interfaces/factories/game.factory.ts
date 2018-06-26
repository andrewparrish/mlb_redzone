export const gameFactory = (options: any = {}) => {
    const date = new Date();
    return {
        id: '1',
        lastUpdated: date.toString(),
        link: '/abcd',
        alerts: [],
        ...options
    }
}
