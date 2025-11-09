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
import { EntitlementsService } from './entitlements.service';
import {
  CreateEntitlementDto,
  UpdateEntitlementDto,
  EntitlementResponseDto,
} from './dto/entitlement.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/decorators/roles.decorator';

@ApiTags('Entitlements')
@ApiBearerAuth('JWT-auth')
@Controller('entitlements')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EntitlementsController {
  constructor(private readonly entitlementsService: EntitlementsService) {}

  @Post()
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Create a new entitlement' })
  @ApiResponse({
    status: 201,
    description: 'Entitlement created successfully',
    type: EntitlementResponseDto,
  })
  create(@Body() createEntitlementDto: CreateEntitlementDto) {
    return this.entitlementsService.create(createEntitlementDto);
  }

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiOperation({ summary: 'Get all entitlements' })
  @ApiResponse({
    status: 200,
    description: 'List of entitlements',
    type: [EntitlementResponseDto],
  })
  findAll() {
    return this.entitlementsService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiOperation({ summary: 'Get entitlement by ID' })
  @ApiResponse({
    status: 200,
    description: 'Entitlement details',
    type: EntitlementResponseDto,
  })
  findOne(@Param('id') id: string) {
    return this.entitlementsService.findOne(id);
  }

  @Get('code/:code')
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiOperation({ summary: 'Get entitlement by code' })
  @ApiResponse({
    status: 200,
    description: 'Entitlement details',
    type: EntitlementResponseDto,
  })
  findByCode(@Param('code') code: string) {
    return this.entitlementsService.findByCode(code);
  }

  @Patch(':id')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Update entitlement' })
  @ApiResponse({
    status: 200,
    description: 'Entitlement updated successfully',
    type: EntitlementResponseDto,
  })
  update(@Param('id') id: string, @Body() updateEntitlementDto: UpdateEntitlementDto) {
    return this.entitlementsService.update(id, updateEntitlementDto);
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Delete entitlement' })
  @ApiResponse({
    status: 200,
    description: 'Entitlement deleted successfully',
  })
  remove(@Param('id') id: string) {
    return this.entitlementsService.remove(id);
  }
}

