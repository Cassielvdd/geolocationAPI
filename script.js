// document
//   .querySelector("html")
//   .addEventListener("DOMSubtreeModified", (event) => {
//     $.getJSON("https://api.ipify.org?format=json", function (json) {
//       fetch(`http://api.ipstack.com/${json.ip}?access_key=61f1abcc454376c7aa75fbf508c9e4ce
// `)
//         .then((res) => {
//           return res.json();
//         })
//         .then((data) => {
//           document.querySelector(
//             "iframe"
//           ).src = `https://maps.google.com.br/maps?q=${data["latitude"]}, ${data["longitude"]}&output=embed&dg=oo`;
//           console.log(data["latitude"], data["longitude"]);
//         });
//     });
//   });

document.querySelector("#search").addEventListener("click", (event) => {
  event.preventDefault();
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
      document.querySelector(".close").addEventListener("click", () => {
        $(".toast").toast("hide");
      });
      //   Notification.requestPermission();
      if (data.addresses[0] == undefined) {
        //&&
        //Notification?.permission === "granted"
        $(".toast").toast("show");
      }
      console.log(
        data["addresses"][0]["latitude"],
        data["addresses"][0]["longitude"]
      );
      document.querySelector(
        "iframe"
      ).src = `https://maps.google.com.br/maps?q=${data["addresses"][0]["latitude"]}, ${data["addresses"][0]["longitude"]}&output=embed&dg=oo`;
    });
});
