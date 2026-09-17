import { BadGatewayException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { SignInDTO } from './dto/sign-in.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post()
  async signIn(@Body() data: SignInDTO) {
    console.log("đã vào, body là: ", data)
    try {
      let token = await this.authService.signIn(data)
      return {
        token,
        msg: "login thành công!"
      }
    } catch (err) {
      console.log("err",err)
      return new BadGatewayException(err)
    }
  }
}
