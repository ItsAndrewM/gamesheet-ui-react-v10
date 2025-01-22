import { PropsWithChildren } from "preact/compat";

export const QueryPreservingLink = ({
    href,
    children,
    preserveQueries = true, // Flag to toggle query preservation
    excludeQueries = [], // Array of query params to exclude
    ...props
}: PropsWithChildren<{
    href: string;
    preserveQueries?: boolean;
    excludeQueries?: string[];
}>) => {
    const buildHref = () => {
        if (!preserveQueries) return href;

        const currentParams = new URLSearchParams(window.location.search);

        // Remove excluded queries
        excludeQueries.forEach((param) => currentParams.delete(param));

        const queryString = currentParams.toString();
        return `${href}${queryString ? "?" + queryString : ""}`;
    };

    return (
        <a href={buildHref()} {...props}>
            {children}
        </a>
    );
};
