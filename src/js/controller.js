import * as model from "./model.js";
import displayCountryView from "./view/displayCountryView.js";
import displayFlagsView from "./view/displayFlagsView.js";
import displayScoreView from "./view/displayScoreView.js";
import displayHomeView from "./view/displayHomeView.js";

import {
  checkActiveClass,
  checkIfMatchIsCorrect,
  removeTheActiveAndErrorClass,
  ifTheUserGotAllMatches,
  emptyingPreviousLoadedCountryAndFlagData,
} from "./helper.js";
import lifeHealthView from "./view/lifeHealthView.js";
import displayGameResultView from "./view/displayGameResultView.js";
import "core-js/stable";
import "regenerator-runtime/runtime.js";

const controlCountryResult = async function () {
  try {
    displayFlagsView.renderSpinner();

    displayCountryView.renderSpinner();

    await model.loadCountriesFlag();

    displayFlagsView.render([model.state.flags, model.state.countryNames]);
    displayCountryView.render(model.state.countryNames);
  } catch (err) {
    console.error(err);
  }
};

const controlReMatch = function () {
  emptyingPreviousLoadedCountryAndFlagData();
  model.state.score = 0;
  model.state.health = 3;
  model.state.message = "";
  controlCountryResult();
  displayScoreView.render(model.state.score);
  lifeHealthView.render(model.state.health);
  displayGameResultView._toogle();
};

const controlMatchResult = async function () {
  try {
    //checking the matches which the user makes
    model.checkingTheMatches();

    if (checkActiveClass()) {
      //when the match is correct
      if (checkIfMatchIsCorrect()) {
        //displaying the score
        displayScoreView.render(model.state.score);

        //removing the error match and the active class
        setTimeout(removeTheActiveAndErrorClass, 500);

        //when the user got all the matches
        if (ifTheUserGotAllMatches()) {
          //emptying the previous loaded data
          emptyingPreviousLoadedCountryAndFlagData();

          //loading the flag and country again
          setTimeout(controlCountryResult, 500);
        }
      } else {
        //when the match is incorrect
        lifeHealthView.render(model.state.health);

        //removing the error match and the active class
        setTimeout(removeTheActiveAndErrorClass, 500);

        //if the user run out of the health
        if (model.state.health === 0) {
          displayGameResultView.render([
            model.state.score,
            model.state.highScore,
            model.state.message,
          ]);

          setTimeout(function () {
            displayGameResultView._toogle();

            //making a rematch when the user clicks the try again button
            displayGameResultView._addHandlerRematch(controlReMatch);
          }, 500);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const controlStartGame = async function () {
  emptyingPreviousLoadedCountryAndFlagData();
  model.state.score = 0;
  model.state.highScore = 0;
  model.state.health = 3;
  model.state.message = "";
  displayScoreView.render(model.state.score);
  lifeHealthView.render(model.state.health);
  controlCountryResult();
};

const controlGoToLibrary = async function () {
  await model.loadAllCountriesFlag();

  displayHomeView.render({
    flags: model.state.flags,
    countryNames: model.state.countryNames,
    capitals: model.state.capitals,
    continents: model.state.continents,
    populations: model.state.populations,
  });
};

const init = function () {
  displayHomeView.addHandlerStartGameAndGoToLibrary(controlStartGame);
  displayHomeView.addHandlerStartGameAndGoToLibrary(controlGoToLibrary, true);
  lifeHealthView.render(model.state.health);
  displayCountryView.addHandlerMatch(controlMatchResult);
  displayFlagsView.addHandlerMatch(controlMatchResult);
  // displayGameResultView._addHandlerBackToHome(controlBackToHome);
};

init();
