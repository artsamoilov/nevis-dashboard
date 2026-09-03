import {type ITreeNode, NODE_TYPE} from "../../types/company.ts";
import type {KeyboardEvent} from "react";
import {Avatar} from "../Avatar/Avatar.tsx";
import chevronDown from "../../../assets/chevron-down.svg";

import * as S from './TableRowTree.styled.ts';

interface TableRowTreeProps {
    node: ITreeNode;
    depth: number;
    expandedIds: Set<string>;
    onToggleExpand: (node: ITreeNode) => void;
    isLast?: boolean;
}

export const TableRowTree = ({node, depth, expandedIds, onToggleExpand, isLast = true}: TableRowTreeProps) => {
    const hasChildrenRows = !!node.children?.length;
    const isExpanded = expandedIds.has(node.id);
    const showBorder = !isLast || (hasChildrenRows && isExpanded);

    const handleRowClick = () => {
        if (hasChildrenRows) {
            onToggleExpand(node);
        }
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLTableRowElement>) => {
        if (!hasChildrenRows) return;
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onToggleExpand(node);
        }
    }

    return (
        <>
            <S.Row
                role="row"
                onClick={handleRowClick}
                onKeyDown={handleKeyDown}
                tabIndex={hasChildrenRows ? 0 : undefined}
                aria-expanded={hasChildrenRows ? isExpanded : undefined}
                $clickable={hasChildrenRows}
                $showBorder={showBorder}
            >
                <S.NameCell role="rowheader" $depth={depth}>
                    {hasChildrenRows ? (
                        <S.Chevron aria-hidden="true" $expanded={isExpanded}>
                            <img src={chevronDown} alt="" width={16} height={16} />
                        </S.Chevron>
                    ) : (
                        <S.ChevronPlaceholder aria-hidden="true" />
                    )}
                    {node.variant === NODE_TYPE.EMPLOYEE && <Avatar name={node.name} />}
                    <span>{node.name}</span>
                </S.NameCell>
                {node.values.map((value, i) => (
                    <S.ValueCell role="cell" key={i}>
                        {value}
                    </S.ValueCell>
                ))}
            </S.Row>

            {hasChildrenRows && (
                <S.ChildrenWrapper $expanded={isExpanded} inert={!isExpanded}>
                    <S.ChildrenInner>
                        {node.children!.map((child, i) => (
                            <TableRowTree
                                key={child.id}
                                node={child}
                                depth={depth + 1}
                                expandedIds={expandedIds}
                                onToggleExpand={onToggleExpand}
                                isLast={i === node.children!.length - 1}
                            />
                        ))}
                    </S.ChildrenInner>
                </S.ChildrenWrapper>
            )}
        </>
    )
};