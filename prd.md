# PRD: Checklist Digital - Diaconia IPM

## 1. Visão Geral
Este projeto consiste na criação de uma aplicação web simples e responsiva para substituir o checklist físico/estático da equipe de diaconia. O sistema permitirá o acompanhamento em tempo real das tarefas dominicais, garantindo que nenhum procedimento seja esquecido.

## 2. Objetivos
* **Facilidade de Uso:** Interface mobile-first para ser usada no celular durante o serviço.
* **Gestão Dinâmica:** Permitir a edição de tarefas via Google Sheets sem necessidade de mexer no código.
* **Foco Dominical:** Exibir automaticamente a data do próximo domingo ou do domingo atual.

## 3. Requisitos Funcionais

### RF01: Identificação de Data Dinâmica
* O sistema deve detectar a data atual.
* **Lógica:** Se o dia atual for domingo, exibe a data de hoje. Se for qualquer outro dia, exibe a data do próximo domingo.
* **Exibição:** "Checklist Diaconia - Domingo, [Dia] de [Mês]".

### RF02: Integração com Google Sheets
* O conteúdo da checklist deve ser alimentado por uma planilha do Google publicada como CSV.
* Isso permite que o administrador adicione ou remova itens (como tarefas de Santa Ceia ou avisos específicos) diretamente na planilha.

### RF03: Lista de Tarefas Interativa
* Apresentar as tarefas divididas por horários e responsáveis (Diácono 1, 2 e 3) conforme o documento base.
* **Interação:** Checkbox clicável que risca o texto da tarefa ao ser concluída.
* **Persistência:** Utilizar `localStorage` para manter o progresso salvo caso a página do navegador seja atualizada durante o domingo.

### RF04: Links de Apoio
* Botão fixo ou link direto para o formulário oficial de contagem (Google Forms).

## 4. Requisitos Não Funcionais
* **Responsividade:** O site deve ser otimizado exclusivamente para dispositivos móveis (smartphones).
* **Performance:** Carregamento rápido mesmo em redes 3G/4G.
* **Custo Zero:** Hospedagem em plataformas gratuitas (Vercel, Netlify ou GitHub Pages).

## 5. Estrutura de Dados (Google Sheets)
Para o correto funcionamento, a planilha deve conter as seguintes colunas:
1.  **Horário:** (Ex: 08h00, 10h25).
2.  **Responsável:** (Ex: Diácono 1, Diácono 2, Apoio).
3.  **Categoria:** (Ex: Climatização, Área Interna, Audiovisual).
4.  **Tarefa:** Descrição detalhada do que deve ser feito.

## 6. Fluxo do Usuário
1.  O Diácono acessa o link da aplicação.
2.  O sistema exibe a data do domingo atual.
3.  O Diácono localiza seu bloco de tarefas (D1, D2 ou D3).
4.  À medida que realiza as tarefas (ex: "Abrir portões", "Ligar ar condicionado"), ele marca o checkbox.
5.  Ao final do culto, ele acessa o link do formulário de contagem através da própria aplicação.

---
**Status:** Pronto para Desenvolvimento.