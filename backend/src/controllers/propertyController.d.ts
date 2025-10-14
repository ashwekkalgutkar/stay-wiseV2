import type { Request, Response } from 'express';
import type { AuthRequest } from '../middleware/auth.js';
export declare const listProperties: (req: Request, res: Response) => Promise<void>;
export declare const getProperty: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createProperty: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=propertyController.d.ts.map