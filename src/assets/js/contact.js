import { msQuery, msQueryAll, msCreate, msAppend } from "making-stuffs-queries";
import { validateFields } from "./fieldValidator";

const forms = msQueryAll("form");

const setLoading = (form) => {
  const blackout = msCreate("span", {
    class: "blackout",
    id: "blackout",
  });
  const loader = msCreate("span", {
    class: "loader",
    id: "loader",
  });
  msAppend([blackout, loader], form);
};

const submitHandler = (e) => {
  e.preventDefault();

  // Ensure a form triggered the event
  if (e.target.tagName.toLowerCase() !== "form") {
    // Exit if not
    return;
  }

  // Add the loader
  setLoading(e.target);

  // Get for fields
  const fields = msQueryAll(".form-field", e.target);

  // Initiate validator
  const validator = new validateFields();

  // Validate the fields
  const validated = validator.validate(fields);

  // send the form if validated and respond with errors if not.
  // return validated === true ? sendForm(e.target) : formRespond(e.target, validated);
  return sendForm(e.target);
};

const sendForm = async (form) => {
  // Google recaptcha
  grecaptcha.ready(() => {
    grecaptcha
      .execute("6LeotNEUAAAAAFa02LZQ2rXFcnil1ppPpILrPuQt", {
        action: "submit",
      })
      .then(async function (token) {
        try {
          const body = {};

          for (let field of form.elements) {
            if (field.type === "submit") continue;
            body[field.name] = field.value;
          }

          body.token = token;
          console.log(token);
          const reply = await fetch("/mail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
          const data = await reply.json();

          return formRespond(form, data);
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
        formRespond(form, { success: false, error });
      });
  });
};

const formRespond = (form, data) => {
  if (data.success) {
    msQuery("#loader").classList.add("success");
    setTimeout(() => {
      msQuery("#loader").classList.remove("success");
      msQuery("#blackout").remove();
      msQuery("#loader").remove();
    }, 1500);
  } else if (data.errors) {
    msQuery("#loader").classList.add("fail");
    for (let input of data.errors) {
      const elem = msQuery(`[name="${input.param}"`, form);
      elem.classList.add("failed");
      elem.addEventListener("click", () => {
        elem.classList.remove("failed");
      });
    }
    setTimeout(() => {
      msQuery("#loader").classList.remove("fail");
      msQuery("#blackout").remove();
      msQuery("#loader").remove();
    }, 1500);
  } else {
    msQuery("#loader").classList.add("fail");
    setTimeout(() => {
      msQuery("#loader").classList.remove("fail");
      msQuery("#blackout").remove();
      msQuery("#loader").remove();
    }, 1500);
  }
};

forms.forEach((form) =>
  form.addEventListener("submit", function (e) {
    return submitHandler(e);
  })
);
