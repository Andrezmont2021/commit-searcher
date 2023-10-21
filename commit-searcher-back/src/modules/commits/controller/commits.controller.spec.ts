import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CommitsController } from './commits.controller';
import { CommitsService } from '../service/commits.service';

describe('CommitsController', () => {
  let controller: CommitsController;
  let service: CommitsService;

  const commitsServiceMock = {
    findAllByOwnerAndRepositoryName: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommitsController],
      providers: [
        {
          provide: CommitsService,
          useValue: commitsServiceMock,
        },
      ],
    }).compile();

    controller = module.get<CommitsController>(CommitsController);
    service = module.get<CommitsService>(CommitsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllByOwnerAndRepositoryName method', () => {
    it('should return commits from the service', async () => {
      const owner = 'exampleOwner';
      const repositoryName = 'exampleRepo';

      const commits = [
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

      // Mock the service method to return the commits
      commitsServiceMock.findAllByOwnerAndRepositoryName.mockResolvedValue(
        commits,
      );

      const result = await controller.findAllByOwnerAndRepositoryName({
        owner,
        repositoryName,
      });

      // Verify that the controller calls the service method and returns the result
      expect(service.findAllByOwnerAndRepositoryName).toHaveBeenCalledWith(
        owner,
        repositoryName,
      );
      expect(result).toEqual(commits);
    });

    it('should handle errors by throwing an HttpException', async () => {
      const owner = 'exampleOwner';
      const repositoryName = 'exampleRepo';
      const errorMessage = 'Service error message';
      const errorStatus = HttpStatus.INTERNAL_SERVER_ERROR;

      // Mock the service method to throw an error
      commitsServiceMock.findAllByOwnerAndRepositoryName.mockRejectedValue({
        message: errorMessage,
        status: errorStatus,
      });

      // Verify that the controller throws an HttpException with the correct message and status
      await expect(
        controller.findAllByOwnerAndRepositoryName({ owner, repositoryName }),
      ).rejects.toThrowError(new HttpException(errorMessage, errorStatus));
      // Verify that the controller calls the service method
      expect(service.findAllByOwnerAndRepositoryName).toHaveBeenCalledWith(
        owner,
        repositoryName,
      );
    });
  });
});
