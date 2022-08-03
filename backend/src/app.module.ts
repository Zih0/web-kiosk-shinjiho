import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoriesModule } from './categories/categories.module'
import { ProductsModule } from './products/products.module'
import { Category } from './categories/categories.entity'
import { Product } from './products/products.entity'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Category, Product],
      synchronize: true,
    }),
    CategoriesModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
