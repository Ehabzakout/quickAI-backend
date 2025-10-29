declare module "express" {
    interface Request {
        plan?: "premium" | "free";
        free_usage?: number;
    }
}
export {};
//# sourceMappingURL=index.d.ts.map