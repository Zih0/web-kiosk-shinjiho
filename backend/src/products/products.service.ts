import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateProductRequestDto } from './dto/create-product.dto'
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

  async create(product: CreateProductRequestDto): Promise<void> {
    const newProduct = this.productsRepository.create(product)
    await this.productsRepository.save(newProduct)
  }
}
