import { Test, TestingModule } from '@nestjs/testing';
import { UpdateAfflictionsResolver } from './update-afflictions.resolver';

describe('UpdateAfflictionsResolver', () => {
  let resolver: UpdateAfflictionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateAfflictionsResolver],
    }).compile();

    resolver = module.get<UpdateAfflictionsResolver>(UpdateAfflictionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
