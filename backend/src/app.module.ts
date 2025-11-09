import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CouplesModule } from './modules/couples/couples.module';
import { QuestsModule } from './modules/quests/quests.module';
import { CardsModule } from './modules/cards/cards.module';
import { RatingsModule } from './modules/ratings/ratings.module';

@Module({
  imports: [AuthModule, UsersModule, CouplesModule, QuestsModule, CardsModule, RatingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
