import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductsController } from './products.controller'
import { Product } from './entities/products.entity'
import { ProductOption } from './entities/product-option.entity'
import { ProductOptionDetail } from './entities/product-option-detail.entity'
import { ProductsService } from './products.service'

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductOption, ProductOptionDetail])],
  exports: [TypeOrmModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
