// Testes Unitários (funcionalidades do cadastro)
function runUnitTests() {
  const resultadosDiv = document.getElementById("testes-resultados");
  resultadosDiv.innerText = "";

  testar("Salvar cadastro adiciona novo aluno", () => {
    resetarCadastros();
    let cadastros = getCadastros();
    cadastros = salvarCadastro(cadastros, "Teste", 20, "teste@email.com");
    if (cadastros.length !== 1) throw new Error("Cadastro não foi adicionado");
  });

  testar("Deletar cadastro remove o aluno correto", () => {
    resetarCadastros();
    let cadastros = getCadastros();
    cadastros = salvarCadastro(cadastros, "Aluno 1", 21, "a1@email.com");
    cadastros = salvarCadastro(cadastros, "Aluno 2", 22, "a2@email.com");
    deletarCadastro(0);
    cadastros = getCadastros();
    if (cadastros.length !== 1) throw new Error("Cadastro não foi deletado");
    if (cadastros[0].nome !== "Aluno 2") throw new Error("Cadastro errado deletado");
  });

  testar("Resetar cadastros limpa todos", () => {
    salvarCadastro(getCadastros(), "Aluno", 25, "aluno@email.com");
    resetarCadastros();
    const cadastros = getCadastros();
    if (cadastros.length !== 0) throw new Error("Cadastros não foram resetados");
  });

  testar("Salvar cadastro rejeita idade ≤ 0", () => {
    resetarCadastros();
    for (const idade of [0, -1]) {
      try {
        salvarCadastro(getCadastros(), "Carlos", idade, "c@email.com");
        throw new Error("Idade inválida foi aceita");
      } catch (e) {
        if (!/idade/i.test(e.message.toLowerCase())) throw e;
      }
    }
  });

  testar("Deletar cadastro com índice fora da faixa não altera lista", () => {
    resetarCadastros();
    salvarCadastro(getCadastros(), "Rodando Teste", 24, "teste@email.com");
    const antes = [...getCadastros()];
    try {
      deletarCadastro(99); // índice que não existe
    } catch (_) {
      // Ignorar erro esperado
    }
    const depois = getCadastros();
    if (depois.length !== antes.length) throw new Error("Lista foi alterada indevidamente");
  });
  testar("Cadastro armazena corretamente os dados", () => {
    resetarCadastros();
    const nome = "Joana";
    const idade = 30;
    const email = "joana@email.com";
    salvarCadastro(getCadastros(), nome, idade, email);
    const [cadastro] = getCadastros();
    if (cadastro.nome !== nome || cadastro.idade !== idade || cadastro.email !== email) {
      throw new Error("Dados salvos incorretamente");
    }
  });
   testar("Salvar vários cadastros mantém todos", () => {
    resetarCadastros();
    salvarCadastro(getCadastros(), "Aluno 1", 20, "a1@email.com");
    salvarCadastro(getCadastros(), "Aluno 2", 21, "a2@email.com");
    salvarCadastro(getCadastros(), "Aluno 3", 22, "a3@email.com");
    const cadastros = getCadastros();
    if (cadastros.length !== 3) throw new Error("Nem todos os cadastros foram mantidos");
  });
    testar("Resetar após múltiplos cadastros realmente limpa", () => {
    resetarCadastros();
    for (let i = 0; i < 10; i++) {
      salvarCadastro(getCadastros(), `Aluno ${i}`, 20 + i, `a${i}@email.com`);
    }
    resetarCadastros();
    const cadastros = getCadastros();
    if (cadastros.length !== 0) throw new Error("Reset não limpou todos os cadastros");
  });
}

// Botão que executa os testes
document.getElementById("rodarTestesUnitBtn").addEventListener("click", runUnitTests);
