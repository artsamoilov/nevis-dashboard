import {describe, expect, it} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Table} from "./Table.tsx";
import {NODE_TYPE, type ITreeNode} from "../../types/company.ts";

const months = ["Feb 2024"];

const tree: ITreeNode = {
    id: "company",
    name: "Company",
    values: [100],
    variant: NODE_TYPE.COMPANY,
    children: [
        {
            id: "branch-1",
            name: "Branch 1",
            values: [70],
            variant: NODE_TYPE.BRANCH,
            children: [
                {
                    id: "employee-1",
                    name: "Employee 1",
                    values: [50],
                    variant: NODE_TYPE.EMPLOYEE,
                    children: [{id: "channel-1", name: "Channel 1", values: [50], variant: NODE_TYPE.CHANNEL}],
                },
            ],
        },
        {id: "branch-2", name: "Branch 2", values: [30], variant: NODE_TYPE.BRANCH},
    ],
};

describe("Table expand/collapse", () => {
    it("expands a row on click to reveal its children, and collapses it again", async () => {
        const user = userEvent.setup();
        render(<Table data={tree} months={months}/>);
        await user.click(screen.getByRole("row", {name: /Company/}));

        const branchRow = screen.getByRole("row", {name: /Branch 1/});
        expect(branchRow).toHaveAttribute("aria-expanded", "false");
        expect(screen.getByRole("row", {name: /Employee 1/}).closest("[inert]")).not.toBeNull();

        await user.click(branchRow);
        expect(branchRow).toHaveAttribute("aria-expanded", "true");
        expect(screen.getByRole("row", {name: /Employee 1/}).closest("[inert]")).toBeNull();

        await user.click(branchRow);
        expect(branchRow).toHaveAttribute("aria-expanded", "false");
        expect(screen.getByRole("row", {name: /Employee 1/}).closest("[inert]")).not.toBeNull();
    });

    it("toggles expand state from the keyboard with Enter and Space", () => {
        render(<Table data={tree} months={months}/>);
        fireEvent.click(screen.getByRole("row", {name: /Company/}));

        const branchRow = screen.getByRole("row", {name: /Branch 1/});
        fireEvent.keyDown(branchRow, {key: "Enter"});
        expect(branchRow).toHaveAttribute("aria-expanded", "true");

        fireEvent.keyDown(branchRow, {key: " "});
        expect(branchRow).toHaveAttribute("aria-expanded", "false");
    });

    it("ignores clicks and key presses on a row without children", async () => {
        const user = userEvent.setup();
        render(<Table data={tree} months={months}/>);
        await user.click(screen.getByRole("row", {name: /Company/}));

        const leafRow = screen.getByRole("row", {name: /Branch 2/});
        expect(leafRow).not.toHaveAttribute("aria-expanded");
        expect(leafRow).not.toHaveAttribute("tabindex");

        await user.click(leafRow);
        expect(leafRow).not.toHaveAttribute("aria-expanded");
    });

    it("collapsing a branch also collapses everything nested inside it", async () => {
        const user = userEvent.setup();
        render(<Table data={tree} months={months}/>);
        await user.click(screen.getByRole("row", {name: /Company/}));

        const branchRow = screen.getByRole("row", {name: /Branch 1/});
        await user.click(branchRow); // expand Branch 1

        const employeeRow = screen.getByRole("row", {name: /Employee 1/});
        await user.click(employeeRow); // expand Employee 1
        expect(employeeRow).toHaveAttribute("aria-expanded", "true");

        await user.click(branchRow); // collapse Branch 1
        await user.click(branchRow); // re-expand Branch 1

        expect(screen.getByRole("row", {name: /Employee 1/})).toHaveAttribute("aria-expanded", "false");
    });
});
