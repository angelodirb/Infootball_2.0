// backend/src/auth/services/auth.service.ts
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(userData: {
    email: string;
    password: string;
    firstName: string;  // ✅ CAMBIO: De username a firstName
    lastName: string;   // ✅ CAMBIO: Agregado lastName
  }) {
    // Verificar si el usuario ya existe
    const existingUser = await this.usersService.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    // Crear el usuario
    const user = await this.usersService.create(userData);

    // Generar token JWT
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      token,  // ✅ CAMBIO: De access_token a token
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,  // ✅ CAMBIO: De username a firstName
        lastName: user.lastName,    // ✅ CAMBIO: Agregado lastName
        role: user.role,
      },
    };
  }

  async login(email: string, password: string) {
    // Buscar usuario
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Generar token JWT
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      token,  // ✅ CAMBIO: De access_token a token
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,  // ✅ CAMBIO: De username a firstName
        lastName: user.lastName,    // ✅ CAMBIO: Agregado lastName
        role: user.role,
      },
    };
  }

  async validateUser(userId: string) {
    return await this.usersService.findOne(userId);
  }
}