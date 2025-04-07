import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const GetRawHeaders = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        const rawHeader = req.rawHeaders;
        if (!rawHeader) {
            throw new InternalServerErrorException('Raw headers not found in request');
        }
        return (!data)
            ? rawHeader
            : rawHeader[data];
    }
)