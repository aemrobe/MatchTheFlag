import {
  checkActiveClass,
  checkIfMatchIsCorrect,
  emptyingPreviousLoadedCountryAndFlagData,
  getJson,
} from "./helper.js";
import { API_URL } from "./config.js";

export const state = {
  flags: [],
  countryNames: [],
  continents: [],
  capitals: [],
  populations: [],
  score: 0,
  health: 3,
  highScore: 0,
  message: "",
};

export const loadCountriesFlag = async function () {
  try {
    const data = await getJson(`${API_URL}?fields=flags,name`);

    const maximumData = data.length;

    for (let i = 0; i < 4; i++) {
      const randomNumber = Math.floor(Math.random() * maximumData);

      state.flags.push(data[randomNumber].flags);
      state.countryNames.push(data[randomNumber].name.common);
    }
  } catch (err) {
    throw err;
  }
};

export const checkingTheMatches = function () {
  const flagItems = Array.from(document.querySelectorAll(".flag-list__item"));
  const countryItems = Array.from(
    document.querySelectorAll(".country-list__item")
  );

  //when the user selected both the country and the flag
  if (checkActiveClass()) {
    const activeCountry = countryItems.find((country) =>
      country.classList.contains("country-list__item--active")
    );

    const activeFlag = flagItems.find((flag) =>
      flag.classList.contains("flag-list__item--active")
    );

    //#### if the match is correct ####
    if (checkIfMatchIsCorrect()) {
      //adding the class for the correct match
      activeFlag.firstElementChild.classList.add("correct-match");
      activeCountry.classList.add("correct-match");

      //increasing the score by 1
      state.score += 1;
    } else {
      //#### if the match is incorrect ####
      //if user health is 1 and missed the match the game is over
      if (state.health === 1) {
        //when the score is highScore
        if (state.score > state.highScore) {
          state.highScore = state.score;
          state.message = "New HighScore! fantastic job";
        } else {
          //when the score is less that the highScore
          if (state.score === 0) {
            state.message = "Better Luck Next Time";
          } else {
            state.message = "Good Job";
          }
        }
        //the winning window will be shown
      }
      //adding the class for the error match
      activeCountry.classList.add("error-match");
      activeFlag.classList.add("error-match");

      //decreasing the health by one
      state.health -= 1;
    }
  }
};

export const loadAllCountriesFlag = async function () {
  try {
    const data = await getJson(
      `${API_URL}?fields=flags,name,capital,continents,population`
    );

    emptyingPreviousLoadedCountryAndFlagData();

    const maximumData = data.length;

    for (let i = 0; i < maximumData; i++) {
      state.flags.push(data[i].flags);
      state.countryNames.push(data[i].name.common);
      state.continents.push(data[i].continents[0]);
      state.capitals.push(data[i].capital[0]);
      state.populations.push(data[i].population);
    }
  } catch (err) {
    throw err;
  }
};
