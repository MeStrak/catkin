// import { ExecutionContext, Injectable } from '@nestjs/common';
// import { GqlExecutionContext } from '@nestjs/graphql';
// import { AuthGuard } from '@nestjs/passport';
// import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

// @Injectable()
// export class GqlWsAuthGuard implements CanActivate {
//   constructor(private readonly auth: AuthService) {}

//   canActivate(context: ExecutionContext) {
//     // Since a GraphQl subscription uses Websockets,
//     //     we can't pass any headers. So we pass the token inside the query itself
//     const token = context.switchToWs().getData().token;

//     if (!token) {
//       throw new BadRequestException('Authentication token not found.');
//     }

//     const validationResult = this.auth.ValidateToken(token);
//     if (validationResult === true) {
//       return true;
//     }
//     throw new UnauthorizedException(validationResult);
//   }
// }

// @Injectable()
// export class GqlAuthGuard extends AuthGuard('jwt') {
//   canActivate(context: ExecutionContext) {
//     const ctx = GqlExecutionContext.create(context);
//     const { req } = ctx.getContext();

//     return super.canActivate(new ExecutionContextHost([req]));
//   }
// }
