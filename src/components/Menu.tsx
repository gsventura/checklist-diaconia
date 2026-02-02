import { Menu as MenuIcon, X, Calendar, ClipboardCheck, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface MenuProps {
    onNavigate: (view: 'checklist' | 'scales') => void;
    onClear: () => void;
    activeView: 'checklist' | 'scales';
}

export const Menu = ({ onNavigate, onClear, activeView }: MenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleNavigate = (view: 'checklist' | 'scales') => {
        onNavigate(view);
        setIsOpen(false);
    };

    const handleClear = () => {
        onClear();
        setIsOpen(false);
    };

    return (
        <>
            <button
                className="menu-button"
                onClick={() => setIsOpen(true)}
                aria-label="Abrir menu"
            >
                <MenuIcon size={24} color="#333" />
            </button>

            {isOpen && (
                <div className="menu-overlay" onClick={() => setIsOpen(false)}>
                    <div className="menu-content" onClick={e => e.stopPropagation()}>
                        <div className="menu-header">
                            <h2>Menu</h2>
                            <button
                                className="close-button"
                                onClick={() => setIsOpen(false)}
                                aria-label="Fechar menu"
                            >
                                <X size={24} color="#333" />
                            </button>
                        </div>

                        <nav className="menu-items">
                            <button
                                className={`menu-item ${activeView === 'checklist' ? 'active' : ''}`}
                                onClick={() => handleNavigate('checklist')}
                            >
                                <ClipboardCheck size={20} />
                                <span>Checklist</span>
                            </button>

                            <button
                                className={`menu-item ${activeView === 'scales' ? 'active' : ''}`}
                                onClick={() => handleNavigate('scales')}
                            >
                                <Calendar size={20} />
                                <span>Escalas</span>
                            </button>

                            <div className="menu-divider"></div>

                            <button
                                className="menu-item delete-action"
                                onClick={handleClear}
                            >
                                <Trash2 size={20} />
                                <span>Limpar Checklist</span>
                            </button>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};
