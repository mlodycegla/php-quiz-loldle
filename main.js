const input = document.getElementById("input");
const upperpart = document.querySelector(".uppertext");
const champgrid = document.getElementById("champgrid");
const champlist = document.getElementById("champlist");
const submit = document.getElementById("btn");
const perfect = ["two", "two", "two", "two", "two", "two"];
let counter = 1;
let champions;
let championarray = [];

// pobiera baze bohaterow z pliku champions.json i przypisuje do zmiennej
fetch("champions.json")
  .then((response) => response.json())
  .then((json) => {
    champions = json;
  });

btn.addEventListener("click", (e) => {
  e.preventDefault();
  let val = input.value.toLowerCase();
  let champ = champions.find(
    (champions) => champions["name"].toLowerCase() === val
  );
  if (champ != undefined) {
    $.ajax({
      type: "POST",
      url: "./index.php",
      data: { action: "guess", champion: champ },
      success: (res) => {
        res = JSON.parse(res);

        // pierwsza litera jest wielka dla plci bohatera
        let gender =
          champ.gender.charAt(0).toUpperCase() + champ.gender.slice(1);
        // przelatuje przez tablice i ustawia wielkie litery dla kazdej linii
        for (let i = 0; i < champ.position.length; i++) {
          champ.position[i] =
            champ.position[i].charAt(0).toUpperCase() +
            champ.position[i].slice(1);
        }
        let positions = champ.position.join(", ");
        // przelatuje przez tablice i ustawia wielkie litery dla kazdego gatunku
        for (let i = 0; i < champ.species.length; i++) {
          champ.species[i] =
            champ.species[i].charAt(0).toUpperCase() +
            champ.species[i].slice(1);
        }
        let species = champ.species.join(", ");
        // pierwsza litera jest wielka dla typu zasobu jakiego uzywa
        let resource =
          champ.resource.charAt(0).toUpperCase() + champ.resource.slice(1);

        for (let i = 0; i < champ.range.length; i++) {
          champ.range[i] =
            champ.range[i].charAt(0).toUpperCase() + champ.range[i].slice(1);
        }
        let range = champ.range.join(", ");

        for (let i = 0; i < champ.region.length; i++) {
          champ.region[i] =
            champ.region[i].charAt(0).toUpperCase() + champ.region[i].slice(1);
        }
        let region = champ.region.join(", ");
        champgrid.innerHTML = "";
        championarray.unshift({
          avatar: `./champions/${champ.index}`,
          alt: champ.name,
          gender: gender,
          positions: positions,
          species: species,
          resource: resource,
          range: range,
          region: region,
          res: res,
        });

        championarray.forEach((e) => {
          champgrid.innerHTML += `
        <div class="champion">
            <span><img src="${e.avatar}.png" alt="${e.alt}" class="img"></span>
            <span class='${e.res[0]}'>${e.gender}</span>
            <span class='${e.res[1]}'>${e.positions}</span>
            <span class='${e.res[2]}'>${e.species}</span>
            <span class='${e.res[3]}'>${e.resource}</span>
            <span class='${e.res[4]}'>${e.range}</span>
            <span class='${e.res[5]}'>${e.region}</span>
        </div>`;
        });

        if (res.join(",") === perfect.join(",")) {
          alert("Wygrałeś");
          input.readOnly = true;
          upperpart.insertAdjacentHTML(
            "beforeend",
            "Następny bohater do zgadnięcia jutro"
          );
        }
      },
    });
    champions = champions.filter((el) => el.name !== champ.name);
    input.value = "";
    champlist.innerHTML = "";
  }
});

let alike = [];

input.addEventListener("keyup", () => {
  alike = [];
  champlist.innerHTML = "";
  let content = input.value;
  if (content === "" || content === null || content === undefined) {
    return;
  }
  champions.forEach((el) => {
    if (el.name.toLowerCase().startsWith(content.toLowerCase())) {
      alike.push({ avatar: `./champions/${el.index}.png`, champion: el.name });
    }
  });
  alike.forEach((el) => {
    champlist.innerHTML += `<li class='championsuggestion'><img src='${el.avatar}' class='championimage'></img>${el.champion}</li>`;
  });
  let suggestions = document.querySelectorAll(".championsuggestion");
  suggestions.forEach((e) => {
    e.addEventListener("click", (e) => {
      input.value = e.target.innerText;
      submit.click();
      input.value = "";
      alike = [];
      champlist.innerHTML = "";
      champions = champions.filter((el) => el.name !== e.target.innerText);
    });
  });
});

addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    submit.click();
  }
});
