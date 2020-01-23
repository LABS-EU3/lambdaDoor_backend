/* eslint-disable node/no-unsupported-features/es-syntax */
const request = require('supertest');
const db = require('../../../database/db-config');
const server = require('../../../api/server');

const testUser3 = {
  full_name: 'Test 2',
  slack_id: 'slack_id_two',
  username: 'second_name',
  email_address: 'email_address_two',
  profile_picture: 'testurltwo',
};

const testCompany3 = {
  id: 1,
  name: 'Accenture',
  website: 'www.accenture.com.',
  location: 'Atlanta, GA',
  longitude: -85.0,
  latitude: 33.7537,
  type: 'Business',
  logo: '',
  description: '',
};

const testReview3 = {
  user_id: 1,
  company_id: 1,
  text: 'Good Review',
};

beforeAll(async () => {
  await db.raw('TRUNCATE users RESTART IDENTITY CASCADE');
  await db.raw('TRUNCATE companies RESTART IDENTITY CASCADE');
  await db.raw('TRUNCATE interview_process_reviews RESTART IDENTITY CASCADE');

  await db('users').insert(testUser3);
  await db('companies').insert(testCompany3);
  await db('interview_process_reviews').insert(testReview3);
});

describe('interviewReview router', () => {
  describe('GET /user/:id', () => {
    test('returns a 200 response if user exists', async () => {
      await request(server)
        .get('/interviewreviews/user/1')
        .expect(200);
    });

    test("returns a 400 if user doesn't exist", async () => {
      await request(server)
        .get('/interviewreviews/user/2')
        .expect(400);
    });
  });

  describe('PATCH /:id', () => {
    test('returns a 200 response if interview review exists', async () => {
      const response = await request(server)
        .patch('/interviewreviews/1')
        .send({ text: 'Updated Review' })
        .expect(200);

      expect(response.body.text).toEqual('Updated Review');
    });

    test("returns a 400 if interview review doesn't exist", async () => {
      await request(server)
        .patch('/interviewreviews/2')
        .expect(400);
    });
  });

  describe('DELETE /:id', () => {
    test('returns a 204 response if interview review exists', async () => {
      await request(server)
        .delete('/interviewreviews/1')
        .expect(204);
    });

    test("returns a 400 if interview review doesn't exist", async () => {
      await request(server)
        .delete('/interviewreviews/2')
        .expect(400);
    });
  });

  describe('POST /', () => {
    test('returns a 201 response if user created interview review succesfully', async () => {
      const response = await request(server)
        .post('/interviewreviews/')
        .send(testReview3)
        .expect(201);

      expect(response.body.text).toBe('Good Review');
    });
  });

  describe('GET /interviewreviews/reviews/:id', () => {
    test('returns a 200 response if interview review was fetched succesfully', async () => {
      await request(server)
        .get('/interviewreviews/reviews/1')
        .expect(200);
    });
  });
});

afterAll(async () => {
  await db.raw('TRUNCATE users RESTART IDENTITY CASCADE');
  await db.raw('TRUNCATE companies RESTART IDENTITY CASCADE');
  await db.raw('TRUNCATE company_reviews RESTART IDENTITY CASCADE');
});