import { Body, Controller, Get, HttpException, HttpStatus, Post, UsePipes } from '@nestjs/common'
import { ERROR_MESSAGE } from 'src/utils/error-message'
import { ValidationPipe } from 'src/pipes/validation.pipe'
import { Category } from './categories.entity'
import { CategoriesService } from './categories.service'
import { CategorySchema } from './dto/category.dto'
import { CreateCategoryRequestDto } from './dto/create-category.dto'

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll()
  }

  @Post()
  @UsePipes(new ValidationPipe<CreateCategoryRequestDto>(CategorySchema))
  async create(@Body() category: CreateCategoryRequestDto): Promise<void> {
    try {
      await this.categoriesService.create(category)
      return
    } catch (e) {
      throw new HttpException(ERROR_MESSAGE.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
