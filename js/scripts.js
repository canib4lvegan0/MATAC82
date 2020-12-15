var numResult = 0;
// localStorage.setItem("searchToShow", -1); // save
// var searchToShow = -1;


// Scripts referentes ao destaque das polaroides/imagens

function highlightImg(el) {
    el.style.boxShadow = "0 4px 20px 0 white";
}

function resetImg(el) {
    el.style.boxShadow = "0 4px 10px 0 #201818";
}



/* Scripts to Search and Mapping */

/* Generate a random number to simulate numbers of the search result */
function generateResults() {
    return Math.floor(Math.random() * 10);
}

/* Build search result */
function searchResult() {
    var str = document.getElementById("str-search").value;
    var len = str.length;


    if (len > 3) { // In this case, string <= 3  it's not a valid search.
        numResult = generateResults();
        localStorage.setItem("results", numResult); // save in cache
        localStorage.setItem("searchToShow", 1); // save
        // searchResult = 1;
        // console.log("Gerando " + numResult + " resultados de busca!");
    } else
        alert("Nenhum resultado encontrado!");
}

/* Show message to map loaded */
function msgLoadMap() {
    alert("O mapa foi carregado e está pronto para sua busca!");
}

/* Load table with search results */
function loadTable() {
    var linePt1 = "<tr id='loaded-table' class='test'><td><a href=''>Comunidade ";
    var linePt2 = "</a></td><td>Território ";
    var linePt3 = "</td><td>";
    var linePt4 = "</td><td>Município ";
    var linePt5 = "</td></tr>";
    var fullLine = "";

    var hd = document.getElementById("hd-table");
    var n = localStorage.getItem("results"); // get it from the cache
    var s = localStorage.getItem("searchToShow"); // get it

    switch (s) {
        case "0": // results already shown
            if (confirm("Tabela já carregada!\nDeseja limpar resultados?")) {
                for (i = 1; i <= n; i++) {
                    document.getElementById('loaded-table').remove();
                    console.log(i);
                }
            }
            localStorage.setItem("searchToShow", -1);
            break;

        case "1": // show results
            for (i = 1; i <= n; i++) {
                fullLine += linePt1 + i;
                fullLine += linePt2 + i;
                fullLine += linePt3 + (i * 100);
                fullLine += linePt4 + i;
                fullLine += linePt5;
                hd.insertAdjacentHTML("afterend", fullLine);
                fullLine = "";
            }
            localStorage.setItem("searchToShow", 0);
            break;

        default: // no results to show
            alert("Sem resultados para exibir!");
    }
}

// function cleanTable() {}


/* Scripts to Contact Form */

/* Show appropriate message for each type of contact */
function msgContact() {
    var msg = "";
    var other = "";
    var name = document.getElementById("name").value;
    var reason = document.getElementById("reason").value;

    if (reason === "Denúncia") {
        msg = "Por ser uma denúncia, entraremos em contato o mais breve possível.\n";
        msg += "Deseja confirmar o motivo 'Denúncia'?"

        if (!confirm(msg)) {
            alert("Voltar para página principal.");
            return;
        }
    } else if (reason === "Outro") {
        msg = "Você especificou 'Outro' motivo. Qual seria?";
        do {
            other = prompt(msg)
        } while (other.length < 1);
        console.log(other);
    }
    msg = "Obrigado por entrar em contato conosco, " + name + "!";
    alert(msg);
}

/* Upper current key */
function upperTransform(inp) {
    inp.value = inp.value.toUpperCase();
}

/* Show message to use Datalist" */
function dontType(inp) {
    alert("Por favor, não digite. Selecione uma das opções");
    inp.value = '';
}

/* Validate current key input. Only letters are allowed */
function validationName(inp) {
    var len = inp.value.length;
    if ((len > 0) && (!isLetter(inp.value[len - 1]))) {
        alert("Caratere inválido. Favor, digite apenas letras.");
        inp.value = '';
    }
}

/* Check is c is a letter */
function isLetter(c) {
    return c.match(/[a-zA-Z]/);
}