import { describe, expect, it } from "vitest";
import { buildChartData } from "./buildChartData.ts";
import { NODE_TYPE, type ITreeNode } from "../types/company.ts";

const months = ["Feb 2024", "Mar 2024", "Apr 2024"];

const child = (name: string, values: number[]): ITreeNode => ({
  id: name,
  name,
  values,
  variant: NODE_TYPE.BRANCH,
});

describe("buildChartData", () => {
  it("maps each child's monthly value into a per-month record keyed by name", () => {
    const node: ITreeNode = {
      id: "company",
      name: "Company",
      values: [0, 0, 0],
      variant: NODE_TYPE.COMPANY,
      children: [child("Branch 1", [10, 20, 30]), child("Branch 2", [1, 2, 3])],
    };

    expect(buildChartData(node, months)).toEqual([
      { month: "Feb 2024", "Branch 1": 10, "Branch 2": 1 },
      { month: "Mar 2024", "Branch 1": 20, "Branch 2": 2 },
      { month: "Apr 2024", "Branch 1": 30, "Branch 2": 3 },
    ]);
  });

  it("only includes the month label when the node has no children", () => {
    const node: ITreeNode = {
      id: "leaf",
      name: "Leaf",
      values: [1, 2, 3],
      variant: NODE_TYPE.EMPLOYEE,
    };

    expect(buildChartData(node, months)).toEqual([
      { month: "Feb 2024" },
      { month: "Mar 2024" },
      { month: "Apr 2024" },
    ]);
  });
});
