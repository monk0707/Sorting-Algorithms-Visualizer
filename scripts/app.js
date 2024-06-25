"use strict";

const start = async () => {
  document.querySelector(".footer > p:nth-child(1)").style.visibility = "hidden";
  let now = new Date();
  let algoValue = Number(document.querySelector(".algo-menu").value);
  let speedValue = Number(document.querySelector(".speed-menu").value);

  if (speedValue === 0) {
    speedValue = 1;
  }
  if (algoValue === 0) {
    alert("No Algorithm Selected");
    return;
  }

  let algorithm = new sortAlgorithms(speedValue);
  if (algoValue === 1) await algorithm.BubbleSort();
  if (algoValue === 2) await algorithm.SelectionSort();
  if (algoValue === 3) await algorithm.InsertionSort();
  if (algoValue === 4) await algorithm.MergeSort();
  if (algoValue === 5) await algorithm.QuickSort();
  let now1 = new Date();
  document.getElementById('Ttime').innerHTML = (now1 - now) / 1000;
  // document.querySelector(".footer > p:nth-child(2)").style.visibility = "visible";
};
var i=0;
let input;

const RenderScreen = async () => {
  let algoValue = Number(document.querySelector(".algo-menu").value);
  await RenderList();
};

const RenderInput = async () => {
  input = String(document.querySelector(".input").value);
  console.log("input in app.js is ",input);
  await RenderList();
};

const RenderList = async () => {
  let sizeValue = Number(document.querySelector(".size-menu").value);
  // if(i>0){
  //   input = prompt("Do you want to manually input the array? Answer - Y/N");
  // }
  // i++;
  await clearScreen();
  //await RenderInput();
  
  let list = await randomList(sizeValue);
  const arrayNode = document.querySelector(".array");
  console.log("array Node in app.js is ",arrayNode);
  console.log("list in app.js is ",list);
  for (const element of list) {
    const node = document.createElement("div");
    node.className = "cell";
    node.setAttribute("value", String(element));
    node.style.height = `${3.8 * element}px`;
    arrayNode.appendChild(node);
  }
};

const RenderArray = async (sorted) => {
  let sizeValue = Number(document.querySelector(".size-menu").value);
  await clearScreen();

  let list = await randomList(sizeValue);
  if (sorted) list.sort((a, b) => a - b);

  const arrayNode = document.querySelector(".array");
  const divnode = document.createElement("div");
  divnode.className = "s-array";

  for (const element of list) {
    const dnode = document.createElement("div");
    dnode.className = "s-cell";
    dnode.innerText = element;
    divnode.appendChild(dnode);
  }
  arrayNode.appendChild(divnode);
};

const randomList = async (Length) => {
  let list = new Array();
  let lowerBound = 1;
  let upperBound = 100;
  
// here is where bakliwaal has taken input using a prompt : but we are not going to use it, we will use a input field : to take input from user.

  if (input == "Y") {
    // for (let counter = 0; counter < Length; ++counter) {
    //   let randomNumber = prompt("Enter the no.");
    //   list.push(parseInt(randomNumber));
    // }
    let inpBox = document.querySelector(".inputBox");
    let inputReceived = inpBox.value;

    console.log("input received is ",inputReceived);

    list = inputReceived.split(',');
    console.log("list in app.js is ",list);
    console.log("Length in app.js is ",Length, " list.length is ",list.length);
    Length = list.length;
    console.log("Length in app.js is ",Length, " list.length is ",list.length);
  }
  else{
    for (let counter = 0; counter < Length; ++counter) {
      let randomNumber = Math.floor(
        Math.random() * (upperBound - lowerBound + 1) + lowerBound
      );
      list.push(parseInt(randomNumber));
    }
  }

  // for (let counter = 0; counter < Length; ++counter) {
  //   let randomNumber = Math.floor(
  //     Math.random() * (upperBound - lowerBound + 1) + lowerBound
  //   );
  //   list.push(parseInt(randomNumber));
  // }

  
  return list;
};

const clearScreen = async () => {
  document.querySelector(".array").innerHTML = "";
};

const response = () => {
  let Navbar = document.querySelector(".navbar");
  if (Navbar.className === "navbar") {
    Navbar.className += " responsive";
  } else {
    Navbar.className = "navbar";
  }
};

document.querySelector(".icon").addEventListener("click", response);
document.querySelector(".start").addEventListener("click", start);
document.querySelector(".size-menu").addEventListener("change", RenderList);
document.querySelector(".algo-menu").addEventListener("change", RenderScreen);
document.querySelector(".input").addEventListener("change", RenderInput);
window.onload = RenderScreen;