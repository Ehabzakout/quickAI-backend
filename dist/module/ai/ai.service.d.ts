import { Request, Response } from "express";
declare class AiService {
    generateArticle: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    generateTitle: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    generateImage: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    removeBackground: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    removeObject: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: AiService;
export default _default;
//# sourceMappingURL=ai.service.d.ts.map