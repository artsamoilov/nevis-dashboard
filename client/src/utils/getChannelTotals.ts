import { NODE_TYPE, type ITreeNode } from "../types/company.ts";

const findChannels = (node: ITreeNode): ITreeNode[] => {
  const channels: ITreeNode[] = [];

  for (const child of node.children ?? []) {
    if (child.variant === NODE_TYPE.CHANNEL) {
      channels.push(child);
    } else {
      channels.push(...findChannels(child));
    }
  }

  return channels;
};

export const getChannelTotals = (node: ITreeNode): ITreeNode => {
  const channels: ITreeNode[] = [];

  for (const channel of findChannels(node)) {
    const existing = channels.find((c) => c.name === channel.name);
    if (existing)
      existing.values = existing.values.map((v, i) => v + channel.values[i]);
    else channels.push({ ...channel });
  }

  return {
    id: "channel-totals",
    name: "Acquisition channels",
    variant: NODE_TYPE.CHANNEL,
    values: node.values,
    children: channels,
  };
};
