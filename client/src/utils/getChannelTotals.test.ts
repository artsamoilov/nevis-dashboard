import { describe, expect, it } from "vitest";
import { getChannelTotals } from "./getChannelTotals.ts";
import { NODE_TYPE, type ITreeNode } from "../types/company.ts";

const channel = (name: string, values: number[]): ITreeNode => ({
  id: name,
  name,
  values,
  variant: NODE_TYPE.CHANNEL,
});

const employee = (id: string, children?: ITreeNode[]): ITreeNode => ({
  id,
  name: id,
  values: [0, 0],
  variant: NODE_TYPE.EMPLOYEE,
  children,
});

const branch = (id: string, children: ITreeNode[]): ITreeNode => ({
  id,
  name: id,
  values: [0, 0],
  variant: NODE_TYPE.BRANCH,
  children,
});

describe("getChannelTotals", () => {
  it("sums the same channel name across every employee that has it", () => {
    const tree = branch("Branch 1", [
      employee("Anna", [
        channel("Existing clients", [10, 12]),
        channel("New organic", [1, 2]),
      ]),
      employee("James", [channel("Existing clients", [5, 6])]),
    ]);

    const result = getChannelTotals(tree);

    expect(result.children).toEqual([
      expect.objectContaining({ name: "Existing clients", values: [15, 18] }),
      expect.objectContaining({ name: "New organic", values: [1, 2] }),
    ]);
  });

  it("returns no channels when nothing in the tree has channel-level data", () => {
    const tree = branch("Branch 1", [employee("Anna")]);

    expect(getChannelTotals(tree).children).toEqual([]);
  });
});
