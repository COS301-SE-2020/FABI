import { Test, TestingModule } from '@nestjs/testing';
import { GetAfflictionsService } from './get-afflictions.service';

describe('GetAfflictionsService', () => {
  let service: GetAfflictionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAfflictionsService],
    }).compile();

    service = module.get<GetAfflictionsService>(GetAfflictionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
