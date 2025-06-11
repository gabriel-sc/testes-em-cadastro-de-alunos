// Testes de Componentes (exemplo simples)
function runComponentTests() {
  const resultadosDiv = document.getElementById("testes-resultados");
  resultadosDiv.innerText = "";

  testar("Form existe na página", () => {
    if (!document.getElementById("formCadastro")) throw new Error("Formulário não encontrado");
  });

  testar("Botão resetar existe", () => {
    const btns = document.querySelectorAll('button[type="button"]');
    if (btns.length === 0) throw new Error("Botão resetar não encontrado");
  });

  testar("Lista de cadastros é um div", () => {
    const lista = document.getElementById("listaCadastros");
    if (!lista || lista.tagName.toLowerCase() !== "div") throw new Error("Lista não encontrada ou tag errada");
  });
  testar("Campo de nome existe e é do tipo texto", () => {
    const nomeInput = document.getElementById("nome");
    if (!nomeInput || nomeInput.tagName.toLowerCase() !== "input" || nomeInput.type !== "text") {
      throw new Error("Campo de nome não encontrado ou não é do tipo texto");
    }
  });
  testar("Campo de e-mail existe e é do tipo email", () => {
    const emailInput = document.getElementById("email");
    if (!emailInput || emailInput.tagName.toLowerCase() !== "input" || emailInput.type !== "email") {
      throw new Error("Campo de email não encontrado ou não é do tipo email");
    }
  });
  testar("Botão de envio existe e é do tipo submit", () => {
    const submitBtn = document.querySelector('button[type="submit"]');
    if (!submitBtn) throw new Error("Botão de envio não encontrado");
  });
  testar("A lista de cadastros está visível", () => {
    const lista = document.getElementById("listaCadastros");
    const estilo = window.getComputedStyle(lista);
    if (estilo.display === "none" || estilo.visibility === "hidden") {
      throw new Error("A lista de cadastros não está visível");
    }
  });
  document.getElementById("meuInput").value = "";

}
