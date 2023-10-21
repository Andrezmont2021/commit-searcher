import { TestBed } from '@automock/jest';
import { CommitsService } from './commits.service';
import { HttpService } from '@nestjs/axios';

describe('service', () => {
  let service: CommitsService;
  let httpService: jest.Mocked<HttpService>;

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(CommitsService)
      .mock(HttpService)
      .using({ get: jest.fn() })
      .compile();

    service = unit;

    httpService = unitRef.get(HttpService);
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('Should retrieve and map commits', async () => {
    const owner = 'githubUser';
    const repositoryName = 'myRepo';

    const response = {
      data: [{ commitData: 'commit1' }, { commitData: 'commit2' }],
    };
    //Mocking the response from github api
    httpService.get.mockResolvedValueOnce(response);

    const result = await service.findAllByOwnerAndRepositoryName(
      owner,
      repositoryName,
    );

    // Verify the result
    expect(result).toEqual([{ dtoData: 'commit1' }, { dtoData: 'commit2' }]);
  });

  // it('should handle errors', async () => {
  //   const owner = 'githubUser';
  //   const repositoryName = 'myRepo';

  //   const error = new Error('Test Error');
  //   mockHTTPService.get.mockRejectedValue(error);

  //   try {
  //     await service.findAllByOwnerAndRepositoryName(owner, repositoryName);
  //   } catch (error) {
  //     // Verify the error handling logic here
  //     expect(error.message).toBe('Your expected error message');
  //   }
  // });
});
