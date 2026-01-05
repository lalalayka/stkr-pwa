import React from 'react';
import { TrashIcon, DotsSixVerticalIcon } from '@phosphor-icons/react';
import './ImageItem.css';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

interface ImageItemProps {
  preview: string;
  onRemove?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  isDragging?: boolean;
  dragListeners?: SyntheticListenerMap;
  showOverlay: boolean;
  onToggleOverlay: () => void;
}

export const ImageItem = React.forwardRef<HTMLDivElement, ImageItemProps>(
  ({ preview, onRemove, style, isDragging, dragListeners, showOverlay, onToggleOverlay, ...props }, ref) => {

    const handleImageClick = (e: React.MouseEvent) => {
      if (!isDragging) {
        e.stopPropagation();
        onToggleOverlay();
      }
    };

    const handleRemoveClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onRemove) {
        onRemove(e);
      }
    };

    return (
      <div
        ref={ref}
        className={`image-item ${isDragging ? 'dragging' : ''}`}
        style={style}
        {...props}
      >
        <img 
          src={preview} 
          alt="Selected" 
          onClick={handleImageClick}
          style={{ cursor: showOverlay ? 'pointer' : 'default' }}
        />
        <div 
          className="image-item-drag-handle"
          {...dragListeners}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <DotsSixVerticalIcon size={24} />
        </div>
        {onRemove && showOverlay && (
          <div 
            className="image-item-overlay"
            onClick={handleImageClick}
          >
            <button
              className="image-item-remove-button"
              onClick={handleRemoveClick}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              aria-label="Remove image"
            >
              <div className="icon"><TrashIcon size={24} /></div>
              <span>Remove</span>
            </button>
          </div>
        )}
      </div>
    );
  }
);

ImageItem.displayName = 'ImageItem';
