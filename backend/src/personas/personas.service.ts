import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PersonaType } from './dto/create-persona.dto';
import { Persona } from './interfaces/persona.interface';
import { PersonaInput } from './input-personas.input';

@Injectable()
export class PersonasService {
  constructor(@InjectModel('Persona') private personaModel: Model<Persona>) {}

  async create(createPersonaDto: PersonaInput): Promise<Persona> {
    const createdPersona = new this.personaModel(createPersonaDto);
    return await createdPersona.save();
  }

  async findAll(): Promise<Persona[]> {
    return await this.personaModel.find().exec();
  }

  async findOne(id: string): Promise<Persona> {
    return await this.personaModel.findOne({ _id: id });
  }

  async delete(id: string): Promise<Persona> {
    return await this.personaModel.findByIdAndRemove(id);
  }

  async update(id: string, persona: Persona): Promise<Persona> {
    return await this.personaModel.findByIdAndUpdate(id, persona, {
      new: true,
    });
  }
}
