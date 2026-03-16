import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { UsersService } from "../user/user.service";
import { randomBytes, scrypt as scryptCallback } from "crypto";
import { promisify } from "util";

const scrypt = promisify(scryptCallback);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string, name: string) {
    const users = await this.usersService.find(email);

    if (users.length) {
      throw new BadRequestException("email in use");
    }

    const salt = randomBytes(8).toString("hex");
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + "." + hash.toString("hex");

    const newUser = await this.usersService.create(email, result, name, false);

    return newUser;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new NotFoundException("invalid email or password");
    }

    const [salt, storedHash] = user.password.split(".");
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString("hex")) {
      throw new BadRequestException("bad password");
    }

    return user;
  }
}
