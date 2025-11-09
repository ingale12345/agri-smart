import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entitlement, EntitlementDocument } from './schemas/entitlement.schema';
import { CreateEntitlementDto, UpdateEntitlementDto } from './dto/entitlement.dto';

@Injectable()
export class EntitlementsService {
  constructor(
    @InjectModel(Entitlement.name)
    private entitlementModel: Model<EntitlementDocument>,
  ) {}

  async create(createEntitlementDto: CreateEntitlementDto) {
    const existingEntitlement = await this.entitlementModel.findOne({
      entitlementCode: createEntitlementDto.entitlementCode.toUpperCase(),
    });

    if (existingEntitlement) {
      throw new ConflictException(
        'Entitlement with this code already exists',
      );
    }

    const entitlement = new this.entitlementModel({
      ...createEntitlementDto,
      entitlementCode: createEntitlementDto.entitlementCode.toUpperCase(),
      moduleCode: createEntitlementDto.moduleCode.toUpperCase(),
    });

    return entitlement.save();
  }

  async findAll() {
    return this.entitlementModel.find().sort({ entitlementName: 1 }).exec();
  }

  async findOne(id: string) {
    const entitlement = await this.entitlementModel.findById(id).exec();
    if (!entitlement) {
      throw new NotFoundException('Entitlement not found');
    }
    return entitlement;
  }

  async findByCode(entitlementCode: string) {
    const entitlement = await this.entitlementModel
      .findOne({ entitlementCode: entitlementCode.toUpperCase() })
      .exec();
    if (!entitlement) {
      throw new NotFoundException('Entitlement not found');
    }
    return entitlement;
  }

  async update(id: string, updateEntitlementDto: UpdateEntitlementDto) {
    const entitlement = await this.entitlementModel.findById(id).exec();
    if (!entitlement) {
      throw new NotFoundException('Entitlement not found');
    }

    Object.assign(entitlement, updateEntitlementDto);
    return entitlement.save();
  }

  async remove(id: string) {
    const entitlement = await this.entitlementModel.findById(id).exec();
    if (!entitlement) {
      throw new NotFoundException('Entitlement not found');
    }

    await this.entitlementModel.findByIdAndDelete(id).exec();
    return { message: 'Entitlement deleted successfully' };
  }
}

