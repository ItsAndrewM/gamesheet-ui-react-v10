import { LabelHTMLAttributes } from "react";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
    tag: string;
    labelPosition?: "inside" | "outside";
    name?: string;
    required?: boolean;
};
