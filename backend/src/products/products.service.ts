import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateProductOptionDetailRequestDto } from './dto/create-product-option-detail.dto'
import { CreateProductOptionRequestDto } from './dto/create-product-option.dto'
import { CreateProductDto } from './dto/create-product.dto'
import { ProductOptionDetail } from './entities/product-option-detail.entity'
import { ProductOption } from './entities/product-option.entity'
import { Product } from './entities/products.entity'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,

    @InjectRepository(ProductOption)
    private productOptionRepository: Repository<ProductOption>,

    @InjectRepository(ProductOptionDetail)
    private productOptionDetailRepository: Repository<ProductOptionDetail>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find()
  }

  async findOneById(categoryId: number): Promise<Product[]> {
    return await this.productsRepository.find({ where: { category_id: categoryId } })
  }

  async createProductOptions(productOption: CreateProductOptionRequestDto) {
    await this.productOptionRepository.save(productOption)
  }

  async createProductOptionDetails(optionDetail: CreateProductOptionDetailRequestDto): Promise<void> {
    await this.productOptionDetailRepository.save(optionDetail)
  }

  /**
   * 상품 - 옵션 ManyToMany 설정
   * @param productId 상품 id
   * @param options 상품 옵션 목록
   */
  async setProductOptions(productId: number, options: number[]): Promise<void> {
    Promise.all(
      options.map(
        async (optionId) =>
          await this.productsRepository
            .createQueryBuilder('product_to_option')
            .relation(Product, 'options')
            .of(productId)
            .add(optionId),
      ),
    )
  }

  async create(product: CreateProductDto): Promise<Product> {
    const newProduct = this.productsRepository.create(product)
    return await this.productsRepository.save(newProduct)
  }
}
