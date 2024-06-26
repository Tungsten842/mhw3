function changeimg(event) {
  console.log(event.src);
  event.src = "img/musk2.jpg"
}

function add_piece() {
  let element = document.querySelector('.right-featured-stuff');

  let el = document.createElement("div");
  let text = document.createTextNode("Enterprise");
  el.appendChild(text);
  el.setAttribute('class', 'right-featured-stuff-item-title');
  element.appendChild(el);

  el = document.createElement("h3");
  text = document.createTextNode("The market is forcing cloud vendors to relax data egress fees");
  el.appendChild(text);
  el.setAttribute('class', 'right-featured-stuff-item');
  element.appendChild(el);

  el = document.createElement("div");
  text = document.createTextNode("Ron Miller");
  el.appendChild(text);
  el.setAttribute('class', 'right-featured-stuff-author');
  element.appendChild(el);
}

var token = "";

async function text_to_speech(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/facebook/mms-tts-eng",
    {
      headers: { Authorization: "Bearer " + token },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.blob();
  return result;
}

async function make_request(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
    {
      headers: {
        Authorization: "Bearer " + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

var tts_audio;
function search(event) {
  const previous_message = document.getElementById("textbox").innerText;
  const i_message = document.getElementById("prompt").value;
  let message = previous_message + i_message;

  make_request({ "inputs": '[INST]' + message + '[/INST]' }).then((dirtyresponse) => {
    const textbox = document.getElementById("textbox");

    const response = dirtyresponse[0].generated_text.replace('[INST]' + message + '[/INST]', '');

    textbox.innerText = message + '\n' + response + '\n';

    text_to_speech({ "inputs": response }).then((response) => {
      tts_audio = new Audio(URL.createObjectURL(response));
      tts_audio.play();
    });

  });

  document.getElementById("prompt").value = "";

  event.preventDefault();


}

// add form search event listener
document.querySelector('form').addEventListener('submit', search);

function toggle_bar(event) {
  const left_bar = document.querySelector('.left-bar');
  const element = document.querySelector('.content');
  if (left_bar.classList.contains('hidden')) {
    //left_bar.style.display = 'none';
    left_bar.classList.remove('hidden');
    element.style.marginLeft = "210px";
  }
  else {
    //left_bar.style.display = 'flex';
    left_bar.classList.add('hidden');
    element.style.marginLeft = "30px";
  }
}
/*
const element = document.querySelector('*');
element.addEventListener("keydown", (event) => {
  if (event.key === "t") {
    toggle_bar(event);
  }
  if (event.key === "a") {
    add_piece(event);
  }
});
*/

addEventListener("mouseover", (event) => { });
