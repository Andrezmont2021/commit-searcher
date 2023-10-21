import { CommitDTO } from '../dto/find-commit.dto';

export const convertToDTO = (originalData: any): CommitDTO => {
  return {
    message: originalData.commit.message,
    url: originalData.commit.url,
    date: originalData.commit.author.date,
    isVerified: originalData.commit.verification.verified,
    authorName: originalData.commit.author.name,
    authorEmail: originalData.commit.author.email,
  };
};
