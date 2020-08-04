import { Module } from '@nestjs/common';
import { PopulateTableResolver } from '../populate-table/populate-table.resolver';
import { PopulateTableService } from '../populate-table/populate-table.service';
import { UsersService } from '../../database/Users/users.service';
import { ReportService } from '../../database/Report/report.service';
import { UsersModule } from '../../database/Users/Users.module';
import { ReportModule } from '../../database/Report/report.module';

@Module({
  providers: [PopulateTableResolver, PopulateTableService, UsersService , ReportService],
  imports: [UsersModule,ReportModule]
})
export class PopulateTableModule {}
