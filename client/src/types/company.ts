export interface IRawNode {
    id: string;
    name: string;
    values: number[];
    branches?: IRawNode[];
    employees?: IRawNode[];
    channels?: IRawNode[];
}

export const NODE_TYPE = {
    COMPANY: 'company',
    BRANCH: 'branch',
    EMPLOYEE: 'employee',
    CHANNEL: 'channel'
} as const;

export type TNodeType = typeof NODE_TYPE[keyof typeof NODE_TYPE];

export interface ITreeNode {
    id: string;
    name: string;
    values: number[];
    variant: TNodeType;
    children?: ITreeNode[];
}
