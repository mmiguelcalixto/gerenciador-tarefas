import { TarefaController } from "./controller/tarefaController.js";
import {
  promptMenuPrincipal,
  promptCriarTarefa,
  mostrarTarefas,
  promptCompletarTarefa,
  promptRemoverTarefa,
  mostrarMensagem,
} from "./view/tarefaViews.js";

async function main() {
  const controller = new TarefaController();
  let sair = false;

  while (!sair) {
    const opcao = await promptMenuPrincipal();

    switch (opcao) {
      case "criar": {
        const dados = await promptCriarTarefa();
        try {
          await controller.adicionarNovaTarefa(dados);
          mostrarMensagem("sucesso", "Tarefa criada com sucesso!");
        } catch (err) {
          console.error(err);
          mostrarMensagem("erro", "Erro ao criar tarefa.");
        }
        break;
      }

      case "ver": {
        try {
          const tarefas = await controller.listarTodasAsTarefas();
          mostrarTarefas(tarefas);
        } catch (err) {
          console.error(err);
          mostrarMensagem("erro", "Erro ao listar tarefas.");
        }
        break;
      }

      case "completar": {
        const tarefas = await controller.listarTodasAsTarefas();
        const resposta = await promptCompletarTarefa(tarefas);
        if (resposta) {
          try {
            await controller.completarTarefa(tarefas[resposta.index].id);
            mostrarMensagem("sucesso", "Tarefa concluída com sucesso!");
          } catch (err) {
            console.error(err);
            mostrarMensagem("erro", "Erro ao concluir tarefa.");
          }
        }
        break;
      }

      case "remover": {
        const tarefas = await controller.listarTodasAsTarefas();
        const resposta = await promptRemoverTarefa(tarefas);
        if (resposta && resposta.confirmacao) {
          try {
            await controller.removerTarefa(tarefas[resposta.index].id);
            mostrarMensagem("sucesso", "Tarefa removida com sucesso!");
          } catch (err) {
            console.error(err);
            mostrarMensagem("erro", "Erro ao remover tarefa.");
          }
        }
        break;
      }

      case "sair":
        sair = true;
        mostrarMensagem("info", "Saindo do sistema...");
        break;

      default:
        break;
    }
  }
}

main();
