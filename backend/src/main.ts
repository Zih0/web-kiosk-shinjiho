import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const port = configService.get('PORT')

  app.setGlobalPrefix('api')
  app.enableCors()

  await app.listen(port)
  Logger.log(`Application running on port ${port}`)
}
bootstrap()
