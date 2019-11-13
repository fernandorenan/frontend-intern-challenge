var requestUrl = "../assets/urls.json";
var request = new XMLHttpRequest();
request.open("GET", requestUrl);
request.responseType = "json";
request.send();

request.onload = function() {
  var lista = request.response;
  popularTop(lista);
};

function popularTop(jsonObj) {
  var ul = document.querySelector("#lst");

  var lista = jsonObj.sort(function(a, b) {
    return b.hits - a.hits;
  });
  var contador = 0;
  for (var i = 0; i < lista.length; i++) {
    if (i < 5) {
      var li = document.createElement("li");
      li.innerHTML = `<p><span id='short' >${
        lista[i].shortUrl
      }</span><span id='hit' >${lista[i].hits.toLocaleString(
        "pt-Br"
      )}</span></p>`;
      ul.appendChild(li);
    }

    contador += lista[i].hits;
    console.log(contador);
  }

  var contadorHit = document.querySelector("#caixa");
  contadorHit.innerHTML = `${contador.toLocaleString("pt-Br")}`;
}

document.querySelector("#btn").addEventListener("click", function() {
  var button = document.querySelector("#btn");

  var tlink = document.querySelector("#lnk");

  var encurta = `xyxyxz`;

  if (tlink.value.length === 0) {
    tlink.placeholder = "Insira um link válido";
  } else {
    tlink.value = `http://chr.dc/${encurta}`;
    button.setAttribute("value", "Copiar");
    button.setAttribute("id", "copy");
  }

  document.querySelector("#copy").addEventListener("click", function() {
    tlink.select();
    document.execCommand("Copy");
    console.log("Texto COpiado " + tlink.value);
    button.setAttribute("value", "ENCURTAR");
    button.setAttribute("id", "btn");
    tlink.value = "";
  });
});
