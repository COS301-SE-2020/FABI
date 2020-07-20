import { Test, TestingModule } from '@nestjs/testing';
import { AfflictionService } from './affliction.service';

describe('AfflictionService', () => {
  let service: AfflictionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AfflictionService],
    }).compile();

    service = module.get<AfflictionService>(AfflictionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
