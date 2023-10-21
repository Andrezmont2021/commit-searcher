import {
  Controller,
  Get,
  Query,
  Version,
  HttpException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommitsService } from '../service/commits.service';

@Controller('commits')
@ApiTags('commits')
export class CommitsController {
  constructor(private readonly commitsService: CommitsService) {}

  @Get()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  async findAllByOwnerAndRepositoryName(
    @Query('owner') owner: string,
    @Query('repositoryName') repositoryName: string,
  ) {
    try {
      return await this.commitsService.findAllByOwnerAndRepositoryName(
        owner,
        repositoryName,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
