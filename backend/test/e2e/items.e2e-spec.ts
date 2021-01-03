/* eslint-disable no-useless-escape */

import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { ItemsModule } from '../../src/items/items.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { Item } from '../../src/items/interfaces/item.interface';
import { ItemInput } from '../../src/items/input-items.input';
import { getToken } from '../auth.helpers';

describe('ItemsController (e2e)', () => {
  beforeAll(async () => {
    console.log('starting items tests');
  });

  afterAll(async () => {
    console.log('finished items tests');
  });

  const item: ItemInput = {
    title: 'Great item',
    estimate: 10,
    description: 'Description of this great item',
    personas: [],
    group: '54759eb3c090d83494e2d804',
  };

  let id = '';

  const updatedItem: ItemInput = {
    title: 'Great updated item',
    estimate: 20,
    description: 'Updated description of this great item',
    personas: [],
    group: '54759eb3c090d83494e2d804',
  };

  const CREATE_ITEM_GQL = `
  mutation createItem($createItem: ItemInput!) {
      createItem(input: $createItem) {
      title
      estimate
      description
      id
      personas
      group
    }
  }`;

  it('Throws an error when API is called with no token', async () => {
    const res = await request(global.app.getHttpServer())
      .post('/graphql')
      .send({
        query: CREATE_ITEM_GQL,
        variables: {
          createItem: item,
        },
      });

    expect(res.body.errors).toBeTruthy;
    expect(res.body.errors[0].extensions.exception.status).toBe(401);
  });

  it('Creates an item when user is logged in and has write access to the group', async () => {
    const res = await request(global.app.getHttpServer())
      .post('/graphql')
      .set('Authorization', 'Bearer ' + global.validAuthToken)
      .send({
        query: CREATE_ITEM_GQL,
        variables: {
          createItem: item,
        },
      });
    checkNoResponseErrors(res);
    const data = res.body.data.createItem;
    id = data.id;
    expect(data.title).toBe(item.title);
    expect(data.description).toBe(item.description);
    expect(data.estimate).toBe(item.estimate);
  });

  it('Gets items when user is logged in and has access to the group', async () => {
    const res = await request(global.app.getHttpServer())
      .post('/graphql')
      .set('Authorization', 'Bearer ' + global.validAuthToken)
      .send({
        query:
          '{items(group: "54759eb3c090d83494e2d804") {title, estimate, description, id}}',
      });
    checkNoResponseErrors(res);
    const data = res.body.data.items;
    const itemResult = data[0];
    expect(data.length).toBeGreaterThan(0);
    expect(itemResult.title).toBe(item.title);
    expect(itemResult.description).toBe(item.description);
    expect(itemResult.estimate).toBe(item.estimate);
  });

  const updateItemObject = JSON.stringify(updatedItem).replace(
    /\"([^(\")"]+)\":/g,
    '$1:',
  );

  it('Updates an item when user is logged in and has write access to the group', async () => {
    const updateItemQuery = `
    mutation {
      updateItem(id: "${id}", input: ${updateItemObject}) {
        title
        estimate
        description
        id
      }
    }`;

    const res = await request(global.app.getHttpServer())
      .post('/graphql')
      .set('Authorization', 'Bearer ' + global.validAuthToken)
      .send({
        query: updateItemQuery,
      });

    checkNoResponseErrors(res);
    const data = res.body.data.updateItem;
    expect(data.title).toBe(updatedItem.title);
    expect(data.description).toBe(updatedItem.description);
    expect(data.estimate).toBe(updatedItem.estimate);
  });

  it('Deletes an item when user is logged in and has write access to the group', async () => {
    const deleteItemQuery = `
      mutation {
        deleteItem(id: "${id}") {
          title
          estimate
          description
          id
        }
      }`;

    const res = await request(global.app.getHttpServer())
      .post('/graphql')
      .set('Authorization', 'Bearer ' + global.validAuthToken)
      .send({
        operationName: null,
        query: deleteItemQuery,
      });

    checkNoResponseErrors(res);
    const data = res.body.data.deleteItem;
    expect(data.title).toBe(updatedItem.title);
    expect(data.description).toBe(updatedItem.description);
    expect(data.estimate).toBe(updatedItem.estimate);
  });
});

function checkNoResponseErrors(res: request.Response) {
  expect(res.body.errors).toBeFalsy;
  expect(res.status).toBe(200);
}
