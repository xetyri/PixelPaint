const colors = ["white", "purple", "blue", "yellow", "red", "green", "brown ", "black"];
let count = 0;
const max = 2400;
const standart = 1800;
const min = 900;
const buttons = [];
const elements = [];
let triger = false; 
let targetWidth = 1; 
const mainColor = "rgb(124, 176, 170)";


const MainEl = document.querySelector("#blockMain"); 
const divEl = document.querySelector("#screen");
addScreenElements(standart);
addToolbarColors();


const clearButton = document.createElement('img');
clearButton.src = "./img/clear.svg";
clearButton.alt = "clear";
clearButton.classList.add("block-main-clear");
MainEl.appendChild(clearButton);
clearButton.addEventListener('click', onCleanTool)

const gridCheck = document.createElement("input");
gridCheck.setAttribute("type", "checkbox");
gridCheck.classList.add("grid-button");
MainEl.appendChild(gridCheck);
gridCheck.addEventListener('change', onCheckedGrid)

const gridCheckImg = document.createElement("img");
gridCheckImg.src = "./img/grid.svg";
gridCheckImg.classList.add("grid-button-img");
MainEl.appendChild(gridCheckImg);

const fillButton = document.createElement('img');
fillButton.src = "./img/paint.svg";
fillButton.classList.add("block-main-reload");
MainEl.appendChild(fillButton);
fillButton.addEventListener('click', onFillScreen) 

const reloadButton = document.createElement('img');
reloadButton.src = "./img/reload.svg";
reloadButton.alt = "reload";
reloadButton.classList.add("block-main-reload");
MainEl.appendChild(reloadButton);
reloadButton.addEventListener('click', onReloadScreen)

const screenButton = document.createElement('img');
screenButton.src = "./img/screen.svg";
screenButton.alt = "reload";
screenButton.classList.add("block-main-reload");
MainEl.appendChild(screenButton);
screenButton.addEventListener('click', onChangeScreen)

const downloadLink = document.createElement('a');
downloadLink.classList.add("download-link");
downloadLink.setAttribute('id', "download");
MainEl.appendChild(downloadLink);
screenshotUpdate();
downloadLink.addEventListener('focus', () => { 
    resetToolbar();
    downloadLink.onclick = screenshotUpdate();
})
downloadLink.addEventListener('touchend', () => { 
    resetToolbar();
    downloadLink.addEventListener('touchmove', () => screenshotUpdate())
    downloadLink.onclick = screenshotUpdate();
})


function addScreenElements(num) {  
    for (let i = 0; i < num; i++) {
        const divBlockEl = document.createElement('div');
        divBlockEl.classList.add("screen-el");
        elements.push(divBlockEl);
        divBlockEl.addEventListener('click', () => {
            divBlockEl.style.backgroundColor = !triger ? colors[count] : mainColor;
        });
        divEl.appendChild(divBlockEl);
    }
}

function addToolbarColors() {
    for (let i = 0; i < colors.length; i++){
        const buttonEl = document.createElement('div');
        buttonEl.classList.add("block-main-el");
        buttonEl.style.backgroundColor = colors[count++];
        buttons.push(buttonEl);
        buttonEl.addEventListener('click', () => {
            resetToolbar();
            buttonEl.classList.add("block-main-highlight");
            count = i;
            // console.log(count);
        });
        MainEl.appendChild(buttonEl);
    }
}

function deleteScreen(e) {
    for (let i = 0; i < e; i++) {
        divEl.removeChild(divEl.firstChild);
    }
}
 
const resetToolbar = () => {
    for (let j = 0; j < colors.length; j++) {
        if (buttons[j].classList.contains("block-main-highlight")) {
            triger = false;
            buttons[j].classList.remove("block-main-highlight");
        } 
    }
    // triger = false;
    clearButton.classList.remove("block-clear-highlight");
}

function deleteGrid() {
    elements.map(element => element.classList.remove("grid-change"));
    gridCheckImg.classList.remove("grid-button-img-activ");
    gridCheck.checked = false;
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

function onCheckedGrid(event) {
    if (event.currentTarget.checked) {
        elements.map(element => element.classList.add("grid-change"));
        gridCheckImg.classList.add("grid-button-img-activ");
    } else {
        deleteGrid();
    }
}

function onChangeScreen() {
    if (confirm("ATTENTION ! ! !   SCREEN WILL CLEAN !")) {
        resetToolbar();
        deleteGrid();
        if (targetWidth === 1) {
            deleteScreen(standart);
            divEl.style.width = "1500px";
            addScreenElements(max);
            targetWidth = 2;
        } else if (targetWidth === 2) {
            deleteScreen(max);
            divEl.style.width = "600px";
            addScreenElements(min);
            targetWidth = 3;
        } else {
            deleteScreen(min);
            divEl.style.width = "1200px";
            addScreenElements(standart);
            targetWidth = 1;
        }
    }
}

function onFillScreen() {
    const colorFill = document.querySelector(".block-main-highlight");
    if (colorFill === null) {
        resetToolbar();
        alert("CHOOSE A FILL COLOR.")
    } else {
        if (confirm(`ATTENTION ! ! !   SCREEN WILL CHANGE COLOR !`)) {
            resetToolbar();
            elements.map(element => element.style.backgroundColor = colorFill.style.backgroundColor);
            // console.log(colorFill.style.backgroundColor);
        }
    }
}

function onCleanTool() {
    resetToolbar();
    triger = true;
    clearButton.classList.add("block-clear-highlight");
}

function onReloadScreen() {
    if (confirm("ATTENTION ! ! !   SCREEN WILL CLEAN !")) {
        resetToolbar();
        elements.map(element => element.style.backgroundColor = mainColor);
    }
}