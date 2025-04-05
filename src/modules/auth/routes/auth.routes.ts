import express, { NextFunction, Request, Response } from 'express';
import { AuthController } from '../controller/auth.controller';
import { UserDatasource } from '../datasource/userDatasourceImpl';

const authRouter = express.Router();
const datasource = new UserDatasource();
const controller = new AuthController(datasource);

authRouter.post('/v1/api/register', async (req: Request, res: Response, next: NextFunction) => {
   controller.register.bind(controller)
});
authRouter.post('/v1/api/login', controller.login.bind(controller));

export default authRouter;