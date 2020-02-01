import { Test, TestingModule } from '@nestjs/testing';
import { PersonasResolver } from './personas.resolver';
import { PersonasService } from './personas.service';
import { getModelToken } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { PersonaSchema } from './persona.schema';

describe('PersonasResolver', () => {
  let resolver: PersonasResolver;
  const personaModel = mongoose.model('PersonaSchema', PersonaSchema);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonasResolver,
        PersonasService,
        {
          provide: getModelToken('Persona'),
          useValue: personaModel,
        },
      ],
    }).compile();

    resolver = module.get<PersonasResolver>(PersonasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
