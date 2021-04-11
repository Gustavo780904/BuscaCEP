$(document).ready(function () {

    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#rua").val("");
        $("#bairro").val("");
        $("#cidade").val("");
        $("#uf").val("");
        $("#ibge").val("");
    }

    //Quando o campo cep perde o foco.
    $("#cep").blur(function () {

        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#rua").val("...");
                $("#bairro").val("...");
                $("#cidade").val("...");
                $("#uf").val("...");
                $("#ibge").val("...");

                //Consulta o webservice viacep.com.br/
                let cliente = $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {
                    enderecoCliente = cliente.responseJSON
                    console.log(enderecoCliente);
                    //leitura do nome para add ao json

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#rua").val(dados.logradouro);
                        $("#bairro").val(dados.bairro);
                        $("#cidade").val(dados.localidade);
                        $("#uf").val(dados.uf);
                        $("#ibge").val(dados.ibge);


                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep();
                        alert("CEP não encontrado.");
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    });

});
function addNome() {
    nome = document.getElementById("nomeCliente").value
    enderecoCliente.nome = document.getElementById("nomeCliente").value
    console.log(enderecoCliente);
    localStorage.setItem(document.getElementById("nomeCliente").value, JSON.stringify(enderecoCliente));
}

function mostrarClientes(selecao, exibeTabela) {
    // var file = "https://github.com/Gustavo780904/BuscaCEP/blob/master/json/clientes.json"
    let file = "json/clientes.json";
    $.get(file, function(data) {
        mostrarInformacoesClientes(selecao, exibeTabela)
        createRecipes(data);
    });
}
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (xhttp.status == 200 && xhttp.readyState == 4)
            
//     }
//     xhttp.open("GET", file, true)
//     xhttp.send()
// }
// $.get("https://github.com/Gustavo780904/BuscaCEP/blob/master/json/clientes.json", function(data) {
//     $( ".result" ).html( data );
//     alert( "Load was performed." );
//   });
// function escondeInput() {
//     $("#mostra")(function  () {
//         $("input").fadeOut();
//     });
// }
// function mostraInput() {
//     $("#mostra")(function(){
//         $("input").fadeIn();
//       });
// }
function mostrarInformacoesClientes(xhttp, selecaoPor, exibeTabela) {
    let tab = document.getElementById(exibeTabela)
    let selecaoPor = document.getElementById("selecao")

    if (selecaoPor == "cep" || selecaoPor == "nome") {
        selecaoPor = document.getElementById("cepNome").value
        // mostraInput()
    }
    lista = JSON.parse(xhttp.responseText)
    document.querySelectorAll("table tbody tr").forEach(function (line) { line.remove() })
    lista.clientes.forEach(enderecoCliente => {
        if ((enderecoCliente.cep == selecaoPor.value) || enderecoCliente.nome == selecaoPor.value || (selecaoPor.selectedIndex == 0)) {

            var linhaTab = document.createElement("tr")
            var colNome = document.createElement("td")
            var colCep = document.createElement("td")
            var colRua = document.createElement("td")
            var colBairro = document.createElement("td")
            var colCidade = document.createElement("td")
            var colEstado = document.createElement("td")
            var colIbge = document.createElement("td")
            customersNome = document.createTextNode(enderecoCliente.nome)
            customersCep = document.createTextNode(enderecoCliente.cep)
            customersRua = document.createTextNode(enderecoCliente.rua)
            customersBairro = document.createTextNode(enderecoCliente.bairro)
            customersCidade = document.createTextNode(enderecoCliente.cidade)
            customersEstado = document.createTextNode(enderecoCliente.estado)
            customersIbge = document.createTextNode(enderecoCliente.ibge)
            colNome.appendChild(customerNome)
            colCep.appendChild(customerCep)
            colRua.appendChild(customerRua)
            colBairro.appendChild(customerBairro)
            colCidade.appendChild(customerCidade)
            colEstado.appendChild(customerEstado)
            colIbge.appendChild(customerIbge)
            linhaTab.appendChild(colNome)
            linhaTab.appendChild(colCep)
            linhaTab.appendChild(colRua)
            linhaTab.appendChild(colBairro)
            linhaTab.appendChild(colCidade)
            linhaTab.appendChild(colEstado)
            linhaTab.appendChild(colIbge)
            tab.appendChild(linha)
        }
    })
}
