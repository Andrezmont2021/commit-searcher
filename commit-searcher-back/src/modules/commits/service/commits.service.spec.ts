import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { CommitsService } from './commits.service';

describe('CommitsService', () => {
  let service: CommitsService;
  let httpService: HttpService;

  const mockHTTPService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommitsService,
        {
          provide: HttpService,
          useValue: mockHTTPService,
        },
      ],
    }).compile();

    service = module.get<CommitsService>(CommitsService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllByOwnerAndRepositoryName method', () => {
    it('Should retrieve and map commits', async () => {
      const owner = 'githubUser';
      const repositoryName = 'myRepo';
      const url = 'https://api.github.com/repos/githubUser/myRepo/commits';
      const dataFromApi = [
        {
          commit: {
            author: {
              name: 'Test User 1',
              email: 'testUser1@mail.com',
              date: '2022-10-15T22:37:24Z',
            },
            message: 'Test commit message 1',
            url: 'https://api.github.com/repos/TestOwner/TestRepository/git/commits/715b0ced70ff614666fbeeead93daf6a557faf41',
            verification: {
              verified: false,
            },
          },
        },
        {
          commit: {
            author: {
              name: 'Test User 2',
              email: 'testUser2@mail.com',
              date: '2022-10-15T22:37:24Z',
            },
            message: 'Test commit message 2',
            url: 'https://api.github.com/repos/TestOwner2/TestRepository2/git/commits/715b0ced70ff614666fbeeead93daf6a557faf41',
            verification: {
              verified: false,
            },
          },
        },
      ];
      const resultData = [
        {
          message: 'Test commit message 1',
          url: 'https://api.github.com/repos/TestOwner/TestRepository/git/commits/715b0ced70ff614666fbeeead93daf6a557faf41',
          date: '2022-10-15T22:37:24Z',
          isVerified: false,
          authorName: 'Test User 1',
          authorEmail: 'testUser1@mail.com',
        },
        {
          message: 'Test commit message 2',
          url: 'https://api.github.com/repos/TestOwner2/TestRepository2/git/commits/715b0ced70ff614666fbeeead93daf6a557faf41',
          date: '2022-10-15T22:37:24Z',
          isVerified: false,
          authorName: 'Test User 2',
          authorEmail: 'testUser2@mail.com',
        },
      ];

      const response = {
        data: dataFromApi,
      };
      //Mocking the response from github api
      mockHTTPService.get.mockReturnValue(of(response));

      const result = await service.findAllByOwnerAndRepositoryName(
        owner,
        repositoryName,
      );

      // Verify the result
      expect(result).toEqual(resultData);
      // Verify that api is called
      expect(httpService.get).toHaveBeenCalledWith(url);
    });

    it('should handle errors', async () => {
      const owner = 'githubUser';
      const repositoryName = 'myRepo';
      const url = 'https://api.github.com/repos/githubUser/myRepo/commits';

      mockHTTPService.get.mockReturnValue(
        of({
          message: 'Test Error',
          response: { status: 404 },
        }),
      );
      try {
        await service.findAllByOwnerAndRepositoryName(owner, repositoryName);
      } catch (error) {
        // Verify the result
        expect(error.message).toContain('Error trying to retrieve the commits');
        // Verify that api is called
        expect(httpService.get).toHaveBeenCalledWith(url);
      }
    });
  });
});
