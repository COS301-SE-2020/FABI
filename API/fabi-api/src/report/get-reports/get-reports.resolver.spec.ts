import { Test, TestingModule } from '@nestjs/testing';
import { GetReportsResolver } from './get-reports.resolver';

describe('GetReportsResolver', () => {
  let resolver: GetReportsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetReportsResolver],
    }).compile();

    resolver = module.get<GetReportsResolver>(GetReportsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
