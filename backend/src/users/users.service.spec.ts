import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    service = new UsersService();
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
