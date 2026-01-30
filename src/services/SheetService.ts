import Papa from 'papaparse';

export interface ChecklistItem {
  time: string;
  responsible: string;
  category: string;
  task: string;
  id: string; // Generated ID for tracking
}

// URL da planilha do Google Sheets publicada como CSV
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQiWNqcLiHoUPHEHcgJ7DfEtG3jMI3JdOCWeVxx7Qq-yjCFY3fXRLd5hcrmU1v7mjUqJpPDq81gd3na/pub?output=csv';

export const SheetService = {
  fetchChecklistData: async (): Promise<ChecklistItem[]> => {
    return new Promise((resolve, reject) => {
      Papa.parse(SHEET_CSV_URL, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const items = results.data.map((row: any, index) => ({
            time: row['Horário'] || '',
            responsible: row['Responsável'] || '',
            category: row['Categoria'] || '',
            task: row['Tarefa'] || '',
            id: `task-${index}`
          })).filter(item => item.task); // Filter empty rows or rows without a task

          resolve(items);
        },
        error: (err) => {
          console.error('Erro ao buscar dados do Google Sheets:', err);
          reject(err);
        }
      });
    });
  }
};


// MOCK_DATA removed as it is no longer needed with the live spreadsheet link.
