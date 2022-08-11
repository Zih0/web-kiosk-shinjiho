import { BadRequestException } from '@nestjs/common'
import { Injectable, PipeTransform } from '@nestjs/common'
import { ObjectSchema } from 'joi'

@Injectable()
export class ValidationPipe<T> implements PipeTransform<T> {
  constructor(private schema: ObjectSchema) {}

  transform(value: T): T {
    const { error } = this.schema.validate(value)
    if (error) {
      const errorMessages = error.details.map((d) => d.message).join()
      throw new BadRequestException(errorMessages)
    }

    return value
  }
}
