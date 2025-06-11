const form = document.getElementById("formCadastro");
const lista = document.getElementById("listaCadastros");

// Função que carrega os cadastros do localStorage
function carregarCadastros() {
  lista.innerHTML = "";
  const cadastros = getCadastros();

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

// Recupera os cadastros do localStorage
function getCadastros() {
  return JSON.parse(localStorage.getItem("cadastros")) || [];
}

// Salva um novo cadastro
function salvarCadastro(cadastros, nome, idade, email) {
  cadastros.push({ nome, idade, email });
  localStorage.setItem("cadastros", JSON.stringify(cadastros));
  return cadastros;
}

// Deleta um cadastro específico
function deletarCadastro(index) {
  const cadastros = getCadastros();
  cadastros.splice(index, 1);
  localStorage.setItem("cadastros", JSON.stringify(cadastros));
  carregarCadastros();
}

// Reseta todos os cadastros
function resetarFormulario() {
  if (confirm("Tem certeza que deseja apagar todos os cadastros?")) {
    localStorage.removeItem("cadastros");
    carregarCadastros();
  }
}
function resetarCadastros() {
  localStorage.removeItem("cadastros");
}
// Função para testes
function testar(nomeDoTeste, funcaoDeTeste) {
  const resultadosDiv = document.getElementById("testes-resultados");
  try {
    funcaoDeTeste();
    resultadosDiv.innerText += `✅ ${nomeDoTeste}\n`;
  } catch (erro) {
    resultadosDiv.innerText += `❌ ${nomeDoTeste} - ${erro.message}\n`;
  }
}

// Evento de envio do formulário
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const idade = document.getElementById("idade").value.trim();
  const email = document.getElementById("email").value.trim();

  if (nome && idade && email) {
    const cadastros = getCadastros();
    salvarCadastro(cadastros, nome, idade, email);
    form.reset();
    carregarCadastros();
  }
});

// Carrega cadastros ao abrir a página
window.onload = carregarCadastros;