// user.test.ts
import request from 'supertest';
import { createUser, getUser } from '../controllers/user.controller';
import { describe, it } from 'node:test';

describe('User API Endpoints', () => {
    it('should get all users', async () => {
        const response = await request(getUser).get('/api/users');
        expect(response.status);
        // Add more assertions based on your expected response
    });

    it('should add a new user', async () => {
        const newUser = { username: 'JohnDoe', email: 'john@example.com' };
        const response = await request(createUser)
            .post('/api/users')
            .send(newUser);
        expect(response.status);
    });
});
function expect(status: unknown) {
    console.log(status);
    throw new Error('Function not implemented.');
}
