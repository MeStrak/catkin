import { createParamDecorator } from '@nestjs/common';

// TODO: switch to nestjs recommended pattern: https://docs.nestjs.com/migration-guide
export const User = createParamDecorator((data, req) => {
    return req.args[2].req.user;
});
