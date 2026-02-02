import Papa from 'papaparse';

export interface ChecklistItem {
  time: string;
  responsible: string;
  category: string;
  task: string;
  id: string; // Generated ID for tracking
}

// URL da planilha do Google Sheets publicada como CSV
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQiWNqcLiHoUPHEHcgJ7DfEtG3jMI3JdOCWeVxx7Qq-yjCFY3fXRLd5hcrmU1v7mjUqJpPDq81gd3na/pub?gid=0&single=true&output=csv';
const SCALES_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSeDpMeKSOHOMXQVuk-HIa0SjH5rX6_tYPr2f8Gb3E3VUsTrg9n8TwZgJoCbjLHaBRnEP96IkaCz-xP/pub?output=csv';

export interface ScalesItem {
  date: string;
  diacono1: string;
  diacono2: string;
  diacono3: string;
}

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
  },

  fetchScalesData: async (): Promise<ScalesItem[]> => {
    return new Promise((resolve, reject) => {
      Papa.parse(SCALES_CSV_URL, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const items = results.data.map((row: any) => ({
            date: row['Data'] || '',
            diacono1: row['Diácono 1'] || '',
            diacono2: row['Diácono 2'] || '',
            diacono3: row['Diácono 3'] || ''
          })).filter(item => item.date);

          resolve(items);
        },
        error: (err) => {
          console.error('Erro ao buscar escalas:', err);
          reject(err);
        }
      });
    });
  }
};
