import { useEffect, useState } from 'react';
import { Minus, RotateCcw, Copy, Check } from 'lucide-react';
import { DateService } from '../services/DateService';

type Tab = 'adults' | 'children';

export const PeopleCounter = () => {
    const dateKey = DateService.getDateKey();
    const STORAGE_KEY = `people_counter_${dateKey}`;

    const loadSaved = (): { adults: number; children: number } => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const { adults: a, children: c } = JSON.parse(saved);
                return { adults: a || 0, children: c || 0 };
            } catch {
                // ignore corrupt data
            }
        }
        return { adults: 0, children: 0 };
    };

    const [adults, setAdults] = useState(() => loadSaved().adults);
    const [children, setChildren] = useState(() => loadSaved().children);
    const [tab, setTab] = useState<Tab>('adults');
    const [copied, setCopied] = useState(false);

    // Persist counts
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ adults, children }));
    }, [STORAGE_KEY, adults, children]);

    const count = tab === 'adults' ? adults : children;
    const setCount = tab === 'adults' ? setAdults : setChildren;

    const increment = () => setCount(c => c + 1);
    const decrement = () => setCount(c => Math.max(0, c - 1));
    const reset = () => {
        if (window.confirm(`Zerar a contagem de ${tab === 'adults' ? 'adultos' : 'crianças'}?`)) {
            setCount(0);
        }
    };

    const copyText = `Adultos: ${adults} | Crianças: ${children}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(copyText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            window.prompt('Copie o texto abaixo:', copyText);
        }
    };

    return (
        <div className="counter-container">
            <div className="counter-tabs">
                <button
                    className={`counter-tab ${tab === 'adults' ? 'active' : ''}`}
                    onClick={() => setTab('adults')}
                >
                    🧑 Adultos
                </button>
                <button
                    className={`counter-tab ${tab === 'children' ? 'active' : ''}`}
                    onClick={() => setTab('children')}
                >
                    🧒 Crianças
                </button>
            </div>

            <button className="counter-tap" onClick={increment} aria-label="Adicionar uma pessoa">
                <span className="counter-value">{count}</span>
                <span className="counter-hint">Toque para somar</span>
            </button>

            <div className="counter-actions">
                <button className="counter-action" onClick={decrement}>
                    <Minus size={20} />
                    <span>Voltar 1</span>
                </button>
                <button className="counter-action danger" onClick={reset}>
                    <RotateCcw size={20} />
                    <span>Zerar</span>
                </button>
            </div>

            <div className="counter-summary">
                <p className="counter-summary-text">{copyText}</p>
                <button className="counter-copy" onClick={handleCopy}>
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                    <span>{copied ? 'Copiado!' : 'Copiar resultado'}</span>
                </button>
            </div>
        </div>
    );
};
