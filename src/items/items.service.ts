import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepo: Repository<Item>,
  ) {}

  create(dto: CreateItemDto) {
    const item = this.itemRepo.create(dto);
    return this.itemRepo.save(item);
  }

  findAll() {
    return this.itemRepo.find();
  }

  async findOne(id: number) {
    const item = await this.itemRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException();
    return item;
  }

  async update(id: number, dto: UpdateItemDto) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.itemRepo.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    await this.itemRepo.remove(item);
  }
}
