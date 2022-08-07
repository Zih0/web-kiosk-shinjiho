import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateOrderRequestDto, CreateOrderResponseDto, OrdersProduct } from './dto/create-order.dto'
import { Order } from './orders.entity'
import { OrderToProduct } from 'src/order-to-product/order-to-product.entity'
import { Product } from 'src/products/entities/products.entity'
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

  async createOrder(order: CreateOrderRequestDto): Promise<Order> {
    const { payment_method, paid_amount, total_amount } = order
    const newOrder = await this.ordersRepository.save({
      payment_method,
      paid_amount,
      total_amount,
    })
    return newOrder
  }

  async createOrderToProduct(products: OrdersProduct[], orderId: number): Promise<void> {
    const productCreateList = products.map(async (productInfo) => {
      const product = await this.productRepository.findOne({
        where: {
          id: productInfo.product_id,
        },
      })

      await this.orderToProductRepository.save({
        order_id: orderId,
        product: product,
        count: productInfo.count,
      })
    })
    await Promise.all(productCreateList)
  }

  async findOrderNumber(): Promise<number> {
    const orderNumber = await this.ordersRepository
      .createQueryBuilder('order')
      .where('DATE(paid_date) = :today', { today: getTodayDate() })
      .getCount()

    return orderNumber
  }

  async create(order: CreateOrderRequestDto): Promise<CreateOrderResponseDto> {
    const { products } = order
    const newOrder = await this.createOrder(order)
    const orderNumber = await this.findOrderNumber()
    this.createOrderToProduct(products, newOrder.id)

    return { ...newOrder, order_number: orderNumber }
  }
}
