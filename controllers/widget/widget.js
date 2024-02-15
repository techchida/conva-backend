const express = require("express");
const { CAMPAIGNS } = require("../../models/models");
const app = express();
// const script = require("../../dist/conva");

app.get("/:campaignID", async (req, res) => {
  try {
    if ((await CAMPAIGNS.exists({ _id: req.params?.campaignID })) == null)
      return res.status(400).json({
        error: "inactive campaign",
      });

    let configs = await CAMPAIGNS.findById(req.params.campaignID).lean();
    configs = JSON.stringify({ ...configs, _id: configs._id.toString() });

    return res.send(`
    const loadStyle = (src) => {
      return new Promise(function (resolve, reject) {
        let link = document.createElement("link");
        link.href = src;
        link.rel = "stylesheet";

        link.onload = () => resolve(link);
        link.onerror = () => reject(new Error('failed to load stylesheet'));

        document.head.append(link);
      });
    };

    loadStyle("https://cdn.jsdelivr.net/gh/techchida/conva-backend/public/conva.min.css").then(
    ()=>{
      
    const configs = ${configs}

    const doc = document.getElementsByTagName("body")[0];

let widgetBubble = document.createElement("div");
widgetBubble.className = "xx-bubble";
widgetBubble.innerHTML = "<span class='pop xx-pop'></span>";
doc.appendChild(widgetBubble);

let widgetArea = document.createElement("form");
widgetArea.className = "xx-widget";
doc.appendChild(widgetArea);

let widgetBox = document.createElement("div");
widgetBox.className = "xx-widget-box xx-slide";
widgetArea.appendChild(widgetBox);

let formSubmit = document.createElement("div");
formSubmit.className = "xx-submited xx-slide";
formSubmit.innerHTML =
  "<div><div class='xx-checked'><span></span></div> <p class='xx-txt'>Thanks for your feedback.</p></div>";
widgetBox.appendChild(formSubmit);

let titleField = document.createElement("h1");
titleField.className = "xx-title";
titleField.innerHTML = configs.title;
widgetBox.appendChild(titleField);

let subtitleField = document.createElement("small");
subtitleField.className = "xx-subtitle";
subtitleField.innerHTML = configs.subtitle;
widgetBox.appendChild(subtitleField);

let voteField = document.createElement("div");
voteField.className = "xx-action-area";
configs.type == "generic" ? null : widgetBox.appendChild(voteField);

//voting areas

const voteMaker = {
  vote: () => {
    let option1 = document.createElement("span");
    option1.className = "xx-thumb xx-actions";
    option1.setAttribute("action", "1");
    voteField.appendChild(option1);

    let option2 = document.createElement("span");
    option2.className = "xx-thumb xx-actions";
    option2.setAttribute("action", "2");
    voteField.appendChild(option2);
  },

  rating: () => {
    let option1 = document.createElement("span");
    option1.className = "xx-star xx-actions";
    option1.setAttribute("action", "1");
    voteField.appendChild(option1);

    let option2 = document.createElement("span");
    option2.className = "xx-star xx-actions";
    option2.setAttribute("action", "2");
    voteField.appendChild(option2);

    let option3 = document.createElement("span");
    option3.className = "xx-star xx-actions";
    option3.setAttribute("action", "3");
    voteField.appendChild(option3);

    let option4 = document.createElement("span");
    option4.className = "xx-star xx-actions";
    option4.setAttribute("action", "4");
    voteField.appendChild(option4);

    let option5 = document.createElement("span");
    option5.className = "xx-star xx-actions";
    option5.setAttribute("action", "5");
    voteField.appendChild(option5);
  },
  emoji: () => {
    let option1 = document.createElement("span");
    option1.className = "xx-emoji xx-actions";
    option1.setAttribute("action", "1");
    voteField.appendChild(option1);

    let option2 = document.createElement("span");
    option2.className = "xx-emoji xx-actions";
    option2.setAttribute("action", "2");
    voteField.appendChild(option2);

    let option3 = document.createElement("span");
    option3.className = "xx-emoji xx-actions";
    option3.setAttribute("action", "3");
    voteField.appendChild(option3);

    let option4 = document.createElement("span");
    option4.className = "xx-emoji xx-actions";
    option4.setAttribute("action", "4");
    voteField.appendChild(option4);

    let option5 = document.createElement("span");
    option5.className = "xx-emoji xx-actions";
    option5.setAttribute("action", "5");
    voteField.appendChild(option5);
  },
};

voteMaker[configs.type]();

let nameField = document.createElement("input");
nameField.className = "xx-input-area";
nameField.placeholder = "Full name";
nameField.name = "name";
nameField.required = "required";
configs.name ? widgetBox.appendChild(nameField) : null;

let emailField = document.createElement("input");
emailField.className = "xx-input-area";
emailField.type = "email";
emailField.name = "email";
emailField.placeholder = "email address";
emailField.required = "required";
configs.email ? widgetBox.appendChild(emailField) : null;

let textField = document.createElement("textarea");
textField.className = "xx-input-area";
textField.name = "comment";
textField.placeholder = "say something. . .";
textField.rows = 5;
textField.required = "required";
configs.comment ? widgetBox.appendChild(textField) : null;

const optionField = document.createElement("input");
optionField.setAttribute("type", "hidden");
optionField.name = "vote";
widgetBox.appendChild(optionField);

const idField = document.createElement("input");
idField.setAttribute("type", "hidden");
idField.name = "campaignID";
idField.value = configs._id;
widgetBox.appendChild(idField);

const button = document.createElement("button");
button.setAttribute("type", "submit");
button.innerText = "submit ";
widgetBox.appendChild(button);

const options = document.getElementsByClassName("xx-actions");

for (i = 0; i < options.length; i++) {
  let value = options[i].getAttribute("action");
  options[i].addEventListener("click", () => {
    optionField.value = value;
    switch (value) {
      case "1":
        voteField.className = "xx-action-area one";
        break;
      case "2":
        voteField.className = "xx-action-area two";
        break;
      case "3":
        voteField.className = "xx-action-area three";
        break;
      case "4":
        voteField.className = "xx-action-area four";
        break;
      case "5":
        voteField.className = "xx-action-area five";
        break;

      default:
        break;
    }
  });
}

widgetBubble.addEventListener("click", () => {
  widgetArea.classList.toggle("isActive");

  widgetArea.classList.contains("isActive")
    ? (widgetBubble.innerHTML = "<span class='close xx-pop'></span>")
    : (widgetBubble.innerHTML = "<span class='pop xx-pop'></span>");
});

widgetArea.addEventListener("submit", async (e) => {
  e.preventDefault();

  button.innerHTML = "<span class='xx-loader'></span>";
  button.type = "button";

  let object = {};
  let data = new FormData(e.target);
  data.forEach((value, key) => (object[key] = value));
  formdata = JSON.stringify(object);

  const response = await fetch("https://conva.onrender.com/leads/new", {
    method: "POST",
    body: formdata,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const res = await response;
  button.innerHTML = "submit";
  button.type = "submit";
  if (res.status === 200) {
    formSubmit.classList.add("isActive");
    nameField.value = "";
    emailField.value = "";
    textField.value = "";
    voteField.setAttribute("class", "xx-action-area");

    setTimeout(() => {
      formSubmit.classList.remove("isActive");
    }, 5000);
  }
});
    }
    )
    



      `);
  } catch (error) {
    console.log(error);
    return res.send({
      error: "failed to initialize",
    });
  }
});

module.exports = app;
