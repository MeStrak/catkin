import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { ItemsModule } from './items/items.module';
import { GroupsModule } from './group/groups.module';
import { PersonasModule } from './personas/personas.module';
@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      playground: true,
      introspection: true,
      context: ({ req }) => ({ req }),
    }),
    ItemsModule,
    PersonasModule,
    GroupsModule,
    // MongooseModule.forRoot('mongodb://localhost/catkin'),
    // MongooseModule.forRoot(process.env.MONGO_CONNECTION),
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
    }),
  ],
  controllers: [],
  providers: [GroupService],
})
export class AppModule {}
