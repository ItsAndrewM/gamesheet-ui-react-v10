import { ComponentChild } from "preact";

export type PropsWithChildren<P = unknown> = P & { children: ComponentChild };
export type PropsWithOptionalChildren<P = unknown> = P & { children?: ComponentChild };
