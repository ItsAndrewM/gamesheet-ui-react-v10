const isFilter = (key: string) => {
    const match = key.match(/^filter\[[^\]]+\]$/);
    return !!match;
};

const isConfiguration = (key: string) => {
    const match = key.match(/^configuration\[[^\]]+\]$/);
    return !!match;
};

const getPathParams = (path: string) => {
    const matches = path.match(/\[[^\]]+\]/g);
    if (!matches) {
        return [];
    }

    return matches.map((m) => m.slice(1, m.length - 1));
};

export const relevantQueries = ({
    pathname,
    queries,
}: {
    pathname: string;
    queries: { [x: string]: string | string[] | undefined };
}) => {
    const pathParams = getPathParams(pathname);
    return Object.keys(queries).reduce(
        (out, key) => {
            if (isFilter(key) || isConfiguration(key) || pathParams.includes(key)) {
                return {
                    ...out,
                    [key]: queries[key],
                };
            }
            return out;
        },
        {} as { [x: string]: string | string[] | undefined },
    );
};
