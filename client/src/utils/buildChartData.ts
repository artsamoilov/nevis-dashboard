import type { ITreeNode } from "../types/company.ts";

export interface IChartData {
  month: string;
  [seriesName: string]: string | number;
}

export const buildChartData = (
  node: ITreeNode,
  months: string[],
): IChartData[] =>
  months.map((month, monthIndex) => {
    const data: IChartData = { month };
    (node.children ?? []).forEach((child) => {
      data[child.name] = child.values[monthIndex] ?? 0;
    });
    return data;
  });
