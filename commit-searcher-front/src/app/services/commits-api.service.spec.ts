import { TestBed } from '@angular/core/testing';
import { CommitsApiService } from './commits-api.service';

describe('CommitsApiService', () => {
  let service: CommitsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommitsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
