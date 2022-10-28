const colors = ["white", "purple", "blue", "yellow", "red", "green", "brown ", "black"];
let count = 0;
const num = 1800;
const buttons = [];
const elements = [];
let triger = false; 
const mainColor = "rgb(124, 176, 170)";


const MainEl = document.querySelector("#blockMain"); 
const divEl = document.querySelector("#screen");


for (let i = 0; i < colors.length; i++){
    const buttonEl = document.createElement('div');
    buttonEl.classList.add("block-main-el");
    buttonEl.style.backgroundColor = colors[count++];
    buttons.push(buttonEl);
    buttonEl.addEventListener('click', () => {
        checkedColor();
        buttonEl.classList.add("block-main-highlight");
        count = i;
        console.log(count);
    });
    MainEl.appendChild(buttonEl);
}

const clearButton = document.createElement('img');
clearButton.src = "./img/clear.svg";
clearButton.alt = "clear";
clearButton.classList.add("block-main-clear");
MainEl.appendChild(clearButton);
clearButton.addEventListener('click', () => { 
    checkedColor();
    triger = true;
    clearButton.classList.add("block-clear-highlight");
})

const reloadButton = document.createElement('img');
reloadButton.src = "./img/reload.svg";
reloadButton.alt = "reload";
reloadButton.classList.add("block-main-reload");
MainEl.appendChild(reloadButton);
reloadButton.addEventListener('click', () => { 
    checkedColor();
    elements.map(element => element.style.backgroundColor = mainColor);
})

const downloadLink = document.createElement('a');
downloadLink.classList.add("download-link");
downloadLink.setAttribute('id', "download");
MainEl.appendChild(downloadLink);
screenshotUpdate();
downloadLink.addEventListener('focus', () => { 
    checkedColor();
    downloadLink.onclick = screenshotUpdate();
})


for (let i = 0; i < num; i++){
    const divBlockEl = document.createElement('div');
    divBlockEl.classList.add("screen-el");
    elements.push(divBlockEl);
    divBlockEl.addEventListener('click', () => {
        divBlockEl.style.backgroundColor = !triger?colors[count]:mainColor;
    });
    divEl.append(divBlockEl);
}

const checkedColor = () => {
    for (let j = 0; j < colors.length; j++) {
            if (buttons[j].classList.contains("block-main-highlight")) {
                triger = false;
                buttons[j].classList.remove("block-main-highlight");
            } 
        }
    triger = false;
    clearButton.classList.remove("block-clear-highlight");
}

function screenshotUpdate() {
    html2canvas(divEl, {
        onrendered: function (canvas) {
            var imageData = canvas.toDataURL("image/jpg");
            var newData = imageData.replace(/^data:image\/jpg/, "data:application/octet-stream");
            $("#download").attr("download", "image.jpg").attr("href", newData);
        }
    });
}