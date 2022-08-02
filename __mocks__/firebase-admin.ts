const firebaseAdmin = jest.createMockFromModule('firebase-admin') as any;

console.log('Being mocked');
function auth() {
  return {
    createUser: jest
      .fn()
      .mockImplementation(async (data) => ({ uid: 'mockUid' })),
    setCustomUserClaims: jest
      .fn()
      .mockImplementation(async (uid, data) => ({ uid: 'mockUid' })),
    verifyIdToken: jest.fn().mockImplementation(async (token) => {
      if (token == 'mockToken') return { claims: { mock: 'mock' } };
      else throw { message: 'Incorrect Token' };
    }),
  };
}
firebaseAdmin.auth = auth;
export default firebaseAdmin;
