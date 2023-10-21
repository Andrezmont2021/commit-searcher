import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CommitsService } from './service/commits.service';
import { CommitsController } from './controller/commits.controller';

@Module({
  imports: [HttpModule],
  controllers: [CommitsController],
  providers: [CommitsService],
})
export class CommitsModule {}
