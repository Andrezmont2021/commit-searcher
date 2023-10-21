import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Constants } from '../utils/constants';
import { CustomException } from '../utils/custom-exception';
import { convertToDTO } from '../utils/converter';

@Injectable()
export class CommitsService {
  constructor(private readonly httpService: HttpService) {}

  async findAllByOwnerAndRepositoryName(owner: string, repositoryName: string) {
    try {
      // URL to get commits from a certain repository
      const url = `${Constants.API_GITHUB_URL}/${owner}/${repositoryName}/${Constants.COMMIT_TEXT}`;
      // Get the commits when the process is successful, otherwise, catch error.
      const response = await lastValueFrom(this.httpService.get(url));
      const commits = response?.data ?? [];
      // Convert to DTO (Design pattern)
      return commits.map((commit) => convertToDTO(commit));
    } catch (error) {
      console.error('Error details: ', error.message);
      throw new CustomException(
        `${Constants.ERROR_AXIOS_HTTP} ${owner} - ${repositoryName}`,
        error.response.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
