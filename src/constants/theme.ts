// Color palette
export const COLORS = {
    background: {
        app: 'hsl(0deg 0% 18%)',
        canvas: 'hsl(0deg 0% 0%)',
        export: 'hsl(0deg 0% 0%)',
    },
    text: {
        primary: 'hsl(0deg 0% 100%)',
    },
    button: {
        primary: {
            background: 'hsl(0deg 0% 100% / 10%)',
            text: 'hsl(0deg 0% 100%)',
        },
        remove: {
            background: 'hsl(0deg 100% 50%)',
            text: 'hsl(0deg 0% 100%)',
        },
    },
    overlay: {
        background: 'hsl(0deg 0% 0% / 75%)',
    },
    dragHandle: {
        background: 'none',
        backgroundActive: 'hsl(0deg 0% 100% / 10%)',
        text: 'hsl(0deg 0% 100% / 90%)',
    },
} as const;

// Spacing
export const SPACING = {
    xs: '0.5rem',   // 8px
    sm: '1rem',     // 16px
    md: '1.5rem',   // 24px
    lg: '2rem',     // 32px
    imageGap: '.5rem', // 8px - gap between images in preview
} as const;

// Border radius
export const BORDER_RADIUS = {
    sm: '4px',
    pill: '1000rem',
} as const;

// Layout dimensions
export const DIMENSIONS = {
    buttonHeight: '4rem',
    buttonWidth: '4rem',
    grabHeight: '2.5rem',
    grabWidth: '2.5rem',
    aspectRatio: 9 / 16,
} as const;

// Export settings
export const EXPORT_CONFIG = {
    width: 2160,
    height: 3840,
    quality: 0.9,
    format: 'image/jpeg' as const,
    maxImages: 4,
    imageGap: 8, // Gap between images in export in pixels (proportional at 2160px width)
} as const;

// Opacity
export const OPACITY = {
    disabled: 0.5,
    active: 0.75,
    dragging: 0.5,
    emptyState: 0.5,
} as const;

// Z-Index layers
export const Z_INDEX = {
    dragHandle: 15,
    overlay: 20,
} as const;

// Inject CSS variables from TypeScript constants
export function injectCSSVariables() {
    const root = document.documentElement;

    // Colors
    root.style.setProperty('--color-bg-app', COLORS.background.app);
    root.style.setProperty('--color-bg-canvas', COLORS.background.canvas);
    root.style.setProperty('--color-text-primary', COLORS.text.primary);

    // Button Colors
    root.style.setProperty('--color-btn-primary-bg', COLORS.button.primary.background);
    root.style.setProperty('--color-btn-primary-text', COLORS.button.primary.text);
    root.style.setProperty('--color-btn-remove-bg', COLORS.button.remove.background);
    root.style.setProperty('--color-btn-remove-text', COLORS.button.remove.text);

    // Overlay
    root.style.setProperty('--color-overlay-bg', COLORS.overlay.background);

    // Drag Handle
    root.style.setProperty('--color-drag-handle-bg', COLORS.dragHandle.background);
    root.style.setProperty('--color-drag-handle-bg-active', COLORS.dragHandle.backgroundActive);
    root.style.setProperty('--color-drag-handle-text', COLORS.dragHandle.text);

    // Spacing
    root.style.setProperty('--spacing-xs', SPACING.xs);
    root.style.setProperty('--spacing-sm', SPACING.sm);
    root.style.setProperty('--spacing-md', SPACING.md);
    root.style.setProperty('--spacing-lg', SPACING.lg);
    root.style.setProperty('--image-gap', SPACING.imageGap);

    // Border Radius
    root.style.setProperty('--border-radius-sm', BORDER_RADIUS.sm);
    root.style.setProperty('--border-radius-pill', BORDER_RADIUS.pill);

    // Dimensions
    root.style.setProperty('--button-height', DIMENSIONS.buttonHeight);
    root.style.setProperty('--button-width', DIMENSIONS.buttonWidth);
    root.style.setProperty('--grab-height', DIMENSIONS.grabHeight);
    root.style.setProperty('--grab-width', DIMENSIONS.grabWidth);
    root.style.setProperty('--aspect-ratio', String(DIMENSIONS.aspectRatio));

    // Opacity
    root.style.setProperty('--opacity-disabled', String(OPACITY.disabled));
    root.style.setProperty('--opacity-active', String(OPACITY.active));
    root.style.setProperty('--opacity-dragging', String(OPACITY.dragging));
    root.style.setProperty('--opacity-empty-state', String(OPACITY.emptyState));

    // Z-Index
    root.style.setProperty('--z-index-drag-handle', String(Z_INDEX.dragHandle));
    root.style.setProperty('--z-index-overlay', String(Z_INDEX.overlay));
}
