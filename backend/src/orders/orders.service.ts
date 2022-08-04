import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateOrderRequestDto, CreateOrderResponseDto } from './dto/create-order.dto'
import { Order } from './orders.entity'
import { OrderToProduct } from 'src/order-to-product/order-to-product.entity'
import { Product } from 'src/products/products.entity'
import { getTodayDate } from 'src/utils/date-util'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,

    @InjectRepository(OrderToProduct)
    private orderToProductRepository: Repository<OrderToProduct>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findOne(id: number): Promise<Order> {
    return await this.ordersRepository.findOneBy({ id })
  }

  async create(order: CreateOrderRequestDto): Promise<CreateOrderResponseDto> {
    const { payment_method, paid_amount, total_amount, products } = order
    try {
      const newOrder = await this.ordersRepository.save({
        payment_method,
        paid_amount,
        total_amount,
      })

      const orderNumber = await this.ordersRepository
        .createQueryBuilder('order')
        .where('DATE(paid_date) = :today', { today: getTodayDate() })
        .getCount()

      const productCreateList = products.map(async (productInfo) => {
        const product = await this.productRepository.findOne({
          where: {
            id: productInfo.product_id,
          },
        })

        await this.orderToProductRepository.save({
          order: newOrder,
          product: product,
          count: productInfo.count,
        })
      })
      await Promise.all(productCreateList)

      return { ...newOrder, order_number: orderNumber }
    } catch (e) {
      console.log(e)
    }
  }
}
