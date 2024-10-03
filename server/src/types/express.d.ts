import { TUserPayloadInToken } from './models/user';

declare module "express-serve-static-core" {
    interface Request {
        user?: TUserPayloadInToken;
    }
}