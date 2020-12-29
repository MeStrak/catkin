import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { PersonasModule } from '../../src/personas/personas.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { Persona } from '../../src/personas/interfaces/persona.interface';
import { PersonaInput } from 'dist/personas/input-personas.input';

describe('PersonasController (e2e)', () => {
  let app;

  beforeAll(async () => {});

  afterAll(async () => {
  });

  const persona: PersonaInput = {
    name: 'Brian',
    role: 'Test coordinator',
    likes: 'Farting in the bath',
    pains: 'Smelly poos',
    goal: 'Fly to the moon',
    group: ''
  };

  let id: string = '';

  const updatedPersona: PersonaInput = {
    name: 'Brian McTwosey',
    role: 'Test manager',
    likes: 'Space',
    pains: 'Cannot afford a rocket',
    goal: 'Fly to mars',
    group: ''
  };

  const createpersonaObject = JSON.stringify(persona).replace(
    /\"([^(\")"]+)\":/g,
    '$1:',
  );

  const createPersonaQuery = `
  mutation {
    createPersona(input: ${createpersonaObject}) {
      name
      role
      likes
      pains
      goal
      id
    }
  }`;

  it('createPersona', async () => {
    const res = await request(global.app.getHttpServer())
      .post('/graphql')
      .set('Authorization', 'Bearer ' + global.validAuthToken)
      .send({
        operationName: null,
        query: createPersonaQuery,
      })
        const data = res.body.data.createPersona;
        id = data.id;
        expect(data.name).toBe(persona.name);
        expect(data.role).toBe(persona.role);
  });

  it('getPersonas', async () => {
    const res = await request(global.app.getHttpServer())
      .post('/graphql')
      .set('Authorization', 'Bearer ' + global.validAuthToken)
      .send({
        operationName: null,
        query: '{personas{name, role, id}}',
      })
        const data = res.body.data.personas;
        const personaResult = data[0];
        expect(data.length).toBeGreaterThan(0);
        expect(personaResult.name).toBe(persona.name);
        expect(personaResult.role).toBe(persona.role);
  });

  const updatePersonaObject = JSON.stringify(updatedPersona).replace(
    /\"([^(\")"]+)\":/g,
    '$1:',
  );

  it('updatePersona', async () => {
    const updatePersonaQuery = `
    mutation {
      updatePersona(id: "${id}", input: ${updatePersonaObject}) {
        name
        role
        id
      }
    }`;

    const res = await request(global.app.getHttpServer())
      .post('/graphql')
      .set('Authorization', 'Bearer ' + global.validAuthToken)
      .send({
        operationName: null,
        query: updatePersonaQuery,
      })
        const data = res.body.data.updatePersona;
        expect(data.name).toBe(updatedPersona.name);
        expect(data.role).toBe(updatedPersona.role);
  });

  it('deletePersona', async () => {
    const deletePersonaQuery = `
      mutation {
        deletePersona(id: "${id}") {
          name
          role
          id
        }
      }`;

      const res = await request(global.app.getHttpServer())
      .post('/graphql')
      .set('Authorization', 'Bearer ' + global.validAuthToken)
      .send({
        operationName: null,
        query: deletePersonaQuery,
      })
        const data = res.body.data.deletePersona;
        expect(data.name).toBe(updatedPersona.name);
        expect(data.role).toBe(updatedPersona.role);
  });
});
