import { useState } from 'react';
import { useChecklist } from './hooks/useChecklist';
import { DateService } from './services/DateService';
import { ChecklistItemComponent } from './components/ChecklistItem';
import './index.css';

function App() {
  const { items, loading, toggleItem } = useChecklist();
  const [activeTab, setActiveTab] = useState<string>('DIÁCONO 1');

  const displayDate = DateService.getDisplayDate();

  // Extract unique responsibles for tabs, ensuring specific order if present
  const allResponsibles = Array.from(new Set(items.map(i => i.responsible))).sort();
  // We desire order: Diácono 1, Diácono 2, Diácono 3, Apoio...
  // Simple sort works for D1, D2, D3.

  const filteredItems = items.filter(item => item.responsible === activeTab);

  if (loading) {
    return <div className="loading">Carregando checklist...</div>;
  }

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.time]) {
      acc[item.time] = [];
    }
    acc[item.time].push(item);
    return acc;
  }, {} as Record<string, typeof filteredItems>);

  return (
    <div className="app-container">
      <header className="app-header">
        <img src="/logo.png" alt="Diaconia Logo" className="app-logo" />
        <div className="header-text">
          <h1>Checklist - Diaconia</h1>
          <p className="date-display">{displayDate}</p>
          {DateService.isFirstSundayOfMonth() && (
            <div className="santa-ceia-warning" style={{
              backgroundColor: '#fff3cd',
              color: '#856404',
              padding: '12px',
              borderRadius: '8px',
              marginTop: '12px',
              border: '1px solid #ffeeba',
              fontSize: '0.9rem',
              lineHeight: '1.4'
            }}>
              ⚠️ ATENÇÃO: Domingo de Santa-Ceia. Organize com os outros diáconos da escala a compra e preparação dos elementos.
            </div>
          )}
        </div>
      </header>

      <div className="tabs-container">
        {allResponsibles.map(resp => (
          <button
            key={resp}
            className={`tab-button ${activeTab === resp ? 'active' : ''}`}
            onClick={() => setActiveTab(resp)}
          >
            {resp}
          </button>
        ))}
      </div>

      <main className="checklist-list">
        {filteredItems.length === 0 ? (
          <p className="empty-state">Nenhuma tarefa para este responsável.</p>
        ) : (
          Object.entries(groupedItems).map(([time, groupItems]) => (
            <div key={time} className="time-group">
              <h3 className="time-header">🕑 {time}</h3>
              {groupItems.map(item => (
                <ChecklistItemComponent
                  key={item.id}
                  item={item}
                  onToggle={toggleItem}
                  hideTime={true}
                />
              ))}
            </div>
          ))
        )}
      </main>

      <footer className="app-footer">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSdxzCsIz0TFQDhaL4p_A8UhYktretk4hb9iDVTD3LEIjZa2Zw/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button"
        >
          Formulário de Contagem
        </a>
      </footer>
    </div>
  );
}

export default App;
