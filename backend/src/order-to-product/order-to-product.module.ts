import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderToProductController } from './order-to-product.controller'
import { OrderToProduct } from './order-to-product.entity'
import { OrderToProductService } from './order-to-product.service'

@Module({
  imports: [TypeOrmModule.forFeature([OrderToProduct])],
  exports: [TypeOrmModule],
  controllers: [OrderToProductController],
  providers: [OrderToProductService],
})
export class OrderToProductModule {}
