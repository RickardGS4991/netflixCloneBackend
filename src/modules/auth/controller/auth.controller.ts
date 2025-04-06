
import { Request, Response } from 'express';
import { UserInfo } from "../model/userInfo";
import { IUserDatasource } from '../interfaces/iUserDatasource';
import { LoginResponse } from '../model/login';

export class AuthController {
    constructor(private datasource: IUserDatasource) {}

    async register(req: Request, res: Response) {
        try {
            const registerUser: UserInfo = req.body;
            if(!registerUser){
                res.status(400).json({data: null, message: `Error`});
                return;
            }
            const user = await this.datasource.registerUser(registerUser.data);
            if(!user){
                res.status(404).json({data:null, message: `error on server`});
                return;
            }

            let dataFromUser = {
                userId: user.id,
                username: registerUser.username
            };

            await this.datasource.imageProfile(dataFromUser);

            res.status(201).json({data: user, message: `Request correctly made it`});
        } catch (error) {
            res.status(500).json({data: null, message: `Error on server`});
        }
    }

    async login(req: Request, res: Response){
        try {
            const loginInfo: UserInfo = req.body;
            if(!loginInfo){
                res.status(400).json({data: null, message: `Error`});
                return;
            }
            const user: LoginResponse = await this.datasource.login(loginInfo);
            if(!user){
                res.status(404).json({data:null, message: `error on server`});
                return;
            }

            let data = await this.datasource.getImageProfile(user.userId);
            if(!data){
                res.status(404).json({data:null, message: `error on server`});
                return;
            }

            res.status(201).json({data: data, message: `Request correctly made it`});
        } catch (error) {
            res.status(500).json({data: null, message: `Error on server`});
        }
    }
}