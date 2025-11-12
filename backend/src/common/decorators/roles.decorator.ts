import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export type AppRole = 'ADMIN' | 'STORE' | 'FACTORY_STAFF';

export const Roles = (...roles: AppRole[]) => SetMetadata(ROLES_KEY, roles);
