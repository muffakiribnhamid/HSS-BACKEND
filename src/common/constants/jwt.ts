export const jwtConstants = {
    secret: process.env.JWT_SECRET || 'fallbackSecret',
    expires: process.env.JWT_EXPIRES_IN || '10h'
};