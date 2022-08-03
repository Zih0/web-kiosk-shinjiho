import { Body, Controller, Get, Post } from '@nestjs/common'
import { Product } from './products.entity'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll()
  }

  @Post()
  create(@Body() product: Product): Promise<void> {
    return this.productsService.create(product)
  }
}
