export const teamFactory = (options: any = {}) => {
    return {
        id: '1',
        displayName: 'Test Team',
        blackout: false,
        ...options 
    }
};
