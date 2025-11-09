import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { BranchesService } from './branches.service';
import {
  CreateBranchDto,
  UpdateBranchDto,
  BranchResponseDto,
} from './dto/branch.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { User } from '../../common/decorators/user.decorator';
import { UserRole } from '../../common/decorators/roles.decorator';

@ApiTags('Branches')
@ApiBearerAuth('JWT-auth')
@Controller('branches')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiOperation({ summary: 'Create a new branch' })
  @ApiResponse({
    status: 201,
    description: 'Branch created successfully',
    type: BranchResponseDto,
  })
  create(@Body() createBranchDto: CreateBranchDto, @User() currentUser: any) {
    return this.branchesService.create(createBranchDto, currentUser);
  }

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN, UserRole.STAFF, UserRole.CUSTOMER)
  @ApiOperation({ summary: 'Get all branches' })
  @ApiQuery({ name: 'shopId', required: false })
  @ApiResponse({
    status: 200,
    description: 'List of branches',
    type: [BranchResponseDto],
  })
  findAll(@Query('shopId') shopId?: string, @User() currentUser?: any) {
    return this.branchesService.findAll(shopId, currentUser);
  }

  @Get(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN, UserRole.STAFF, UserRole.CUSTOMER)
  @ApiOperation({ summary: 'Get branch by ID' })
  @ApiResponse({
    status: 200,
    description: 'Branch details',
    type: BranchResponseDto,
  })
  findOne(@Param('id') id: string, @User() currentUser?: any) {
    return this.branchesService.findOne(id, currentUser);
  }

  @Patch(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiOperation({ summary: 'Update branch' })
  @ApiResponse({
    status: 200,
    description: 'Branch updated successfully',
    type: BranchResponseDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateBranchDto: UpdateBranchDto,
    @User() currentUser: any,
  ) {
    return this.branchesService.update(id, updateBranchDto, currentUser);
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiOperation({ summary: 'Delete branch' })
  @ApiResponse({
    status: 200,
    description: 'Branch deleted successfully',
  })
  remove(@Param('id') id: string, @User() currentUser: any) {
    return this.branchesService.remove(id, currentUser);
  }
}

