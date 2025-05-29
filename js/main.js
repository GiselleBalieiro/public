var  usuario = (prompt("Informe seu nome:") || "Anônimo").trim();

var frase = $(".frase").text();
var numPalavras = frase.split(" ").length;

var tamanhoFrase = $("#tamanho-frase");
tamanhoFrase.text(numPalavras);

$("#campo-digitacao").on("input", function(){
  var campo = $("#campo-digitacao").val();

  var numCaracteres = campo.length;
  var numPalavras = campo.split(/\S+/).length - 1;

  $("#contador-caracteres").text(numCaracteres);
  $("#contador-palavras").text(numPalavras);

  var comparacao = frase.substr(0, campo.length);
  console.log("Digitado:" + campo);
  console.log("Frase:" + comparacao);

  if (campo == comparacao) {
    $("#campo-digitacao").addClass("borda-verde");
    $("#campo-digitacao").removeClass("borda-vermelha");
  } else {
    $("#campo-digitacao").addClass("borda-vermelha");
    $("#campo-digitacao").removeClass("borda-verde");
  }

});  

$("#campo-digitacao").on("focus", function(){
  var tempo = $("#tempo-restante").text();

  var cronometro = setInterval(function(){
    tempo --;
    var tempoRestante = $("#tempo-restante");
    tempoRestante.text(tempo);

    if(tempo < 0) {
      tempoRestante.text(0);
      $("#campo-digitacao").attr("disabled", true);
      alert ("Tempo esgotado!");
      clearInterval(cronometro);
      atualizaPlacar()

      $("#campo-digitacao").removeClass("borda-vermelha");
      $("#campo-digitacao").removeClass("borda-verde");
    }
  }, 1000);

});

var tempoInicial = $("#tempo-restante").text();
$("#botao-reiniciar").on("click", function(){
  usuario = (prompt("Informe seu nome:") || "Anônimo").trim();
  
  $("#campo-digitacao").attr("disabled", false);
  $("#campo-digitacao").val("");
  $("#tamanho-frase").text(numPalavras);
  $("#tempo-restante").text(tempoInicial);
  $("#contador-caracteres").text(0);
  $("#contador-palavras").text(0);

});

function atualizaPlacar() {
  var corpoTabela = $("#placar"); 
  

  var  numPalavras = $("#contador-palavras").text();

  var linha = novaLinha(usuario, numPalavras);
  linha.find(".botao-remover").click(removeLinha);

  corpoTabela.append(linha);

  console.log(linha);
};


function novaLinha (usuario, palavras) {
  var linha = $("<tr>");
  var colunaUsuario = $("<td>").text(usuario);
  var colunaPalavras = $("<td>").text(palavras);
  var colunaRemover = $("<td>");

  var link = $("<a>").attr("href", "#").addClass("botao-remover");
  var icone = $("<i>").addClass("material-icons").text("delete"); 

  link.append(icone);
  colunaRemover.append(link);

  linha.append(colunaUsuario);
  linha.append(colunaPalavras);
  linha.append(colunaRemover);

  return linha;

}
function removeLinha(event){
    event.preventDefault();
    $(this).parent().parent().remove();
    
};

