import { Module, HttpModule } from '@nestjs/common';
import Reports from './report.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ReportService} from './report.service'
import { UsersService } from '../Users/users.service';
import Users from '../Users/Users.entity';
@Module({
    imports: [TypeOrmModule.forFeature([Reports,Users]),HttpModule],
    providers: [ReportService,UsersService],
    exports: [TypeOrmModule]
})
export class ReportModule {}
