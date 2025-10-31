import { Request, Response } from "express";
declare class UserService {
    getAllCreations: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getPublishedCreations: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    toggleLike: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: UserService;
export default _default;
//# sourceMappingURL=user.service.d.ts.map