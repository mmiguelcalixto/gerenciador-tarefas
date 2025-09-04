import { prisma } from "../utils/prisma";

export class TarefaModel {
  async criarTarefa(dadosTarefa) {
    return await prisma.tarefa.create({
      data: dadosTarefa,
    });
  }

  async buscarTodasAsTarefas() {
    return await prisma.tarefa.findMany();
  }

  async atualizarTarefa(id, dadosTarefa) {
    return await prisma.customer.update({
      where: { id: id },
      data: { ...dadosTarefa },
    });
  }

  async deletarTarefa(id) {
    return await prisma.customer.delete({
      where: { id: id },
    });
  }
}