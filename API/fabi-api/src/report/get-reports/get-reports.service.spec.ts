import { Test, TestingModule } from '@nestjs/testing';
import { GetReportsService } from './get-reports.service';

describe('GetReportsService', () => {
  let service: GetReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetReportsService],
    }).compile();

    service = module.get<GetReportsService>(GetReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
