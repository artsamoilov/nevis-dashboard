import type { ITreeNode } from "../../types/company.ts";
import { useState } from "react";
import { TableRowTree } from "../TableRowTree/TableRowTree.tsx";

import * as S from "./Table.styled.ts";

interface TableProps {
  data: ITreeNode;
  months: string[];
}

const collectSubtreeIds = (node: ITreeNode): string[] => {
  const ids = [node.id];
  for (const child of node.children ?? []) {
    ids.push(...collectSubtreeIds(child));
  }
  return ids;
};

export const Table = ({ data, months }: TableProps) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set([data.id]),
  );

  const handleToggleExpand = (node: ITreeNode) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(node.id)) {
        collectSubtreeIds(node).forEach((id) => newSet.delete(id));
      } else {
        newSet.add(node.id);
      }
      return newSet;
    });
  };

  return (
    <S.ScrollContainer>
      <S.TableWrapper
        $columns={months.length}
        role="table"
        aria-label="Clients by month"
      >
        <S.RowGroup role="rowgroup">
          <S.HeaderRow role="row">
            <S.HeaderCell role="columnheader"></S.HeaderCell>
            {months.map((month) => (
              <S.HeaderCell role="columnheader" key={month}>
                {month}
              </S.HeaderCell>
            ))}
          </S.HeaderRow>
        </S.RowGroup>
        <S.RowGroup role="rowgroup">
          <TableRowTree
            node={data}
            depth={0}
            expandedIds={expandedIds}
            onToggleExpand={handleToggleExpand}
          />
        </S.RowGroup>
      </S.TableWrapper>
    </S.ScrollContainer>
  );
};
