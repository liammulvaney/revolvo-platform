import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * 
 * @returns A decorator that marks a route as public, meaning it does not require authentication.
 */
export const AuthPublic = () => SetMetadata(IS_PUBLIC_KEY, true);