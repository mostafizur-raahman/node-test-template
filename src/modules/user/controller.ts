import { Request, Response } from "express";
import { UserService } from "./service";

export class UserController {
    constructor(private userService: UserService) {}

    async createUser(req: Request, res: Response): Promise<void> {
        const { name, email, password } = req.body;
        const user = await this.userService.createUser(name, email, password);
        res.status(201).json(user);
    }

    async getUserByEmail(req: Request, res: Response): Promise<void> {
        const { email } = req.params;
        const user = await this.userService.getUserByEmail(email);
        res.status(200).json(user);
    }

    async allUsers(req: Request, res: Response) {
        const users = await this.userService.findAllUsers();
        res.status(200).json(users);
    }
}
