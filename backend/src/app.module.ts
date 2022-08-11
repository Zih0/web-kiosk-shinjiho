import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoriesModule } from './categories/categories.module'
import { ProductsModule } from './products/products.module'
import { OrdersModule } from './orders/orders.module'
import { OrderToProductModule } from './order-to-product/order-to-product.module'
import { join } from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), '..', 'frontend', 'build'),
      exclude: ['/api*'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      timezone: 'Asia/Seoul',
    }),
    CategoriesModule,
    ProductsModule,
    OrdersModule,
    OrderToProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
