# stkr - Vertical Image Composer PWA

A Progressive Web App for composing vertical images optimized for social media sharing.

## Features

- ✅ Select 1-4 images from device
- ✅ Drag & drop to reorder images
- ✅ Replace or remove individual images
- ✅ Export as 2160×3840 JPG
- ✅ Native share sheet integration
- ✅ PWA support (installable on iPhone)
- ✅ Portrait-only orientation
- ✅ Touch-friendly interface

## Development

### Install Dependencies
```bash
npm install
```

### Run Dev Server
```bash
npm run dev
```

The app will be available at http://localhost:5173/

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **dnd kit** - Drag and drop functionality
- **vite-plugin-pwa** - Progressive Web App support

## How It Works

1. **Image Selection**: Users can select up to 4 images via file input
2. **Reordering**: Images can be reordered by dragging (uses dnd kit sortable)
3. **Management**: Individual images can be replaced or removed
4. **Export**: Images are composed on a canvas (2160×3840px)
   - Images maintain aspect ratio
   - Scaled to fit width (2160px)
   - Stacked vertically
   - If total height > 3840px, scales down proportionally
5. **Sharing**: Uses Web Share API when available, falls back to download

## Canvas Composition Logic

- Target resolution: 2160×3840 pixels
- Images scaled to device width while maintaining aspect ratio
- Vertically stacked in order
- Background: white
- Format: JPEG (quality: 0.9)

## Browser Support

- iOS Safari (primary target)
- Chrome, Firefox, Edge (cross-browser compatible)

## PWA Configuration

The app is configured as an installable PWA with:
- Offline support via service worker
- Portrait-only orientation lock
- Custom theme color (#070d20)
- App icons (multiple sizes needed)
- Add-to-home-screen optimized

## Project Structure

```
app/
├── src/
│   ├── components/
│   │   ├── ImageItem.tsx          # Presentational image component
│   │   └── SortableImageItem.tsx  # Sortable wrapper using dnd kit
│   ├── utils/
│   │   └── imageComposer.ts       # Canvas-based image composition
│   ├── types.ts                    # TypeScript type definitions
│   ├── App.tsx                     # Main application component
│   ├── App.css                     # Application styles
│   └── main.tsx                    # Entry point
├── public/                         # Static assets
├── index.html                      # HTML template
├── vite.config.ts                  # Vite + PWA configuration
└── package.json
```

## Implementation Notes

- No custom drag appearance (uses dnd kit defaults)
- No activation constraints (immediate drag)
- Uses PointerSensor for cross-device compatibility
- Vertical list sorting strategy
- Closest center collision detection

## Next Steps

- Add PWA icons (192x192, 512x512)
- Customize styles per Figma design
- Test on physical iPhone device
- Add loading states for export
- Implement permission denial UI
- Add error boundaries
