import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UsePipes } from '@nestjs/common'
import { ValidationPipe } from 'src/pipes/validation.pipe'
import { ERROR_MESSAGE } from 'src/utils/error-message'
import { CreateProductOptionDetailRequestDto } from './dto/create-product-option-detail.dto'
import { CreateProductOptionRequestDto } from './dto/create-product-option.dto'
import { CreateProductRequestDto } from './dto/create-product.dto'
import { OptionDetailSchema } from './dto/option-detail.dto'
import { OptionSchema } from './dto/option.dto'
import { ProductSchema } from './dto/product.dto'
import { Product } from './entities/products.entity'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll()
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Product[]> {
    return this.productsService.findOneById(+id)
  }

  @Post()
  @UsePipes(new ValidationPipe<CreateProductRequestDto>(ProductSchema))
  async createProduct(@Body() product: CreateProductRequestDto) {
    try {
      const { options, ...productInfo } = product
      const newProduct = await this.productsService.create(productInfo)
      await this.productsService.setProductOptions(newProduct.id, options)
    } catch (e) {
      console.log(e)
      throw new HttpException(ERROR_MESSAGE.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post('/options')
  @UsePipes(new ValidationPipe<CreateProductRequestDto>(OptionSchema))
  createOption(@Body() option: CreateProductOptionRequestDto) {
    try {
      this.productsService.createProductOptions(option)
    } catch (e) {
      throw new HttpException(ERROR_MESSAGE.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post('/option-details')
  @UsePipes(new ValidationPipe<CreateProductRequestDto>(OptionDetailSchema))
  createOptionDetail(@Body() optionDetail: CreateProductOptionDetailRequestDto) {
    try {
      this.productsService.createProductOptionDetails(optionDetail)
    } catch (e) {
      throw new HttpException(ERROR_MESSAGE.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
