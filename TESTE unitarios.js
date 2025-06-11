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
        if (!/idade/i.test(e.message)) throw e;
      }
    }
  });
  testar("Deletar cadastro com índice fora da faixa não altera lista", () => {
    resetarCadastros();
    salvarCadastro(getCadastros(), "Dany", 24, "d@email.com");
    const antes = [...getCadastros()];
    try {
      deletarCadastro(99); // índice que não existe
    } catch (_) {
      /* talvez seu código lance erro – não há problema, PROCURAR PROBLEMA QUE PODERA SER LANCADO NO CODIGO */
    }
    const depois = getCadastros();
    if (depois.length !== antes.length) throw new Error("Lista foi alterada indevidamente");
  });
  testar("Cadastros mantêm ordem de inserção", () => {
    resetarCadastros();
    const nomes = ["Fulano", "Beltrano", "Ciclano"];
    let c = getCadastros();
    nomes.forEach((n, i) => c = salvarCadastro(c, n, 20 + i, `${n}@mail.com`));
    const lidos = getCadastros().map(a => a.nome);
    if (JSON.stringify(lidos) !== JSON.stringify(nomes)) throw new Error("Ordem dos cadastros se perdeu");
  });
document.getElementById("meuInput").value = "";
}

