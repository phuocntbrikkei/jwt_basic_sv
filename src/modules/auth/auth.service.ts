import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { SignInDTO } from './dto/sign-in.dto.js';
import { UserStatus } from '../../generated/enums.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService
    ) { }

    async signIn(data: SignInDTO) {


        let user = await this.prismaService.user.findUnique({
            where: {
                username: data.username
            }
        })


        if (!user) {
            throw ("user không tồn tại!")
        }

        if (user.password != data.password) {
            throw ("mật khẩu không chính xác!")
        }

        if (user.status != UserStatus.ACTIVE) {
            throw ("tài khoản đã bị khóa")
        }

        /*login thành công -> token*/

        let token = await this.jwtService.signAsync({userId: user.id})

        return token

    }

    async getProfile(userId: number) {
        let data = await this.prismaService.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!data) {
            throw "người dùng không tồn tại!"
        }

        return data;
    }
}
