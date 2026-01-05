import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ImageItem } from './ImageItem';

interface SortableImageItemProps {
  id: string;
  preview: string;
  onRemove: () => void;
  showOverlay: boolean;
  onToggleOverlay: () => void;
}

export function SortableImageItem({ id, preview, onRemove, showOverlay, onToggleOverlay }: SortableImageItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onRemove();
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <ImageItem
        preview={preview}
        onRemove={handleRemove}
        isDragging={isDragging}
        dragListeners={listeners}
        showOverlay={showOverlay}
        onToggleOverlay={onToggleOverlay}
      />
    </div>
  );
}
