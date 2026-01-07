import { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon, ExportIcon, PanoramaIcon, CheckCircleIcon, XCircleIcon } from '@phosphor-icons/react';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableImageItem } from './components/SortableImageItem';
import { composeImages } from './utils/imageComposer';
import type { ImageItem } from './types';
import { EXPORT_CONFIG, injectCSSVariables } from './constants/theme';
import './App.css';

function App() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [activeOverlayId, setActiveOverlayId] = useState<string | null>(null);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [showFailOverlay, setShowFailOverlay] = useState(false);

  // Inject CSS variables on mount
  useEffect(() => {
    injectCSSVariables();
  }, []);

  // Cleanup object URLs on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, [images]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const availableSlots = EXPORT_CONFIG.maxImages - images.length;
    const filesToAdd = files.slice(0, availableSlots);

    const newImages: ImageItem[] = filesToAdd.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
    e.target.value = '';
  };

  const handleRemove = (index: number) => {
    setImages((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleRemoveAll = () => {
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDragStart = () => {
    // Close any open overlay when dragging starts
    setActiveOverlayId(null);
  };

  const handleExport = async () => {
    if (images.length === 0) return;

    setIsExporting(true);
    try {
      const blob = await composeImages(images);
      
      // Generate filename with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
      const filename = `stkr-${timestamp}.jpg`;
      
      const file = new File([blob], filename, { type: 'image/jpeg' });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Composed Image',
        });
      } else {
        // Fallback: download
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
      }
      
      // Show success overlay
      setShowSuccessOverlay(true);
      setTimeout(() => setShowSuccessOverlay(false), 2000);
    } catch (error) {
      console.error('Export failed:', error);
      // Show fail overlay
      setShowFailOverlay(true);
      setTimeout(() => setShowFailOverlay(false), 2000);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="app">
      <main className="main">
        {images.length === 0 ? (
          <div className="empty-state">
            <PanoramaIcon size={64} weight={'thin'} />
            <p>Let's stack<br />some memories</p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext items={images.map((img) => img.id)} strategy={verticalListSortingStrategy}>
              <div className="image-list">
                {images.map((image, index) => (
                  <SortableImageItem
                    key={image.id}
                    id={image.id}
                    preview={image.preview}
                    onRemove={() => handleRemove(index)}
                    showOverlay={activeOverlayId === image.id}
                    onToggleOverlay={() => setActiveOverlayId(activeOverlayId === image.id ? null : image.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </main>

      <footer className="footer">
        <div className="button-group">
          {images.length < EXPORT_CONFIG.maxImages && (
            <>
              <label className="button" htmlFor="image-input" aria-label="Add images">
                <PlusIcon size={24} />
              </label>
              <input
                id="image-input"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                disabled={images.length >= EXPORT_CONFIG.maxImages}
                style={{ display: 'none' }}
              />
            </>
          )}

          {images.length > 0 && (
            <div className="button-group">
              <button className="button" onClick={handleRemoveAll} aria-label="Remove all images">
                <TrashIcon size={24} />
              </button>
              <button
                className="button"
                onClick={handleExport}
                disabled={isExporting}
                aria-label="Export image"
              >
                <ExportIcon size={24} />
              </button>
            </div>
          )}
        </div>
      </footer>

      {showSuccessOverlay && (
        <div className="success-overlay">
          <div className="success-content">
            <CheckCircleIcon size={48} weight="fill" />
            <p>Exported!</p>
          </div>
        </div>
      )}

      {showFailOverlay && (
        <div className="fail-overlay">
          <div className="fail-content">
            <XCircleIcon size={48} weight="fill" />
            <p>Export Failed</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
