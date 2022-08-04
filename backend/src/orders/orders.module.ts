import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderToProduct } from 'src/order-to-product/order-to-product.entity'
import { Product } from 'src/products/products.entity'
import { OrdersController } from './orders.controller'
import { Order } from './orders.entity'
import { OrdersService } from './orders.service'

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderToProduct, Product])],
  exports: [TypeOrmModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
