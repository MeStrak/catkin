import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ItemsModule } from '../src/items/items.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { Item } from '../src/items/interfaces/item.interface';

describe('ItemsController (e2e)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ItemsModule,
        MongooseModule.forRoot('mongodb://localhost/catkintesting'),
        GraphQLModule.forRoot({
          autoSchemaFile: 'schema.gql',
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const item: Item = {
    title: 'Great item',
    estimate: 10,
    description: 'Description of this great item',
  };

  let id: string = '';

  const updatedItem: Item = {
    title: 'Great updated item',
    estimate: 20,
    description: 'Updated description of this great item',
  };

  const createitemObject = JSON.stringify(item).replace(
    /\"([^(\")"]+)\":/g,
    '$1:',
  );

  const createItemQuery = `
  mutation {
    createItem(input: ${createitemObject}) {
      title
      estimate
      description
      id
    }
  }`;

  it('createItem', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: createItemQuery,
      })
      .expect(({ body }) => {
        const data = body.data.createItem;
        id = data.id;
        expect(data.title).toBe(item.title);
        expect(data.description).toBe(item.description);
        expect(data.estimate).toBe(item.estimate);
      })
      .expect(200);
  });

  it('getItems', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: '{items{title, estimate, description, id}}',
      })
      .expect(({ body }) => {
        const data = body.data.items;
        const itemResult = data[0];
        expect(data.length).toBeGreaterThan(0);
        expect(itemResult.title).toBe(item.title);
        expect(itemResult.description).toBe(item.description);
        expect(itemResult.estimate).toBe(item.estimate);
      })
      .expect(200);
  });

  const updateItemObject = JSON.stringify(updatedItem).replace(
    /\"([^(\")"]+)\":/g,
    '$1:',
  );

  it('updateItem', () => {
    const updateItemQuery = `
    mutation {
      updateItem(id: "${id}", input: ${updateItemObject}) {
        title
        estimate
        description
        id
      }
    }`;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: updateItemQuery,
      })
      .expect(({ body }) => {
        const data = body.data.updateItem;
        expect(data.title).toBe(updatedItem.title);
        expect(data.description).toBe(updatedItem.description);
        expect(data.estimate).toBe(updatedItem.estimate);
      })
      .expect(200);
  });

  it('deleteItem', () => {
    const deleteItemQuery = `
      mutation {
        deleteItem(id: "${id}") {
          title
          estimate
          description
          id
        }
      }`;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: deleteItemQuery,
      })
      .expect(({ body }) => {
        const data = body.data.deleteItem;
        expect(data.title).toBe(updatedItem.title);
        expect(data.description).toBe(updatedItem.description);
        expect(data.estimate).toBe(updatedItem.estimate);
      })
      .expect(200);
  });
});
