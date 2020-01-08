import { Module } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { PersonasResolver } from './personas.resolver';
import { PersonaSchema } from './persona.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Persona', schema: PersonaSchema }]),
  ],
  providers: [PersonasService, PersonasResolver],
})
export class PersonasModule {}
