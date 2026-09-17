import { BadGatewayException, Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { SignInDTO } from './dto/sign-in.dto.js';
import { AuthGuard } from '../../guard/auth.guard.js';

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

  @UseGuards(AuthGuard)
  @Post("/profile")
  profile(@Req() req: any) {
    console.log("req", req.user)
    return this.authService.getProfile(req.user.userId)
  }
}
