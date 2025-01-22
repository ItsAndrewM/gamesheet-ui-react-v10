import { IconNames } from "@/atomic/01-atoms/Icon";
import { InputHTMLAttributes } from "react";

export type InputProps<T extends HTMLInputElement | HTMLTextAreaElement> = InputHTMLAttributes<T> & {
    iconLeft?: IconNames;
    iconRight?: IconNames;
    helptext?: string;
    isInvalid?: boolean;
    errortext?: string;
    withCopy?: boolean;
    tag: string;
    required?: boolean;
    value?: string;
    labelPosition?: "inside" | "outside" | "none";
    name?: string;
    resize?: boolean;
    validate?: (arg0: string) => boolean;
    onValidInput?: (value: string) => void;
    onInvalidInput?: (value: string) => void;
};
