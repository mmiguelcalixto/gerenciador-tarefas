import { TarefaModel } from "../model/tarefaModel.js";
import { AgendamentoModel } from "../model/agendamentoModel.js";

export class TarefaController {
  tarefaModel = new TarefaModel();
  agendamentoModel = new AgendamentoModel();

  async adicionarNovaTarefa(dados) {
    const tarefa = await this.tarefaModel.criarTarefa({
      titulo: dados.titulo,
      descricao: dados.descricao,
      isComplete: dados.isComplete,
      dataCriacao: dados.dataCriacao,
    });
    return await this.agendamentoModel.adicionarAgendamento(tarefa.id, dados.dataLimite);
  }

  async listarTodasAsTarefas() {
    await agendamentoModel.atualizarStatusAgendamento();

    return await this.tarefaModel.buscarTodasAsTarefas();
  }

  async completarTarefa(id) {
    const tarefa = this.tarefaModel.getById(id)
    tarefa.isComplete = true;

    return await this.tarefaModel.atualizarTarefa(id, tarefa);
  }

  async removerTarefa(id) {
    return await this.tarefaModel.deletarTarefa(id);
  }
}