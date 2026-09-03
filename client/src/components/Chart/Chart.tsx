import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import type { ITreeNode } from "../../types/company.ts";
import { buildChartData } from "../../utils/buildChartData.ts";

import * as S from "./Chart.styled.ts";
import {
  axisTickStyle,
  BAR_CATEGORY_GAP,
  BAR_SIZE,
  CHART_MARGIN,
  getSegmentRadius,
  GRIDLINE_COLOR,
  legendLabelStyle,
  legendWrapperStyle,
  SERIES_COLORS,
} from "./chart.config.ts";

interface IChartProps {
  node: ITreeNode;
  months: string[];
}

export const Chart = ({ node, months }: IChartProps) => {
  const data = buildChartData(node, months);
  const series = node.children ?? [];
  const seriesNames = series.map((child) => child.name);
  const description = `Stacked bar chart of ${node.name} clients per month from ${months[0]} to ${months[months.length - 1]}, broken down by ${seriesNames.join(", ")}. See the table below for the exact figures.`;

  return (
    <S.ChartCard>
      <div role="img" aria-label={description}>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={data}
            margin={CHART_MARGIN}
            barCategoryGap={BAR_CATEGORY_GAP}
          >
            <CartesianGrid
              vertical={false}
              stroke={GRIDLINE_COLOR}
              strokeDasharray="2 4"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={axisTickStyle}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
              tick={axisTickStyle}
            />
            <Legend
              iconType="square"
              iconSize={8}
              wrapperStyle={legendWrapperStyle}
              labelStyle={legendLabelStyle}
            />
            {series.map((child, i) => (
              <Bar
                key={child.id}
                dataKey={child.name}
                stackId="clients"
                fill={SERIES_COLORS[i]}
                barSize={BAR_SIZE}
                shape={(props) => (
                  <Rectangle
                    {...props}
                    radius={getSegmentRadius(props.payload, seriesNames, i)}
                  />
                )}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </S.ChartCard>
  );
};
