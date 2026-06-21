/**
 * Decide se um item da checklist deve aparecer para o diácono selecionado.
 *
 * Regras (baseadas na coluna "Responsável" da planilha):
 *  - Diáconos 1 e 2 (templo): veem suas próprias tarefas, as compartilhadas
 *    entre 1 e 2 (ex.: "DIÁCONOS 1 e 2"), e as gerais sem número
 *    (ex.: "DIÁCONOS" — dízimos/ofertas/formulário). A categoria de Santa Ceia
 *    já é atribuída a eles na planilha.
 *  - Diáconos 3 e 4 (estacionamento): veem apenas as tarefas de apoio ao
 *    estacionamento, ou seja, responsáveis que referenciam o diácono 3 ou 4.
 */
export const matchesDiacono = (responsible: string, selected: number): boolean => {
    const digits = (responsible.match(/\d+/g) || []).map(Number);

    // Diáconos do estacionamento: somente tarefas que referenciam 3 ou 4.
    if (selected === 3 || selected === 4) {
        return digits.includes(3) || digits.includes(4);
    }

    // Diáconos 1 e 2: tarefa própria, compartilhada (contém o número) ou geral (sem número).
    return digits.length === 0 || digits.includes(selected);
};
