import { Test, TestingModule } from '@nestjs/testing';
import { AdminDashboardResolver } from './admin-dashboard.resolver';

describe('AdminDashboardResolver', () => {
  let resolver: AdminDashboardResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminDashboardResolver],
    }).compile();

    resolver = module.get<AdminDashboardResolver>(AdminDashboardResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
