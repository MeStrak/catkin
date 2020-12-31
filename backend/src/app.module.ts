import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { TerminusModule } from '@nestjs/terminus';

import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './board/boards.module';
import { GroupsModule } from './group/groups.module';
import { ItemsModule } from './items/items.module';
import { PersonasModule } from './personas/personas.module';
import { HealthController } from './health/health.controller';
const newRelicPlugin = require('@newrelic/apollo-server-plugin')


@Module({
  imports: [
    TerminusModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      playground: true,
      introspection: true,
      context: ({ req }) => ({ req }),
      plugins: [newRelicPlugin],
    }),
    ItemsModule,
    PersonasModule,
    GroupsModule,
    BoardsModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_CONNECTION'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'test.env', 'local.dev.env', 'dev.env'],
    }),
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
