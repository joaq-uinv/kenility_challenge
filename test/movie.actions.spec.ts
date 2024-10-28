import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';

import * as request from 'supertest';

import { faker } from '@faker-js/faker';

import { AppModule } from '../src/app.module';

describe('Movie Actions', () => {
  let app: INestApplication;
  let jwtService: JwtService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: process.env.JWT_SECRET || 'testSecret',
          signOptions: { expiresIn: '60s' },
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const createToken = (role: string) => {
    const jwtService = app.get<JwtService>(JwtService);
    return jwtService.sign({ role }, { secret: process.env.JWT_SECRET });
  };
  describe('GET /movies', () => {
    it('should allow admin to access /movies', () => {
      const token = createToken('admin');
      return request(app.getHttpServer())
        .get('/movies')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });

    it('should allow user to access /movies', () => {
      const token = createToken('user');
      return request(app.getHttpServer())
        .get('/movies')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });
  });

  describe('GET /movies/:id', () => {
    it('should allow user to access /movies/:id', () => {
      const token = createToken('user');
      return request(app.getHttpServer())
        .get('/movies/671ea9711483d14ac3c934da')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });

    it('should deny admin access to /movies/:id', () => {
      const token = createToken('admin');
      return request(app.getHttpServer())
        .get('/movies/671ea9711483d14ac3c934da')
        .set('Authorization', `Bearer ${token}`)
        .expect(403);
    });
  });

  describe('POST /movies', () => {
    it('should allow admin to create a movie', () => {
      const body = {
        director: faker.person.fullName(),
        episodeId: 1,
        openingCrawl: faker.lorem.paragraph(),
        releaseDate: '1999-05-19',
        title: faker.lorem.lines(),
      };
      const token = createToken('admin');
      return request(app.getHttpServer())
        .post('/movies')
        .set('Authorization', `Bearer ${token}`)
        .send(body)
        .expect(201);
    });

    it('should deny user access to create a movie', () => {
      const token = createToken('user');
      return request(app.getHttpServer())
        .post('/movies')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'New Movie' })
        .expect(403);
    });
  });

  describe('PUT /movies/:id', () => {
    it('should allow admin to update a movie', () => {
      const token = createToken('admin');
      return request(app.getHttpServer())
        .put('/movies/671ea9711483d14ac3c934da')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Updated Movie' })
        .expect(200);
    });

    it('should deny user access to update a movie', () => {
      const token = createToken('user');
      return request(app.getHttpServer())
        .put('/movies/671ea9711483d14ac3c934da')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Updated Movie' })
        .expect(403);
    });
  });

  describe('DELETE /movies/:id', () => {
    it('should allow admin to delete a movie', () => {
      const token = createToken('admin');
      return request(app.getHttpServer())
        .delete('/movies/671ea9711483d14ac3c934da')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });

    it('should deny user access to delete a movie', () => {
      const token = createToken('user');
      return request(app.getHttpServer())
        .delete('/movies/671ea9711483d14ac3c934da')
        .set('Authorization', `Bearer ${token}`)
        .expect(403);
    });
  });

  describe('POST /movies/sync', () => {
    it('should allow admin to sync movies', () => {
      const token = createToken('admin');
      return request(app.getHttpServer())
        .post('/movies/sync')
        .set('Authorization', `Bearer ${token}`)
        .expect(201);
    }, 999999);

    it('should deny user access to sync movies', () => {
      const token = createToken('user');
      return request(app.getHttpServer())
        .post('/movies/sync')
        .set('Authorization', `Bearer ${token}`)
        .expect(403);
    }, 999999);
  });
});
