/************ Declaración de Constantes ***************/

const card_act_div = document.querySelector(".cards_div");
const card_staff_div = document.querySelector(".cards_div_staff");

const flecha_izq_i = document.querySelector(".flecha_izq_i");
const flecha_der_i = document.querySelector(".flecha_der_i");

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

const dynamicVariables = {};

/* Actrices */

actrices.forEach((element) => {
  card_act_div.innerHTML += `<div id= "id_0${element.id}" class="cardProfile">
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
  dynamicVariables[`card_${element.nickname}`] = document.querySelector(
    `#id_0${element.id}`
  );
});

/* Staff */

staff.forEach((element) => {
  card_staff_div.innerHTML += `<div id="id_0${element.id}" class="cardProfile">
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
  dynamicVariables[`card_${element.nickname}`] = document.querySelector(
    `#id_0${element.id}`
  );
});

/************ Event Listener ************/
const btn_left = document.querySelector(".flecha_izq");
const btn_right = document.querySelector(".flecha_der");

console.log("ScrollWidth: " + card_act_div.scrollWidth);
console.log("ClientWidth: " + card_act_div.clientWidth);
const maxScrollLeft = card_act_div.scrollWidth - card_act_div.clientWidth;
console.log("MaxScrollLeft: " + maxScrollLeft);

card_act_div.scrollLeft = 515;

console.log(card_act_div.offsetWidth);
console.log(card_act_div.scrollLeft);

btn_left.addEventListener("click", () => {
  if (card_act_div.scrollLeft === 0) {
    card_act_div.scrollLeft = maxScrollLeft;
  } else if (card_act_div.scrollLeft - 50 < 0) {
    card_act_div.scrollLeft = 0;
    console.log(card_act_div.scrollLeft);
  } else if (card_act_div.scrollLeft - 50 < 0) {
    card_act_div.scrollLeft = 0;
    console.log(card_act_div.scrollLeft);
  } else {
    card_act_div.scrollLeft -= 50;
    console.log(card_act_div.scrollLeft);
  }
});
btn_right.addEventListener("click", () => {
  if (card_act_div.scrollLeft === maxScrollLeft) {
    card_act_div.scrollLeft = 0;
  } else if (card_act_div.scrollLeft + 50 > maxScrollLeft) {
    card_act_div.scrollLeft = maxScrollLeft;
    console.log(card_act_div.scrollLeft);
  } else {
    card_act_div.scrollLeft += 50;
    console.log(card_act_div.scrollLeft);
  }
});

const hWheel = (event) => {
  // Evitar el comportamiento predeterminado de la rueda del mouse
  event.preventDefault();

  // Determinar la dirección del desplazamiento
  const delta = Math.sign(event.deltaY);

  // Ajustar el desplazamiento horizontal
  card_act_div.scrollLeft += delta * 40; // Puedes ajustar el valor según tu preferencia
};

card_act_div.addEventListener("mouseenter", () => {
  console.log("Ha ingresado");
  card_act_div.addEventListener("wheel", hWheel);
});
card_act_div.addEventListener("mouseleave", () => {
  card_act_div.removeEventListener("wheel", hWheel);
});
