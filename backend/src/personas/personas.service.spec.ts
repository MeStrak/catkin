import { Test, TestingModule } from '@nestjs/testing';
import { PersonasService } from './personas.service';
import { getModelToken } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { PersonaSchema } from './persona.schema';

describe('PersonasService', () => {
  let service: PersonasService;

  const personaModel = mongoose.model('PersonaSchema', PersonaSchema);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonasService,
        {
          provide: getModelToken('Persona'),
          useValue: personaModel,
        },
      ],
    }).compile();

    service = module.get<PersonasService>(PersonasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
