import React from "preact/compat";
import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import { FontStyles } from ".";

describe("FontStyle Component", () => {
    it("should render correctly", () => {
        render(<FontStyles />);
    });
});
