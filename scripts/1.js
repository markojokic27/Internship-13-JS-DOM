const textboxes = document.querySelectorAll(".input-wrapper__textbox");
const inputTexts = document.querySelectorAll(".input-wrapper__text");
const errorTexts = document.querySelectorAll(".input-wrapper__error");
const multipleChoices = document.querySelectorAll(".multiple-choices");
const multipleChoicesMenu = document.querySelectorAll(
  ".input-wrapper__multiple-choices__menu"
);
const inputTexts2 = document.querySelectorAll(".input-wrapper__text2");
const arrow = document.querySelectorAll(".arrow");
const choiceSelecteds = document.querySelectorAll(".choice-selected");
const choices1 = multipleChoicesMenu[0].querySelectorAll(".choice");
const choices2 = multipleChoicesMenu[1].querySelectorAll(".choice");
const saveChanges = document.querySelector(".saveChanges");
textboxes.forEach((textboxes) => (textboxes.defaultValue = "User"));
textboxes.forEach((textboxes) => {
  textboxes.addEventListener("mouseover", function (a) {
    if (textboxes !== document.activeElement) {
      textboxes.style.backgroundColor = "#1360a020";
    }
  });
});
textboxes.forEach((textboxes) => {
  textboxes.addEventListener("mouseout", function (a) {
    if (textboxes !== document.activeElement) {
      textboxes.style.backgroundColor = "transparent";
    }
  });
});
for (let i = 0; i < textboxes.length; i++) {
  textboxes[i].addEventListener("focus", function (a) {
    textboxes[i].style.outlineColor = "#1360a0";
    textboxes[i].style.border = "1px solid #1360a0";
    inputTexts[i].style.color = "#1360a0";
  });
  textboxes[i].addEventListener("blur", function (a) {
    textboxes[i].style.border = "1px solid black";
    textboxes[i].style.backgroundColor = "transparent";
    inputTexts[i].style.color = "#414141";
  });
}
//Ne moze foreach zbog inputTexts?

multipleChoices.forEach((multipleChoices) => {
  multipleChoices.addEventListener("mouseover", function (a) {
    multipleChoices.style.backgroundColor = "#1360a011";
  });
  multipleChoices.addEventListener("mouseout", function (a) {
    multipleChoices.style.backgroundColor = "transparent";
  });
});
for (let i = 0; i < multipleChoices.length; i++) {
  multipleChoices[i].addEventListener("focus", function (a) {
    inputTexts2[i].style.color = "#1360a0";
    multipleChoices[i].style.border = "1px solid #1360a0";
    arrow[i].classList.add("arrow__up");
    multipleChoicesMenu[i].classList.add(
      "input-wrapper__multiple-choices__menu__visible"
    );
    //if(a.relatedTarget === null || !a.relatedTarget.classList.contains('.input-wrapper__multiple-choices__menu__visible')){
    // multipleChoicesMenu[i].classList.remove('input-wrapper__multiple-choices__menu__visible')
    //}
    //else{
    // multipleChoicesMenu[i].classList.add('input-wrapper__multiple-choices__menu__visible');
    //} Mislija sam napravit da kad se opet klikne na strelicu padajuci izbornik i zatvori
  });
  multipleChoices[i].addEventListener("blur", function (a) {
    inputTexts2[i].style.color = "#414141";
    multipleChoices[i].style.border = "1px solid #414141";
    arrow[i].classList.remove("arrow__up");
    if (
      a.relatedTarget === null ||
      !a.relatedTarget.classList.contains(
        ".input-wrapper__multiple-choices__menu"
      )
    ) {
      multipleChoicesMenu[i].classList.remove(
        "input-wrapper__multiple-choices__menu__visible"
      );
    } else {
      multipleChoices[i].focus();
    }
  });
}
const clickedChoices1 = [];
const clickedChoices2 = [];
choices1.forEach((choice) => {
  choice.addEventListener("click", function (a) {
    choiceSelecteds[0].innerHTML = choice.innerHTML;
    styleClickedChoice(clickedChoices1, choice);
  });
});
choices2.forEach((choice) => {
  choice.addEventListener("click", function (a) {
    choiceSelecteds[1].innerHTML = choice.innerHTML;
    styleClickedChoice(clickedChoices2, choice);
  });
});
function styleClickedChoice(choiceSelected, choice) {
  if (choiceSelected.length) {
    if (choiceSelecteds[0].classList.contains("choice-selected"))
      choiceSelected[0].classList.remove("choice-selected");
    choiceSelected.pop();
  }
  choiceSelected.push(choice);
  choice.classList.add("choice-selected");
}

saveChanges.addEventListener("click", function (a) {
  let firstName = textboxes[0].value;
  let lastName = textboxes[1].value;
  let selected1 = document.querySelector("#selected11").innerHTML;
  let selected2 = document.querySelector("#selected22").innerHTML;
  const user = {
    firstName,
    lastName,
    selected1,
    selected2,
  };
  if (!user.firstName) {
    errorTexts[0].classList.add("input-wrapper__error-visible");
    textboxes[0].style.borderColor = "#b30000";
    return;
  }
  if (!user.lastName) {
    errorTexts[1].classList.add("input-wrapper__error-visible");
    textboxes[1].style.borderColor = "#b30000";
    return;
  }
  if (localStorage.length) {
    let Key = 0;
    for (let i = 0; i < localStorage.length; i++) {
      if (i === 0)
        localStorage.setItem(JSON.stringify(1), JSON.stringify(user));
      if (+localStorage.key(i) > Key) {
        Key = +localStorage.key(i);
      }
    }
    key = Key + 1;
  }
  localStorage.setItem(JSON.stringify(key), JSON.stringify(user));
});
