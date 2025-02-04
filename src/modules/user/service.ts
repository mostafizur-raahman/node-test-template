import { User } from "./entities/User";
import { UserRepository } from "./repository";

export class UserService {
    constructor(private userRepository: UserRepository) {}

    async createUser(
        name: string,
        email: string,
        password: string
    ): Promise<User> {
        const user = this.userRepository.create({ name, email, password });
        return this.userRepository.save(user);
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }
}
