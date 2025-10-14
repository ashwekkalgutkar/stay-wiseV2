import type { Request, Response, NextFunction } from 'express';
import type { IUser } from '../models/User.js';
export interface AuthRequest extends Request {
    user?: IUser;
}
export declare const authenticateJWT: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const requireAdmin: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.d.ts.map