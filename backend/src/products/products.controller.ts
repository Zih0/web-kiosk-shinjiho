import { Body, Controller, Get, HttpException, HttpStatus, Post, UsePipes } from '@nestjs/common'
import { ValidationPipe } from 'src/pipes/validation.pipe'
import { ERROR_MESSAGE } from 'src/utils/error-message'
import { CreateProductRequestDto } from './dto/create-product.dto'
import { ProductSchema } from './dto/product.dto'
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
  @UsePipes(new ValidationPipe<CreateProductRequestDto>(ProductSchema))
  create(@Body() product: CreateProductRequestDto): Promise<void> {
    try {
      this.productsService.create(product)
      return
    } catch (e) {
      throw new HttpException(ERROR_MESSAGE.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
