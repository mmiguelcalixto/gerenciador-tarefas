import { prisma } from "../utils/prisma.js";

export class TarefaModel {
  async criarTarefa(dadosTarefa) {
    return await prisma.tarefa.create({
      data: dadosTarefa,
    });
  }

  async buscarTodasAsTarefas() {
    return await prisma.tarefa.findMany();
  }

  async getById(id) {
    return await prisma.tarefa.findUnique({
      where: { id: id},
    });
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