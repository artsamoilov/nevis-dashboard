import styled from "styled-components";

export const Row = styled.div<{ $clickable: boolean; $showBorder: boolean }>`
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 1 / -1;
    padding: 0 16px;
    border-bottom: 1px solid ${({$showBorder}) => ($showBorder ? "#14141314" : "transparent")};
    cursor: ${({$clickable}) => ($clickable ? "pointer" : "default")};
    transition: background-color 0.2s;

    &:hover, &:focus-visible {
        background-color: ${({$clickable}) => ($clickable ? "#1414130A" : "transparent")};
    }
`;

export const NameCell = styled.div<{ $depth: number }>`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 18px 8px 18px ${({$depth}) => $depth * 28}px;
    font-family: 'Inter', Roboto, sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0;
    vertical-align: middle;
    font-variant-numeric: lining-nums tabular-nums;
`;

export const ValueCell = styled.div`
    padding: 18px 8px;
    font-family: 'Inter', Roboto, sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0;
    vertical-align: middle;
    font-variant-numeric: lining-nums tabular-nums;
    text-align: right;
`;

export const Chevron = styled.span<{ $expanded: boolean }>`
  display: inline-flex;
  width: 16px;
  height: 16px;
  transition: transform 0.15s ease;
  transform: rotate(${({$expanded}) => ($expanded ? "0deg" : "-90deg")});
`;

export const ChevronPlaceholder = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
`;

export const ChildrenWrapper = styled.div<{ $expanded: boolean }>`
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: subgrid;
    grid-template-rows: ${({$expanded}) => ($expanded ? "1fr" : "0fr")};
    transition: grid-template-rows 0.2s;
`;

export const ChildrenInner = styled.div`
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: subgrid;
    overflow: hidden;
    min-height: 0;
`;