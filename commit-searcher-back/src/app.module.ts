import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CommitsModule } from './modules/commits/commits.module';

@Module({
  imports: [CommitsModule],
  controllers: [AppController],
})
export class AppModule {}
