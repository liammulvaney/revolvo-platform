import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { AuthPublic } from '@revolvo-backend/authentication';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @AuthPublic()
  getData() {
    return this.appService.getData();
  }

  @Get('protected')
  getProtectedData() {
    return { message: 'This is protected data' };
  }
}
