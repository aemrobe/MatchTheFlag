import * as model from "./model.js";

export const getJson = async function (url) {
  try {
    const res = await fetch(url);

    if (!res.ok) throw new Error("invalid Url");

    const data = await res.json();

    return data;
  } catch (err) {
    throw err;
  }
};

export const checkActiveClass = function () {
  const flagItems = Array.from(document.querySelectorAll(".flag-list__item"));
  const countryItems = Array.from(
    document.querySelectorAll(".country-list__item")
  );

  const checkIfFlagContainsActiveClass = flagItems.some((flag) =>
    flag.classList.contains("flag-list__item--active")
  );

  const checkIfCountryContainsActiveClass = countryItems.some((country) =>
    country.classList.contains("country-list__item--active")
  );

  return checkIfCountryContainsActiveClass && checkIfFlagContainsActiveClass;
};

export const checkIfMatchIsCorrect = function () {
  const flagItems = Array.from(document.querySelectorAll(".flag-list__item"));
  const countryItems = Array.from(
    document.querySelectorAll(".country-list__item")
  );

  const activeCountry = countryItems.find((country) =>
    country.classList.contains("country-list__item--active")
  );

  const activeFlag = flagItems.find((flag) =>
    flag.classList.contains("flag-list__item--active")
  );

  return activeFlag.dataset.identifier == activeCountry.dataset.identifier;
};

export const removeTheActiveAndErrorClass = function () {
  const flagItems = Array.from(document.querySelectorAll(".flag-list__item"));
  const countryItems = Array.from(
    document.querySelectorAll(".country-list__item")
  );

  const activeCountry = countryItems.find((country) =>
    country.classList.contains("country-list__item--active")
  );

  const activeFlag = flagItems.find((flag) =>
    flag.classList.contains("flag-list__item--active")
  );

  //removing the error match class from the selected element
  activeFlag.classList.remove("error-match");
  activeCountry.classList.remove("error-match");

  //removing the active class from the selected element
  activeCountry.classList.remove("country-list__item--active");
  activeFlag.classList.remove("flag-list__item--active");
};

export const ifTheUserGotAllMatches = function () {
  const flagItems = Array.from(document.querySelectorAll(".flag-list__item"));
  const countryItems = Array.from(
    document.querySelectorAll(".country-list__item")
  );

  return countryItems.every(function (flag) {
    return flag.classList.contains("correct-match");
  });
};

export const emptyingPreviousLoadedCountryAndFlagData = function () {
  //emptying the previous loaded data
  model.state.flags = [];
  model.state.countryNames = [];
};
