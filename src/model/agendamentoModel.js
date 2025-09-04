import { prisma } from "../utils/prisma";
import { TarefaModel } from "./tarefaModel";

export class AgendamentoModel {
  async adicionarAgendamento(tarefaId, dataLimite) {
    return await prisma.agendamento.create({
      data: {
        ...data,
        tarefaId: tarefaId,
        dataLimite: dataLimite
      }
    });
  }

  async atualizarStatusAgendamento() {
    const tarefaModel = new TarefaModel()
    const tarefas = tarefaModel.buscarTodasAsTarefas();

    tarefas.map(async tarefa => {
      if (tarefa.dataLimite > Date.now()) {
        return await prisma.tarefa.update({
          where: { id: tarefa.id },
          data: {
            ...tarefa,
            isAtrasado: true
           },
        });
      }
    });

  }
}