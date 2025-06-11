function testar(nomeDoTeste, funcaoDeTeste) {
  const resultadosDiv = document.getElementById("testes-resultados");
  try {
    funcaoDeTeste();
    resultadosDiv.innerText += `✅ ${nomeDoTeste}\n`;
  } catch (erro) {
    resultadosDiv.innerText += `❌ ${nomeDoTeste} - ${erro.message}\n`;
  }
}

document.getElementById("rodarTestesComponentBtn").addEventListener("click", () => {
  const resultadosDiv = document.getElementById("testes-resultados");
  resultadosDiv.innerText = "";
  if (typeof runComponentTests === "function") {
    runComponentTests();
  } else {
    resultadosDiv.innerText = "❌ Função runComponentTests() não encontrada!";
  }
});

document.getElementById("rodarTestesUnitBtn").addEventListener("click", () => {
  const resultadosDiv = document.getElementById("testes-resultados");
  resultadosDiv.innerText = "";
  if (typeof runUnitTests === "function") {
    runUnitTests();
  } else {
    resultadosDiv.innerText = "❌ Função runUnitTests() não encontrada!";
  }
});
