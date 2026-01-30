import React from 'react';
import type { ChecklistItemWithState } from '../hooks/useChecklist';

interface Props {
    item: ChecklistItemWithState;
    onToggle: (id: string) => void;
    hideTime?: boolean;
}

export const ChecklistItemComponent: React.FC<Props> = ({ item, onToggle, hideTime }) => {
    return (
        <div
            className={`checklist-item ${item.checked ? 'checked' : ''}`}
            onClick={() => onToggle(item.id)}
        >
            <div className="checkbox-container">
                <input
                    type="checkbox"
                    checked={item.checked}
                    readOnly
                />
                <span className="checkmark"></span>
            </div>
            <div className="content">
                {!hideTime && <span className="time">🕑 {item.time}</span>}
                <span className="category">{item.category}</span>
                <p className="task-text">{item.task}</p>
            </div>
        </div>
    );
};
