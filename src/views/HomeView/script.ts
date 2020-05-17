const element = document.querySelector("#apsxx23");
import { AxiosInstance } from "axios";
import { Days } from "../../controllers/DaysControllers";
import { TimerConfig } from "../../controllers/SchemaController";
import { setTimeout } from "timers";

const baseUrl = "http://192.168.15.74:3000/api";

declare var axios: AxiosInstance;

const containerDays = document.querySelector("#days-items");
const buttonRegister = document.querySelector<HTMLElement>("#btn-register");

containerDays.innerHTML = "Carregando...";
containerDays.className = "container-days-loading";

const updateDaysInScreen = () => {
  axios.get<Days>(`${baseUrl}/days`).then(({ data }) => {
    containerDays.innerHTML = "";
    containerDays.className = "container-days";

    data.forEach(({ state, date, records, id }) => {
      const li = document.createElement("li");

      li.id = id.toString();

      state === "full"
        ? li.setAttribute("data-row-good", "")
        : li.setAttribute("data-row-danger", "");

      li.innerText = `Dia ${date
        .split("-")
        .reverse()
        .join("/")} | ${records.join(" - ")}`;

      containerDays.appendChild(li);
    });

    if (data.length === 0) {
      containerDays.innerHTML = "There is nothing here.";
      containerDays.className = "container-days-nothing";
    }
  });
};

buttonRegister.onclick = async () => {
  containerDays.innerHTML = "Carregando...";
  containerDays.className = "container-days-loading";

  try {
    await axios.post(`${baseUrl}/records`, {});

    updateDaysInScreen();
  } catch (error) {
    console.error(error);
    updateDaysInScreen();
  }
};

updateDaysInScreen();
