import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Chart } from "./Chart.tsx";
import { NODE_TYPE, type ITreeNode } from "../../types/company.ts";

describe("Chart", () => {
  it("describes the node, month range and series names for assistive tech", () => {
    const node: ITreeNode = {
      id: "company",
      name: "Company",
      values: [10, 20],
      variant: NODE_TYPE.COMPANY,
      children: [
        {
          id: "b1",
          name: "Branch 1",
          values: [7, 14],
          variant: NODE_TYPE.BRANCH,
        },
        {
          id: "b2",
          name: "Branch 2",
          values: [3, 6],
          variant: NODE_TYPE.BRANCH,
        },
      ],
    };

    render(<Chart node={node} months={["Feb 2024", "Mar 2024"]} />);

    const chart = screen.getByRole("img");
    expect(chart).toHaveAccessibleName(/Company/);
    expect(chart).toHaveAccessibleName(/Feb 2024/);
    expect(chart).toHaveAccessibleName(/Mar 2024/);
    expect(chart).toHaveAccessibleName(/Branch 1/);
    expect(chart).toHaveAccessibleName(/Branch 2/);
  });
});
