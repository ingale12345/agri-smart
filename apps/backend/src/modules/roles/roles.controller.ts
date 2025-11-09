import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDto, UpdateRoleDto, RoleResponseDto } from './dto/role.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { User } from '../../common/decorators/user.decorator';
import { UserRole } from '../../common/decorators/roles.decorator';

@ApiTags('Roles')
@ApiBearerAuth('JWT-auth')
@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('shop/:shopId')
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({
    status: 201,
    description: 'Role created successfully',
    type: RoleResponseDto,
  })
  create(
    @Param('shopId') shopId: string,
    @Body() createRoleDto: CreateRoleDto,
    @User() currentUser: any,
  ) {
    return this.rolesService.create(createRoleDto, shopId, currentUser.id);
  }

  @Get('shop/:shopId')
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiOperation({ summary: 'Get all roles for a shop' })
  @ApiResponse({
    status: 200,
    description: 'List of roles',
    type: [RoleResponseDto],
  })
  findAll(@Param('shopId') shopId: string, @User() currentUser?: any) {
    return this.rolesService.findAll(shopId, currentUser);
  }

  @Get(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiOperation({ summary: 'Get role by ID' })
  @ApiResponse({
    status: 200,
    description: 'Role details',
    type: RoleResponseDto,
  })
  findOne(@Param('id') id: string, @User() currentUser?: any) {
    return this.rolesService.findOne(id, currentUser);
  }

  @Patch(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiOperation({ summary: 'Update role' })
  @ApiResponse({
    status: 200,
    description: 'Role updated successfully',
    type: RoleResponseDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
    @User() currentUser: any,
  ) {
    return this.rolesService.update(id, updateRoleDto, currentUser);
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiOperation({ summary: 'Delete role' })
  @ApiResponse({
    status: 200,
    description: 'Role deleted successfully',
  })
  remove(@Param('id') id: string, @User() currentUser: any) {
    return this.rolesService.remove(id, currentUser);
  }

  @Post('users/:userId/role/:roleId')
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiOperation({ summary: 'Assign role to user' })
  @ApiResponse({
    status: 200,
    description: 'Role assigned to user successfully',
  })
  assignRoleToUser(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
    @User() currentUser: any,
  ) {
    return this.rolesService.assignRoleToUser(userId, roleId, currentUser);
  }

  @Delete('users/:userId/role')
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiOperation({ summary: 'Remove role from user' })
  @ApiResponse({
    status: 200,
    description: 'Role removed from user successfully',
  })
  removeRoleFromUser(@Param('userId') userId: string, @User() currentUser: any) {
    return this.rolesService.removeRoleFromUser(userId, currentUser);
  }
}

