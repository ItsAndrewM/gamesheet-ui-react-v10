export const getInitials = (s: string) => (s.match(/\b\w/g) || [s[0] || ""]).slice(0, 2).join("").toUpperCase();
