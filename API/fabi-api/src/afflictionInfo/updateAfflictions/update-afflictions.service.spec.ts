import { Test, TestingModule } from '@nestjs/testing';
import { UpdateAfflictionsService } from './update-afflictions.service';

describe('UpdateAfflictionsService', () => {
  let service: UpdateAfflictionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateAfflictionsService],
    }).compile();

    service = module.get<UpdateAfflictionsService>(UpdateAfflictionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
