// Referências aos elementos HTML
const form = document.getElementById("formCadastro");
const lista = document.getElementById("listaCadastros");

// Função que carrega os cadastros do localStorage
function carregarCadastros() {
  lista.innerHTML = "";
  const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];

  cadastros.forEach((aluno, index) => {
    const div = document.createElement("div");
    div.className = "cadastro";
    div.innerHTML = `
      <button onclick="deletarCadastro(${index})">&times;</button>
      <p><strong>Nome:</strong> ${aluno.nome}</p>
      <p><strong>Idade:</strong> ${aluno.idade}</p>
      <p><strong>Email:</strong> ${aluno.email}</p>
    `;
    lista.appendChild(div);
  });
}

// Evento de envio do formulário
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const idade = document.getElementById("idade").value.trim();
  const email = document.getElementById("email").value.trim();

  if (nome && idade && email) {
    const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    cadastros.push({ nome, idade, email });
    localStorage.setItem("cadastros", JSON.stringify(cadastros));

    form.reset();
    carregarCadastros();
  }
});

// Função para deletar um cadastro específico
function deletarCadastro(index) {
  const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
  cadastros.splice(index, 1);
  localStorage.setItem("cadastros", JSON.stringify(cadastros));
  carregarCadastros();
}

// Função para resetar todos os cadastros
function resetarFormulario() {
  if (confirm("Tem certeza que deseja apagar todos os cadastros?")) {
    localStorage.removeItem("cadastros");
    carregarCadastros();
  }
}

