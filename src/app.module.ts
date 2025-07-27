import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as fs from 'fs'; // 임포트 추가
import * as path from 'path'; // 임포트 추가
import { Ang } from 'ang.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Ang],
      synchronize: true,
      ssl:
        process.env.STAGE === 'local'
          ? false
          : {
              ca: fs.readFileSync(
                path.join(process.cwd(), 'rds-ca-bundle.pem'),
              ),
              rejectUnauthorized: true,
            },
      extra: {
        max: process.env.STAGE === 'prod' ? 5 : 1,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    }),
    TypeOrmModule.forFeature([Ang]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
