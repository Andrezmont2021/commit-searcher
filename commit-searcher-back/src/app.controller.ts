import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('health-check')
export class AppController {
  @Get()
  @HttpCode(HttpStatus.OK)
  getHealthCheck(): string {
    return 'Commit-Searcher API is up!';
  }
}
