import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adopter } from './module/adopter/entities/adopter.entity';
import { AdopterModule } from './module/adopter/adopter.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogModule } from './module/dog/dog.module';
import { CatModule } from './module/cat/cat.module';
import { Cat } from './module/cat/entities/cat.entity';
import { Dog } from './module/dog/entities/dog.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'gestione-adozioni-animali',
      entities: [Adopter, Cat, Dog],
      synchronize: true,
    }),
    AdopterModule,
    DogModule,
    CatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
