import { Test, TestingModule } from '@nestjs/testing';
import { PersonasResolver } from './personas.resolver';

describe('PersonasResolver', () => {
  let resolver: PersonasResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonasResolver],
    }).compile();

    resolver = module.get<PersonasResolver>(PersonasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
