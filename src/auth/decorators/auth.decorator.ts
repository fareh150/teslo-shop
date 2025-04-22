import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ValidRoles } from "../interfaces";
import { RoleProtected } from "./role-protected.decorator";
import { UserRoleGuard } from "../guards/user-role.guard";

export function Auth(...roles: ValidRoles[])
{
    return applyDecorators(
        RoleProtected(...roles), // This decorator sets the metadata for the roles that are allowed to access the route
        UseGuards(AuthGuard(), UserRoleGuard), // AuthGuard() is the guard that checks if the user is authenticated
    )
}