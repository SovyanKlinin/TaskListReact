import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { faArrowsUpDownLeftRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SortableItemProps {
  id: number;
}

export const SortableItem: React.FC<React.PropsWithChildren<SortableItemProps>> = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="task-list__item"
    >
      <div {...listeners} className="drag-handle">
        <FontAwesomeIcon icon={faArrowsUpDownLeftRight} />
      </div>
      {children}
    </div>
  );
};