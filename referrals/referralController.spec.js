const request = require('supertest');
const server = require('../api/server');
const transporter = require('../utils/nodemailer');

const testReferral = {
  name: 'Chioma Nkem-Eze',
  senderEmail: 'fegaeze@gmail.com',
  recipientEmail: 'fegaeze@gmail.com',
  description: 'Thanks for your review, please refer me!',
};

describe('referralRouter', () => {
  describe('POST /referral', () => {
    jest.spyOn(transporter, 'transporter').mockResolvedValue({ success: true });
    test('returns a 200 response if request sent succesfully', async () => {
      const response = await request(server)
        .post('/referral')
        .send(testReferral)
        .expect(200);

      expect(response.body.text).toBe('Referral sent successfully!');
    });

    test("returns a 500 if the request doesn't have a body", async () => {
      await request(server)
        .post('/referral')
        .expect(500);
    });
  });
});
