import { PipeTransform, BadRequestException } from '@nestjs/common'

import { CreateCategoryRequestDto } from './dto/create-category.dto'

import { CategorySchema } from './dto/category.dto'

export class CreateCategoryValidatorPipe implements PipeTransform<CreateCategoryRequestDto> {
  public transform(value: CreateCategoryRequestDto): CreateCategoryRequestDto {
    const result = CategorySchema.validate(value)
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join()
      throw new BadRequestException(errorMessages)
    }
    return value
  }
}
