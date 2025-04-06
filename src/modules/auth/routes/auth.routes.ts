import express from 'express';
import { AuthController } from '../controller/auth.controller';
import { UserDatasource } from '../datasource/userDatasourceImpl';

const authRouter = express.Router();
const datasource = new UserDatasource();
const controller = new AuthController(datasource);

authRouter.post('/v1/api/register', controller.register.bind(controller));
authRouter.post('/v1/api/login', controller.login.bind(controller));

export default authRouter;