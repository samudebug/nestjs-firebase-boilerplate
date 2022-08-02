const fireorm = jest.createMockFromModule('fireorm') as any;

const getRepository = (type) => ({
  create: jest
    .fn()
    .mockImplementation(async (data) => ({ ...data, id: 'mockId' })),
});

fireorm.getRepository = getRepository;
module.exports = fireorm;
