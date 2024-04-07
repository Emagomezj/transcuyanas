/************ Declaración de Constantes ***************/

const card_act_div = document.querySelector(".cards_div");
const card_staff_div = document.querySelector(".cards_div_staff");

const flecha_izq_i = document.querySelector(".flecha_izq_i");
const flecha_der_i = document.querySelector(".flecha_der_i");

/****************** Declaración de Funciones *******************/

const hWheel = (event) => {
  // Evitar el comportamiento predeterminado de la rueda del mouse
  event.preventDefault();

  // Determinar la dirección del desplazamiento
  const delta = Math.sign(event.deltaY);

  // Ajustar el desplazamiento horizontal
  card_act_div.scrollLeft += delta * 40; // Puedes ajustar el valor según tu preferencia
};
/****************** Fetch Data *******************/

const fetch_data = async () => {
  const response = await fetch("../json/data.json");
  const data = await response.json();
  return data;
};

const data = await fetch_data();

/***************** Filtros Data ******************/

const actrices = data.filter((element) => element.rol === "actriz");
const staff = data.filter((element) => element.rol === "staff");

/***************** Render Cards_Divs ********************/

/* Actrices */

actrices.forEach((element) => {
  card_act_div.innerHTML += `<div id= "${element.id}" class="cardProfile">
    <div class="cp_front">
      <img
        class="cp_profilePic"
        src= ${element.profile_pic}
        alt="profile pic"
      />
      <p class="cp_profileName">${element.nickname}</p>
    </div>
    <div class="cp_overlay">
      <p>
        ${element.resume_text}
      </p>
    </div>
  </div>`;
});

/* Staff */

staff.forEach((staffElement) => {
  card_staff_div.innerHTML += `<div id="${staffElement.id}" class="cardProfile">
      <div class="cp_front">
        <img
          class="cp_profilePic"
          src= ${staffElement.profile_pic}
          alt="profile pic"
        />
        <p class="cp_profileName">${staffElement.nickname}</p>
      </div>
      <div class="cp_overlay">
        <p>
          ${staffElement.resume_text}
        </p>
      </div>
    </div>`;
});

/***************** Event Listeners *****************/

/****************** Scroll ******************/
const btn_left = document.querySelector(".flecha_izq");
const btn_right = document.querySelector(".flecha_der");

const maxScrollLeft = card_act_div.scrollWidth - card_act_div.clientWidth;

card_act_div.scrollLeft = 515;

btn_left.addEventListener("click", () => {
  if (card_act_div.scrollLeft === 0) {
    card_act_div.scrollLeft = maxScrollLeft;
  } else if (card_act_div.scrollLeft - 50 < 0) {
    card_act_div.scrollLeft = 0;
  } else if (card_act_div.scrollLeft - 50 < 0) {
    card_act_div.scrollLeft = 0;
  } else {
    card_act_div.scrollLeft -= 50;
  }
});
btn_right.addEventListener("click", () => {
  if (card_act_div.scrollLeft === maxScrollLeft) {
    card_act_div.scrollLeft = 0;
  } else if (card_act_div.scrollLeft + 50 > maxScrollLeft) {
    card_act_div.scrollLeft = maxScrollLeft;
  } else {
    card_act_div.scrollLeft += 50;
  }
});

card_act_div.addEventListener("mouseenter", () => {
  card_act_div.addEventListener("wheel", hWheel);
});
card_act_div.addEventListener("mouseleave", () => {
  card_act_div.removeEventListener("wheel", hWheel);
});

/****************** Página Personal ******************/

const main = document.querySelector(".mainElenco");

const items = document.querySelectorAll(".cardProfile");

items.forEach((item) => {
  const id = item.id;
  item.addEventListener("click", () => {
    main.innerHTML = `<h1>${data[id - 1].nickname}</h1>
    <a href="../html/elenco.html" > volver</a>`;
  });
});

// const cristi = document.querySelector("#4");
// console.log(cristi);
// cristi.addEventListener("click", () => {
//   main.innerHTML = `<h1>Cristi</h1>
//   <a href="../html/elenco.html" > volver</a>`;
// });
