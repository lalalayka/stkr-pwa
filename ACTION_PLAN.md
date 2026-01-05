# Action Plan: Vertical Image Composer PWA

## Project Overview
Create a Progressive Web App for iPhone that allows users to select 1-4 images, arrange them vertically, and export a single 2160×3840 JPG image.

## Technical Stack
- **Framework**: React + TypeScript
- **Build Tool**: Vite
- **Drag & Drop**: dnd kit
- **PWA**: vite-plugin-pwa
- **Styling**: Custom CSS (to be adjusted later)
- **Compatibility**: Cross-browser (iOS Safari primary target)

## Implementation Plan

### Phase 1: Project Setup ✓
- [ ] Initialize Vite + React + TypeScript project
- [ ] Install dependencies:
  - `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`
  - `vite-plugin-pwa`, `workbox-window`
- [ ] Configure PWA manifest with app icons
- [ ] Set up service worker configuration
- [ ] Create basic project structure

### Phase 2: Core Components
- [ ] `App.tsx` - Main application container
- [ ] `ImageSelector.tsx` - File input for image selection
- [ ] `ImageList.tsx` - Vertical stack container
- [ ] `ImageItem.tsx` - Individual image tile with actions
- [ ] `ExportButton.tsx` - Export trigger component

### Phase 3: State Management
- [ ] Create image state (array of File objects)
- [ ] Manage image order (index-based)
- [ ] Validation logic (min 1, max 4)
- [ ] Selected image URLs for preview

### Phase 4: Image Selection & Management
- [ ] File input with multiple selection
- [ ] Add images (up to 4 max)
- [ ] Replace single image functionality
- [ ] Remove single image functionality
- [ ] Remove all images functionality

### Phase 5: Drag & Drop Reordering
- [ ] Integrate dnd kit with sortable
- [ ] Long-press to initiate drag
- [ ] Visual feedback (elevation, shadow, scale)
- [ ] Update order on drop
- [ ] Touch-friendly drag handles

### Phase 6: Image Export Engine
- [ ] Create canvas (2160×3840px)
- [ ] Load images sequentially
- [ ] Scale images to width (2160px) maintaining aspect ratio
- [ ] Stack images vertically
- [ ] Export as JPG (quality: 0.9)
- [ ] Generate blob for sharing

### Phase 7: Web Share API
- [ ] Detect Web Share API support
- [ ] Share exported image via native share sheet
- [ ] Fallback: download link if sharing not supported
- [ ] Handle share errors gracefully

### Phase 8: Error Handling & Edge Cases
- [ ] File access errors
- [ ] Unsupported image formats
- [ ] Large image handling
- [ ] Export failures
- [ ] Permission denial UI (with instructions)

### Phase 9: Accessibility & Polish
- [ ] ARIA labels for all interactive elements
- [ ] Keyboard navigation support
- [ ] Minimum 44×44px touch targets
- [ ] Loading states during export
- [ ] Success/error feedback
- [ ] VoiceOver support

### Phase 10: PWA Configuration
- [ ] iOS-specific meta tags
- [ ] Viewport configuration (portrait-only, no zoom)
- [ ] App icons (multiple sizes)
- [ ] Splash screens for iOS
- [ ] Theme color configuration
- [ ] Offline capability
- [ ] Add-to-home-screen optimization

### Phase 11: Testing & Optimization
- [ ] Test on iOS Safari
- [ ] Test on Chrome, Firefox, Edge
- [ ] Performance test with high-res images
- [ ] Memory management for large files
- [ ] Verify export quality
- [ ] Test add-to-home-screen flow

## Key Technical Decisions

### Image Composition Logic
- Images maintain aspect ratio
- Images scaled to fit width (2160px)
- Stacked vertically in order
- Final canvas height = sum of scaled image heights (max 3840px)
- If total height exceeds 3840px, scale down proportionally

### User Experience
- Simple, focused interface
- No image history/gallery
- No automatic saving
- One primary action: Export
- Clear visual feedback for all actions

## File Structure
```
/
├── public/
│   ├── icons/              # PWA icons
│   └── manifest.json       # PWA manifest
├── src/
│   ├── components/
│   │   ├── App.tsx
│   │   ├── ImageSelector.tsx
│   │   ├── ImageList.tsx
│   │   ├── ImageItem.tsx
│   │   └── ExportButton.tsx
│   ├── hooks/
│   │   └── useImageExport.ts
│   ├── utils/
│   │   └── imageComposer.ts
│   ├── styles/
│   │   └── App.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Design References
- [Main Design](https://www.figma.com/design/AxeCnUvKalTtzK2mm27KHq/stkr?node-id=0-1&p=f&m=dev)
- [Permission Denial](https://www.figma.com/design/AxeCnUvKalTtzK2mm27KHq/stkr?node-id=15-909&t=njRpBeBnM4GuRcLE-11)

## Next Steps
1. Initialize project with Vite
2. Install all required dependencies
3. Set up PWA configuration
4. Build components incrementally
5. Test and iterate
