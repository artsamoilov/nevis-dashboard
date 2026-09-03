export const SERIES_COLORS = ["#B29DF8", "#F4BEB4", "#A75E6E"];
export const BAR_SIZE = 88;
export const BAR_CORNER_RADIUS = 4;

export const TEXT_COLOR = "#14141399";
export const GRIDLINE_COLOR = "#14141329";

export const CHART_MARGIN = {top: 8, right: 8, left: 0, bottom: 0};
export const BAR_CATEGORY_GAP = "30%";

export const axisTickStyle = {fill: TEXT_COLOR, fontSize: 12, fontFamily: "Inter, Roboto, sans-serif"};

export const legendWrapperStyle = {fontFamily: "Inter, Roboto, sans-serif", fontSize: 12, paddingTop: 8, paddingBottom: 8};
export const legendLabelStyle = {color: TEXT_COLOR};

export const getSegmentRadius = (
    row: Record<string, string | number>,
    seriesNames: string[],
    seriesIndex: number
): [number, number, number, number] => {
    const isBottom = seriesNames.slice(0, seriesIndex).every((name) => !row[name]);
    const isTop = seriesNames.slice(seriesIndex + 1).every((name) => !row[name]);
    return [
        isTop ? BAR_CORNER_RADIUS : 0,
        isTop ? BAR_CORNER_RADIUS : 0,
        isBottom ? BAR_CORNER_RADIUS : 0,
        isBottom ? BAR_CORNER_RADIUS : 0,
    ];
};