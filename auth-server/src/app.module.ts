import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { SharedModule } from './api/shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './api/shared/mongoose-config/mongoose-config.service';
import { ConfigModule } from './api/shared/config/config.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    SharedModule,
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
