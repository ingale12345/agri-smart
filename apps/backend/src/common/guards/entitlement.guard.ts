import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  ENTITLEMENT_KEY,
  EntitlementRequirement,
} from '../decorators/entitlement.decorator';

@Injectable()
export class EntitlementGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requirement =
      this.reflector.getAllAndOverride<EntitlementRequirement>(
        ENTITLEMENT_KEY,
        [context.getHandler(), context.getClass()]
      );

    if (!requirement) {
      return true; // No entitlement requirement, allow access
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // SUPER_ADMIN has all permissions
    if (user.role === 'SUPER_ADMIN') {
      return true;
    }

    // Check if user has permissions array
    if (!user.permissions || !Array.isArray(user.permissions)) {
      throw new ForbiddenException(
        'User does not have any permissions assigned'
      );
    }

    // Find the required entitlement in user's permissions
    const userPermission = user.permissions.find(
      (perm: any) =>
        perm.entitlementCode.toUpperCase() ===
        requirement.entitlementCode.toUpperCase()
    );

    if (!userPermission) {
      throw new ForbiddenException(
        `User does not have access to ${requirement.entitlementCode}`
      );
    }

    // Check if the required permission is granted
    const hasPermission = userPermission.permissions[requirement.permission];

    if (!hasPermission) {
      throw new ForbiddenException(
        `User does not have ${requirement.permission} permission for ${requirement.entitlementCode}`
      );
    }

    return true;
  }
}
