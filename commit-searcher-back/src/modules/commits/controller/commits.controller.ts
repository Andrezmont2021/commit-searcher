import {
  Controller,
  Get,
  Query,
  Version,
  HttpException,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommitsService } from '../service/commits.service';
import { FindCommitParams } from '../dto/find-commit-params.dto';

@Controller('commits')
@ApiTags('commits')
export class CommitsController {
  constructor(private readonly commitsService: CommitsService) {}

  @Get()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  async findAllByOwnerAndRepositoryName(
    @Query(ValidationPipe) params: FindCommitParams,
  ) {
    try {
      return await this.commitsService.findAllByOwnerAndRepositoryName(
        params.owner,
        params.repositoryName,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
