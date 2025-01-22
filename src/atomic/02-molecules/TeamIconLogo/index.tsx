import { Icon } from "@/atomic/01-atoms";
import { colors } from "@/constants/Colors/colors";
import { cn } from "@/utils/cn";

type LogoProps = {
    team: "home" | "visitor" | undefined;
    src: string | undefined;
    className?: string;
    alt?: string;
};

export function TeamIconLogo({ team, src, className = "", alt = "" }: LogoProps) {
    const srcString = src?.includes("/256") ? src : src + "/256";
    if (!src && team) {
        return (
            <Icon
                name={team === "home" ? "HomeJerseyIcon" : "VisitorJerseyIcon"}
                className={className}
                color={colors.secondary.hex}
                size="xl"
                data-testid={`${team}-team-icon`}
            />
        );
    }
    if (!src && !team) {
        return (
            <Icon
                name="HockeyJerseyIcon"
                color={colors.secondary.hex}
                size="xl"
                className={className}
                data-testid="default-team-icon"
            />
        );
    }
    return (
        <img
            src={srcString}
            alt={alt || team}
            className={cn("w-16 h-16", className)}
            loading={"lazy"}
            decoding={"async"}
            data-testid={`${team}-team-logo`}
        />
    );
}
