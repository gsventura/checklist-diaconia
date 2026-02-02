import { useState, useEffect } from 'react';
import { SheetService, type ChecklistItem } from '../services/SheetService';
import { DateService } from '../services/DateService';

export interface ChecklistItemWithState extends ChecklistItem {
    checked: boolean;
}

export const useChecklist = () => {
    const [items, setItems] = useState<ChecklistItemWithState[]>([]);
    const [loading, setLoading] = useState(true);

    const dateKey = DateService.getDateKey();
    const STORAGE_KEY = `checklist_state_${dateKey}`;

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await SheetService.fetchChecklistData();

                // Load saved state
                const savedState = localStorage.getItem(STORAGE_KEY);
                const checkedMap: Record<string, boolean> = savedState ? JSON.parse(savedState) : {};

                const itemsWithState = data.map(item => ({
                    ...item,
                    checked: !!checkedMap[item.id]
                }));

                setItems(itemsWithState);
            } catch (error) {
                console.error("Failed to load checklist data", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [STORAGE_KEY]);

    const toggleItem = (id: string) => {
        setItems(prev => {
            const newItems = prev.map(item =>
                item.id === id ? { ...item, checked: !item.checked } : item
            );

            // Save to local storage
            const checkedMap = newItems.reduce((acc, item) => {
                if (item.checked) acc[item.id] = true;
                return acc;
            }, {} as Record<string, boolean>);

            localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedMap));

            return newItems;
        });
    };

    const getGroupedItems = () => {
        // Group by Responsible
        const groups: Record<string, ChecklistItemWithState[]> = {};
        items.forEach(item => {
            if (!groups[item.responsible]) {
                groups[item.responsible] = [];
            }
            groups[item.responsible].push(item);
        });
        return groups;
    };

    const clearAllChecklist = () => {
        if (window.confirm("Tem certeza que deseja limpar todos os itens verificados?")) {
            setItems(prev => prev.map(item => ({ ...item, checked: false })));
            localStorage.removeItem(STORAGE_KEY);
        }
    };

    return { items, loading, toggleItem, getGroupedItems, clearAllChecklist };
};
