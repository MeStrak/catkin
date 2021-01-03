import createJWKSMock, { JWKSMock } from 'mock-jwks';

export function startAuthServer(jwksServer: string): JWKSMock {
  const jwks = createJWKSMock(jwksServer);
  jwks.start();
  return jwks;
}

export function getToken(
  jwks: JWKSMock,
  authDomain: string,
  authAudience: string,
): string {
  const token = jwks.token({
    aud: [`${authAudience}`, `${authDomain}/userinfo`],
    iss: `${authDomain}/`,
    'https://catkin.dev/permissions': [
      {
        group: '*',
        role: 'admin',
      },
    ],
    sub: 'testprovider|12345678',
  });
  return token;
}

export function stopAuthServer(jwks: JWKSMock) {
  jwks.stop();
}
