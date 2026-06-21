import { useState, useEffect } from 'react';
import { useChecklist } from './hooks/useChecklist';
import { DateService } from './services/DateService';
import { ChecklistItemComponent } from './components/ChecklistItem';
import { Menu, type AppView } from './components/Menu';
import { ScalesView } from './components/ScalesView';
import { DoctorScalesView } from './components/DoctorScalesView';
import { ScaleSelection } from './components/ScaleSelection';
import { PeopleCounter } from './components/PeopleCounter';
import { CodigoVermelho } from './components/CodigoVermelho';
import { matchesDiacono } from './utils/diaconoFilter';
import './index.css';

const VIEW_TITLES: Record<AppView, string> = {
  'checklist': 'Checklist - Diaconia',
  'scales': 'Escalas - Diaconia',
  'doctor-scales': 'Escala de Médicos',
  'counter': 'Contador de Pessoas',
  'codigo-vermelho': '🚨 Código Vermelho',
};

function App() {
  const { items, loading, toggleItem, clearAllChecklist } = useChecklist();
  const [currentView, setCurrentView] = useState<AppView>('checklist');

  const dateKey = DateService.getDateKey();
  const SCALE_KEY = `selected_diacono_${dateKey}`;

  const [selectedDiacono, setSelectedDiacono] = useState<number | null>(() => {
    const saved = localStorage.getItem(SCALE_KEY);
    return saved ? Number(saved) : null;
  });

  useEffect(() => {
    if (selectedDiacono !== null) {
      localStorage.setItem(SCALE_KEY, String(selectedDiacono));
    }
  }, [SCALE_KEY, selectedDiacono]);

  const handleSelectScale = (diacono: number) => {
    setSelectedDiacono(diacono);
    setCurrentView('checklist');
  };

  const handleChangeScale = () => {
    localStorage.removeItem(SCALE_KEY);
    setSelectedDiacono(null);
    setCurrentView('checklist');
  };

  const displayDate = DateService.getDisplayDate();

  const filteredItems = selectedDiacono !== null
    ? items.filter(item => matchesDiacono(item.responsible, selectedDiacono))
    : [];

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.time]) {
      acc[item.time] = [];
    }
    acc[item.time].push(item);
    return acc;
  }, {} as Record<string, typeof filteredItems>);

  // Mostra a tela de seleção de escala antes da checklist
  const showSelection = currentView === 'checklist' && selectedDiacono === null;

  const renderContent = () => {
    if (showSelection) {
      return <ScaleSelection onSelect={handleSelectScale} />;
    }

    switch (currentView) {
      case 'checklist':
        return (
          <main className="checklist-list">
            <div className="active-scale-banner">
              Escala atual: <strong>Diácono {selectedDiacono}</strong>
              {(selectedDiacono === 3 || selectedDiacono === 4) && ' 🚗 Estacionamento'}
            </div>
            {filteredItems.length === 0 ? (
              <p className="empty-state">Nenhuma tarefa para esta escala.</p>
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
        );
      case 'scales':
        return (
          <main className="scales-view">
            <ScalesView />
          </main>
        );
      case 'doctor-scales':
        return (
          <main className="scales-view">
            <DoctorScalesView />
          </main>
        );
      case 'counter':
        return (
          <main className="scales-view">
            <PeopleCounter />
          </main>
        );
      case 'codigo-vermelho':
        return (
          <main className="scales-view">
            <CodigoVermelho />
          </main>
        );
    }
  };

  if (loading) {
    return <div className="loading">Carregando checklist...</div>;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-top">
          <Menu
            onNavigate={setCurrentView}
            onClear={clearAllChecklist}
            onChangeScale={handleChangeScale}
            activeView={currentView}
            hasScale={selectedDiacono !== null}
          />
          <div className="logo-container">
            <img src="/logo.png" alt="Diaconia Logo" className="app-logo" />
          </div>
          <div style={{ width: 24 }}></div> {/* Spacer to balance header */}
        </div>

        <div className="header-text">
          <h1>{showSelection ? 'Checklist - Diaconia' : VIEW_TITLES[currentView]}</h1>
          <p className="date-display">{displayDate}</p>
          {DateService.isFirstSundayOfMonth() && currentView === 'checklist' && !showSelection && (
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

      {renderContent()}

      {currentView === 'checklist' && !showSelection && (
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
      )}
    </div>
  );
}

export default App;
