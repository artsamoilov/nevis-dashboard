import {describe, expect, it} from "vitest";
import {normalizeTree} from "./normalizeTree.ts";
import {NODE_TYPE, type IRawNode} from "../types/company.ts";

describe("normalizeTree", () => {
    it("tags a company's branches as BRANCH and nests them as children", () => {
        const raw: IRawNode = {
            id: "company",
            name: "Company",
            values: [1, 2],
            branches: [{id: "b1", name: "Branch 1", values: [1, 2]}],
        };

        const result = normalizeTree(raw);

        expect(result.variant).toBe(NODE_TYPE.COMPANY);
        expect(result.children).toEqual([
            {id: "b1", name: "Branch 1", values: [1, 2], variant: NODE_TYPE.BRANCH},
        ]);
    });

    it("tags a branch's employees as EMPLOYEE", () => {
        const raw: IRawNode = {
            id: "b1",
            name: "Branch 1",
            values: [1, 2],
            employees: [{id: "e1", name: "Anna", values: [1, 2]}],
        };

        const result = normalizeTree(raw, NODE_TYPE.BRANCH);

        expect(result.children).toEqual([
            {id: "e1", name: "Anna", values: [1, 2], variant: NODE_TYPE.EMPLOYEE},
        ]);
    });

    it("tags an employee's channels as CHANNEL", () => {
        const raw: IRawNode = {
            id: "e1",
            name: "Anna",
            values: [1, 2],
            channels: [{id: "c1", name: "Existing clients", values: [1, 2]}],
        };

        const result = normalizeTree(raw, NODE_TYPE.EMPLOYEE);

        expect(result.children).toEqual([
            {id: "c1", name: "Existing clients", values: [1, 2], variant: NODE_TYPE.CHANNEL},
        ]);
    });

    it("leaves children undefined for a node with none of branches/employees/channels", () => {
        const raw: IRawNode = {id: "b2", name: "Branch 2", values: [1, 2]};

        const result = normalizeTree(raw, NODE_TYPE.BRANCH);

        expect(result.children).toBeUndefined();
    });
});
