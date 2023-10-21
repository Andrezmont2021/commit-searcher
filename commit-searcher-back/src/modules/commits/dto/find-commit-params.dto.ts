import { IsNotEmpty, IsString } from 'class-validator';

export class FindCommitParams {
  @IsNotEmpty()
  @IsString()
  owner: string;

  @IsNotEmpty()
  @IsString()
  repositoryName: string;
}
