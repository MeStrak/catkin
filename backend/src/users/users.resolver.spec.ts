import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { UserSchema } from './user.schema';

describe('UsersResolver', () => {
    let resolver: UsersResolver;
    const userModel = mongoose.model('UserSchema', UserSchema);

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersResolver,
                UsersService,
                {
                    provide: getModelToken('User'),
                    useValue: userModel,
                },
            ],
        }).compile();

        resolver = module.get<UsersResolver>(UsersResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
