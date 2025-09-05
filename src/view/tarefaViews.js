import inquirer from "inquirer"

export async function promptMenuPrincipal() {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "opcao",
        message: "Escolha uma opção:",
        choices: [
          { name: "Criar tarefa", value: "criar" },
          { name: "Ver tarefas", value: "ver" },
          { name: "Completar tarefa", value: "completar" },
          { name: "Remover tarefa", value: "remover" },
          { name: "Sair", value: "sair" },
        ],
      },
    ])
    .then((resposta) => resposta.opcao);
}

export async function promptCriarTarefa() {
  return inquirer.prompt([
    {
      type: "input",
      name: "titulo",
      message: "Digite o título da tarefa:",
      validate: (input) => {
        if (input.trim() === "") return "O título não pode ser vazio.";
        return true;
      },
    },
    {
      type: "input",
      name: "descricao",
      message: "Digite a descrição da tarefa:",
    },
    {
      type: "input",
      name: "dataLimite",
      message: "Digite o prazo (AAAA-MM-DD):",
      validate: (input) => {
        const regexData = /^\d{4}-\d{2}-\d{2}$/;
        if (!regexData.test(input)) return "Formato inválido. Use AAAA-MM-DD.";
        return true;
      },
    },
  ]);
}

export function mostrarTarefas(tarefas) {
  if (tarefas.length === 0) {
    console.log("\n⚠️ Nenhuma tarefa encontrada.\n");
    return;
  }

  console.log("\n📋 Lista de tarefas:");
  tarefas.forEach((tarefa, index) => {
    console.log(
      `${index + 1}. ${tarefa.titulo}\n   Descrição: ${
        tarefa.descricao
      }`
    );
  });
}

export async function promptCompletarTarefa(tarefas) {
  if (tarefas.length === 0) {
    console.log("\n⚠️ Nenhuma tarefa para completar.\n");
    return null;
  }

  return inquirer.prompt([
    {
      type: "list",
      name: "index",
      message: "Selecione a tarefa a completar:",
      choices: tarefas.map((t, i) => ({
        name: `${t.titulo} (${t.concluida ? "✅ já concluída" : "pendente"})`,
        value: i,
      })),
    },
  ]);
}

export async function promptRemoverTarefa(tarefas) {
  if (tarefas.length === 0) {
    console.log("\n⚠️ Nenhuma tarefa para remover.\n");
    return null;
  }

  return inquirer.prompt([
    {
      type: "list",
      name: "index",
      message: "Selecione a tarefa a remover:",
      choices: tarefas.map((t, i) => ({
        name: `${t.titulo}`,
        value: i,
      })),
    },
    {
      type: "confirm",
      name: "confirmacao",
      message: "Tem certeza que deseja remover essa tarefa?",
      default: false,
    },
  ]);
}

export function mostrarMensagem(tipo, mensagem) {
  const simbolos = {
    sucesso: "✅",
    erro: "❌",
    info: "ℹ️",
  };
  console.log(`\n${simbolos[tipo] || ""} ${mensagem}\n`);
}
