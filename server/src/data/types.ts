export interface IRawNode {
    id: string;
    name: string;
    values: number[];
    branches?: IRawNode[];
    employees?: IRawNode[];
    channels?: IRawNode[];
}
