import { Car, Church } from 'lucide-react';

interface Props {
    onSelect: (diacono: number) => void;
}

const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Bom dia';
    if (hour >= 12 && hour < 18) return 'Boa tarde';
    return 'Boa noite';
};

const TEMPLO_DIACONOS = [
    { number: 1, description: 'Templo · Dízimos, Ofertas e Santa Ceia' },
    { number: 2, description: 'Templo · Dízimos, Ofertas e Santa Ceia' },
];

const ESTACIONAMENTO_DIACONOS = [
    { number: 3, description: 'Apoio no estacionamento' },
    { number: 4, description: 'Apoio no estacionamento' },
];

export const ScaleSelection = ({ onSelect }: Props) => {
    return (
        <div className="scale-selection">
            <h2 className="greeting">{getGreeting()}! 👋</h2>
            <p className="scale-prompt">Qual escala você vai fazer hoje?</p>

            <div className="scale-group">
                <span className="scale-group-label">
                    <Church size={16} /> Templo
                </span>
                {TEMPLO_DIACONOS.map(d => (
                    <button
                        key={d.number}
                        className="scale-option"
                        onClick={() => onSelect(d.number)}
                    >
                        <span className="scale-option-title">Diácono {d.number}</span>
                        <span className="scale-option-desc">{d.description}</span>
                    </button>
                ))}
            </div>

            <div className="scale-group">
                <span className="scale-group-label">
                    <Car size={16} /> Estacionamento
                </span>
                {ESTACIONAMENTO_DIACONOS.map(d => (
                    <button
                        key={d.number}
                        className="scale-option estacionamento"
                        onClick={() => onSelect(d.number)}
                    >
                        <span className="scale-option-title">
                            Diácono {d.number}
                            <span className="scale-badge">🚗 Estacionamento</span>
                        </span>
                        <span className="scale-option-desc">{d.description}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
