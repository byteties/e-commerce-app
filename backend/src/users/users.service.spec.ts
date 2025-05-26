import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  const mockUser = {
    username: 'admin',
    password: '123456'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn().mockImplementation((query) => {
              if (query.username === 'admin') {
                return Promise.resolve(mockUser);
              }
              if (query.username === 'user') {
                return Promise.resolve({ username: 'user', password: 'qwerty' });
              }
              return Promise.resolve(null);
            }),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find an existing user by username', async () => {
    const user = await service.findOne('admin');
    expect(user).toBeDefined();
    expect(user?.username).toBe('admin');
    expect(user?.password).toBe('123456');
  });

  it('should return undefined if user does not exist', async () => {
    const user = await service.findOne('notfound');
    expect(user).toBeUndefined();
  });

  it('should find another user by username', async () => {
    const user = await service.findOne('user');
    expect(user).toBeDefined();
    expect(user?.username).toBe('user');
    expect(user?.password).toBe('qwerty');
  });
});
