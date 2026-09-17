import { IsString } from "class-validator";

export class SignInDTO {
    @IsString({
        message: "username phải là chữ"
    })
    username: string;

    @IsString({
        message: "password phải là chữ"
    })
    password: string;
}