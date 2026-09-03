import { Router } from "express";
import companyDataRaw from "../data/company.json" with { type: "json" };
import type { IRawNode } from "../data/types.js";

const companyData = companyDataRaw as IRawNode;

export const companyRouter = Router();

companyRouter.get("/company", (req, res) => {
    res.set("Cache-Control", "no-store");

    // Timeout to simulate a slow API call for loading state demonstration
    setTimeout(() => {
        res.json(companyData);
    }, 400);
});
