import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateCategoryRequestDto } from 'src/categories/dto/create-category.dto'
import { Repository } from 'typeorm'
import { Product } from './products.entity'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find()
  }

  async create(product: CreateCategoryRequestDto): Promise<void> {
    await this.productsRepository.save(product)
  }
}
