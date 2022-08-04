import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Category } from './categories.entity'
import { CreateCategoryRequestDto } from './dto/create-category.dto'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoriesRepository.find()
  }

  async findOne(id: number): Promise<Category> {
    return await this.categoriesRepository.findOne({
      where: {
        id,
      },
    })
  }

  async create(category: CreateCategoryRequestDto): Promise<void> {
    await this.categoriesRepository.save(category)
  }
}
