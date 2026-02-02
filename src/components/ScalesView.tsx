import { useEffect, useState } from 'react';
import { SheetService, type ScalesItem } from '../services/SheetService';

export const ScalesView = () => {
    const [scales, setScales] = useState<ScalesItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadScales = async () => {
            try {
                const data = await SheetService.fetchScalesData();
                setScales(data);
            } catch (err) {
                console.error(err);
                setError('Erro ao carregar escalas. Tente novamente mais tarde.');
            } finally {
                setLoading(false);
            }
        };

        loadScales();
    }, []);

    if (loading) {
        return <div className="loading">Carregando escalas...</div>;
    }

    if (error) {
        return (
            <div className="error-message">
                <p>{error}</p>
                <p style={{ fontSize: '0.8em', marginTop: '0.5rem' }}>
                    Verifique se a aba "Escalas" está publicada no Google Sheets (Arquivo {'>'} Compartilhar {'>'} Publicar na Web).
                </p>
            </div>
        );
    }

    return (
        <div className="scales-container">
            <h2>Escala de Diáconos</h2>
            <div className="table-wrapper">
                <table className="scales-table">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Diácono 1</th>
                            <th>Diácono 2</th>
                            <th>Diácono 3</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scales.map((item, index) => (
                            <tr key={index}>
                                <td className="date-cell">{item.date}</td>
                                <td>{item.diacono1}</td>
                                <td>{item.diacono2}</td>
                                <td>{item.diacono3}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
