import { createParamDecorator } from "@nestjs/common";

export const GetUser = createParamDecorator(
    () => {
        return 'Hola desde GET_USER';
    }
)