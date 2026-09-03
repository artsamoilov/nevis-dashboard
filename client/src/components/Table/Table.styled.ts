import styled from "styled-components";

export const ScrollContainer = styled.div`
    width: 100%;
    overflow-x: auto;
    border-radius: 8px;
`;

export const TableWrapper = styled.div<{$columns: number}>`
    display: grid;
    grid-template-columns: 260px repeat(${({$columns}) => $columns}, minmax(70px, 1fr));
    width: 100%;
    min-width: max-content;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
`;

export const RowGroup = styled.div`
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 1/-1;
`;

export const HeaderRow = styled.div`
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 1/-1;
    padding: 0 16px;
    border-bottom: 1px solid #14141314;
`;

export const HeaderCell = styled.div`
    padding: 20px 8px 16px;
    font-family: 'Inter', Roboto, sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    text-align: right;
    color: #14141399;
`;