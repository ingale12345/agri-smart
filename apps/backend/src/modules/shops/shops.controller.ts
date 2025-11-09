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
import { ShopsService } from './shops.service';
import { CreateShopDto, UpdateShopDto, ShopResponseDto } from './dto/shop.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/decorators/roles.decorator';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Shops')
@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create a new shop' })
  @ApiResponse({
    status: 201,
    description: 'Shop created successfully',
    type: ShopResponseDto,
  })
  create(@Body() createShopDto: CreateShopDto) {
    return this.shopsService.create(createShopDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all shops' })
  @ApiResponse({
    status: 200,
    description: 'List of shops',
    type: [ShopResponseDto],
  })
  findAll() {
    return this.shopsService.findAll();
  }

  @Get('code/:code')
  @Public()
  @ApiOperation({ summary: 'Get shop by code' })
  @ApiResponse({
    status: 200,
    description: 'Shop details',
    type: ShopResponseDto,
  })
  findByCode(@Param('code') code: string) {
    return this.shopsService.findByCode(code);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get shop by ID' })
  @ApiResponse({
    status: 200,
    description: 'Shop details',
    type: ShopResponseDto,
  })
  findOne(@Param('id') id: string) {
    return this.shopsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update shop' })
  @ApiResponse({
    status: 200,
    description: 'Shop updated successfully',
    type: ShopResponseDto,
  })
  update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.shopsService.update(id, updateShopDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete shop' })
  @ApiResponse({
    status: 200,
    description: 'Shop deleted successfully',
  })
  remove(@Param('id') id: string) {
    return this.shopsService.remove(id);
  }
}

