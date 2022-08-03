import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common'
import { ERROR_MESSAGE } from 'src/common/error-mesage'
import { Category } from './categories.entity'
import { CategoriesService } from './categories.service'
import { CreateCategoryResponseDto } from './dto/create-category.dto'
import { CreateCategoryValidatorPipe } from './validation.pipe'

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll()
  }

  @Post()
  async create(@Body(new CreateCategoryValidatorPipe()) category: Category): Promise<CreateCategoryResponseDto> {
    try {
      const data = await this.categoriesService.create(category)
      return data
    } catch (e) {
      throw new HttpException(ERROR_MESSAGE.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
