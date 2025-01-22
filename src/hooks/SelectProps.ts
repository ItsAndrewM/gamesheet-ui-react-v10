import { ChangeEvent, SelectHTMLAttributes } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    tag: string;
    name?: string;
    required?: boolean;
    labelPosition?: "inside" | "outside" | "none";
    helptext?: string;
    errortext?: string;
    options: OptionType[];
    defaultValue?: string;
    onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
    validate?: (value: string) => boolean;
    onValidInput?: (value: string) => void;
    onInvalidInput?: (value: string) => void;
}

interface OptionType {
    value: string;
    label: string;
}

export interface NativeSelectProps {
    label?: string;
    description?: string;
    options: OptionType[];
    defaultValue?: string;
    onChange?: (value: string) => void;
    className?: string;
}
