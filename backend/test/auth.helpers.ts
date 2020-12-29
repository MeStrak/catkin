import createJWKSMock, { JWKSMock } from 'mock-jwks';


export function startAuthServer(jwksServer: string): JWKSMock {
    const jwks = createJWKSMock(jwksServer);
    jwks.start();
    return jwks;
}

export function getToken(jwks: JWKSMock): string {
    const token = jwks.token({
        aud: [
            "https://catkin.dev",
            "https://catkin-dev.eu.auth0.com/userinfo"
        ],
        iss: `https://catkin-dev.eu.auth0.com/`,
        'https://catkin.dev/permissions': [
            {
                "group": "*",
                "role": "admin"
            }
        ],
        sub: "testprovider|12345678"
    });
    return token;
}

export function stopAuthServer(jwks: JWKSMock) {
    jwks.stop();
}