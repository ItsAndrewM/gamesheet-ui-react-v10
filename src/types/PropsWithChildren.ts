import { ReactNode } from "react";

// For required children
export type PropsWithChildren<P = unknown> = P & { children: ReactNode };

// For optional children
export type PropsWithOptionalChildren<P = unknown> = P & { children?: ReactNode };
