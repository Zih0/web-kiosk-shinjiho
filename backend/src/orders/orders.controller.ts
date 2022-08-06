import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common'
import { ERROR_MESSAGE } from 'src/utils/error-message'
import { CreateOrderRequestDto, CreateOrderResponseDto } from './dto/create-order.dto'
import { Order } from './orders.entity'
import { OrdersService } from './orders.service'

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Order> {
    return this.ordersService.findOne(+id)
  }

  @Post()
  async create(@Body() order: CreateOrderRequestDto): Promise<CreateOrderResponseDto> {
    try {
      const orderHistory = await this.ordersService.create(order)
      return orderHistory
    } catch (e) {
      throw new HttpException(ERROR_MESSAGE.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
