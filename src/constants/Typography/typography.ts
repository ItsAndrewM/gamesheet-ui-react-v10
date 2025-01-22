type Rule = {
    font: string;
    size: string;
    lineHeight: string;
    weight: string;
    letterSpacing: string;
    uppercase: boolean;
};

export const Rules: { [key: string]: Rule } = {
    // Use: Website or Blogs / Tag Lines
    "heading.4xl": {
        font: "Kapra Neue Pro",
        size: "9rem",
        lineHeight: "9rem",
        weight: "400",
        letterSpacing: "0.0rem",
        uppercase: true,
    },

    "heading.3xl": {
        font: "Kapra Neue Pro",
        size: "5rem",
        lineHeight: "5rem",
        weight: "400",
        letterSpacing: "0.0rem",
        uppercase: true,
    },

    "heading.2xl": {
        font: "Kapra Neue Pro",
        size: "3.75rem",
        lineHeight: "4.875rem",
        weight: "600",
        letterSpacing: "0.0rem",
        uppercase: true,
    },

    // Use: Website or Blogs / Tag Lines
    "heading.xl": {
        font: "Kapra Neue Pro",
        size: "3.25rem",
        lineHeight: "4rem",
        weight: "600",
        letterSpacing: "0.0rem",
        uppercase: true,
    },

    // Use: Desktop and Tablet Primary Headers
    "heading.lg": {
        font: "Kapra Neue Pro",
        size: "2.5rem",
        lineHeight: "3.25rem",
        weight: "600",
        letterSpacing: "0.063rem",
        uppercase: true,
    },

    // Use: Desktop and Tablet Secondary Headers
    "heading.md": {
        font: "Kapra Neue Pro",
        size: "2rem",
        lineHeight: "2.5rem",
        weight: "600",
        letterSpacing: "0.063rem",
        uppercase: true,
    },

    // Use: Desktop and Tablet Tertiary Headers & Mobile Primary Header
    "heading.sm": {
        font: "Kapra Neue Pro",
        size: "1.875rem",
        lineHeight: "2.25rem",
        weight: "600",
        letterSpacing: "0.063rem",
        uppercase: true,
    },

    // Use: Mobile Secondary Headers
    "heading.xs": {
        font: "Kapra Neue Pro",
        size: "1.5rem",
        lineHeight: "2rem",
        weight: "400",
        letterSpacing: "0.063rem",
        uppercase: true,
    },

    // Use: Desktop Button Usage, Mobile Tertiary Headers
    "heading.xxs": {
        font: "Kapra Neue Pro",
        size: "1.25rem",
        lineHeight: "1.5rem",
        weight: "400",
        letterSpacing: "0.063rem",
        uppercase: true,
    },

    // Use: Mobile Nav Bar Headers
    "heading.tiny": {
        font: "Kapra Neue Pro",
        size: "1rem",
        lineHeight: "1.25rem",
        weight: "400",
        letterSpacing: "0.063rem",
        uppercase: true,
    },

    // Use: Toasts
    "title.lg": {
        font: "Pitch Sans Medium",
        size: "1.25rem",
        lineHeight: "1.75rem",
        weight: "400",
        letterSpacing: "0",
        uppercase: false,
    },

    // Use: Toasts
    "title.md": {
        font: "Pitch Sans Medium",
        size: "1.125rem",
        lineHeight: "1.75rem",
        weight: "400",
        letterSpacing: "0",
        uppercase: false,
    },

    // Use: Toasts
    "title.sm": {
        font: "Pitch Sans Medium",
        size: "1rem",
        lineHeight: "1.5rem",
        weight: "400",
        letterSpacing: "0",
        uppercase: false,
    },

    // Use: Toasts
    "title.xs": {
        font: "Pitch Sans Medium",
        size: "0.75rem",
        lineHeight: "1rem",
        weight: "400",
        letterSpacing: "0",
        uppercase: false,
    },

    // Use: To highlight important information or key messages
    "body.2xl": {
        font: "Rubik",
        size: "1.75rem",
        lineHeight: "2.25rem",
        weight: "400",
        letterSpacing: "0",
        uppercase: false,
    },

    "body.xl": {
        font: "Rubik",
        size: "1.5rem",
        lineHeight: "2rem",
        weight: "400",
        letterSpacing: "0",
        uppercase: false,
    },

    "body.lg": {
        font: "Rubik",
        size: "1.125rem",
        lineHeight: "1.75rem",
        weight: "400",
        letterSpacing: "0",
        uppercase: false,
    },

    // Use: Default should be Regular for all body text. Use Medium weight for button text, important terms, or critical information within the body.
    "body.default": {
        font: "Rubik",
        size: "1rem",
        lineHeight: "1.5rem",
        weight: "200",
        letterSpacing: "0",
        uppercase: false,
    },

    // Use: Body Subtext or Captions
    "body.sm": {
        font: "Rubik",
        size: "0.875rem",
        lineHeight: "1.25rem",
        weight: "200",
        letterSpacing: "0",
        uppercase: false,
    },

    // Use: Body Subtext or Captions
    "body.xs": {
        font: "Rubik",
        size: "0.75rem",
        lineHeight: "1rem",
        weight: "200",
        letterSpacing: "0",
        uppercase: false,
    },

    // Use: Fine print usage or legal notices
    "body.xxs": {
        font: "Rubik",
        size: "10px",
        lineHeight: "14px",
        weight: "200",
        letterSpacing: "0",
        uppercase: false,
    },

    // Legacy Admin Dashboard Typography
    "legacy.4xl": {
        font: "Rubik, sans-serif",
        size: "9rem",
        lineHeight: "9rem",
        weight: "400",
        letterSpacing: "0.0rem",
        uppercase: true,
    },

    "legacy.3xl": {
        font: "Rubik, sans-serif",
        size: "5rem",
        lineHeight: "5rem",
        weight: "400",
        letterSpacing: "0.0rem",
        uppercase: true,
    },

    "legacy.2xl": {
        font: "Rubik, sans-serif",
        size: "3.75rem",
        lineHeight: "4.875rem",
        weight: "600",
        letterSpacing: "0.0rem",
        uppercase: true,
    },

    // Use: Website or Blogs / Tag Lines
    "legacy.xl": {
        font: "Rubik, sans-serif",
        size: "3.25rem",
        lineHeight: "4rem",
        weight: "600",
        letterSpacing: "0.0rem",
        uppercase: true,
    },

    // Use: Desktop and Tablet Primary Headers
    "legacy.lg": {
        font: "Rubik, sans-serif",
        size: "2.5rem",
        lineHeight: "3.25rem",
        weight: "600",
        letterSpacing: "0.063rem",
        uppercase: true,
    },

    // Use: Desktop and Tablet Secondary Headers
    "legacy.md": {
        font: "Rubik, sans-serif",
        size: "2rem",
        lineHeight: "2.5rem",
        weight: "600",
        letterSpacing: "0.063rem",
        uppercase: true,
    },

    // Use: Desktop and Tablet Tertiary Headers & Mobile Primary Header
    "legacy.sm": {
        font: "Rubik, sans-serif",
        size: "1.875rem",
        lineHeight: "2.25rem",
        weight: "600",
        letterSpacing: "0.063rem",
        uppercase: true,
    },

    // Use: Mobile Secondary Headers
    "legacy.xs": {
        font: "Rubik, sans-serif",
        size: "1.5rem",
        lineHeight: "2rem",
        weight: "400",
        letterSpacing: "0.063rem",
        uppercase: true,
    },

    // Use: Desktop Button Usage, Mobile Tertiary Headers
    "legacy.xxs": {
        font: "Rubik, sans-serif",
        size: "1.25rem",
        lineHeight: "1.5rem",
        weight: "400",
        letterSpacing: "0.063rem",
        uppercase: true,
    },

    // Use: Mobile Nav Bar Headers
    "legacy.tiny": {
        font: "Rubik, sans-serif",
        size: "1rem",
        lineHeight: "1.25rem",
        weight: "400",
        letterSpacing: "0.063rem",
        uppercase: true,
    },
};
