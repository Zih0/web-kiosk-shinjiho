import { Body, Controller, Get, Post } from '@nestjs/common'
import { Category } from './categories.entity'
import { CategoriesService } from './categories.service'

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll()
  }

  @Post()
  create(@Body() category: Category): Promise<void> {
    return this.categoriesService.create(category)
  }
}
