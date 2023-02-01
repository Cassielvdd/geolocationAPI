document.querySelector("#my-loc").addEventListener("click", () => {
  $.getJSON("https://api.ipify.org?format=json", function (json) {
    fetch(
      `http://api.ipstack.com/${json.ip}?access_key=61f1abcc454376c7aa75fbf508c9e4ce `
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        document.querySelector(
          "iframe"
        ).src = `https://maps.google.com.br/maps?q=${data["latitude"]}, ${data["longitude"]}&output=embed&dg=oo`;
        console.log(data["latitude"], data["longitude"]);
      });
  });
});

function rodatudo() {
  //Consumo da API que pega a Geolocalização do Usúario
  const valuefor = document.querySelector("#buscar").value;
  const url = `https://api.radar.io/v1/search/autocomplete?query=${valuefor}`;

  const options = {
    headers: {
      Authorization: "prj_live_sk_9295b7f259672731ee4254106f9d9bebf7532211",
    },
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      //abaixo um codigo Jquery para ativar a notificação BOOTSTRAP quando da erro
      document.querySelector(".close").addEventListener("click", () => {
        $(".toast").toast("hide");
      });

      if (data.addresses[0] == undefined) {
        $(".toast").toast("show");
      }
      //abaixo está o codigo que muda a URL do iframe do google maps para pegar os dados que vem das APIs
      document.querySelector(
        "iframe"
      ).src = `https://maps.google.com.br/maps?q=${data["addresses"][0]["latitude"]}, ${data["addresses"][0]["longitude"]}&output=embed&dg=oo`;
    });
}
//events
document.querySelector("#search").addEventListener("click", (event) => {
  event.preventDefault();
  rodatudo();
});
document.querySelector("#buscar").addEventListener("keyup", (e) => {
  if (e.code == "Enter") {
    rodatudo();
  }
});
