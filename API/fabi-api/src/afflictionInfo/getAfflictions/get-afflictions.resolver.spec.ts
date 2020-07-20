import { Test, TestingModule } from '@nestjs/testing';
import { GetAfflictionsResolver } from './get-afflictions.resolver';

describe('GetAfflictionsResolver', () => {
  let resolver: GetAfflictionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAfflictionsResolver],
    }).compile();

    resolver = module.get<GetAfflictionsResolver>(GetAfflictionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
