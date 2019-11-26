import "./styles.css";

let foundDrinkTime = false;
let contentLoaded = false;
let disabledAlerts = false;
let disabledSound = false;

let minToMs = m => {
  return m * 60000;
};

let findNextDrinkTime = () => {
  let nextTime;
  if (!foundDrinkTime) {
    nextTime = new Date().getTime() + minToMs(15);
    foundDrinkTime = true;
    return nextTime;
  } else {
    return 0; // might not be necessary
  }
};

let date;
let nextDrinkTime = 0;

document.getElementById("app").innerHTML = `Loading...`

document.getElementById("disable-alert").addEventListener("click", ()=>{
  disabledAlerts = !disabledAlerts;
  disabledAlerts ? document.getElementById("disable-alert").innerHTML = `Enable Alerts` : document.getElementById("disable-alert").innerHTML = `Disable Alerts`;
  
})

document.getElementById("disable-sound").addEventListener("click", ()=>{
  disabledSound = !disabledSound
  disabledSound ? document.getElementById("disable-sound").innerHTML = `Enable Sound` : document.getElementById("disable-sound").innerHTML = `Disable Sound`
})

setInterval(() => {
  if(!contentLoaded){
    contentLoaded = true;
    
  }else{
    document.getElementById("app").innerHTML = ``

    nextDrinkTime = foundDrinkTime ? nextDrinkTime : findNextDrinkTime();
  
    date = new Date();
    document.getElementById("time").innerHTML = date.toLocaleTimeString();
    document.getElementById("next-drink-time").innerHTML = `next time to drink: ` + new Date(nextDrinkTime).toLocaleTimeString();
    console.log(date.toLocaleTimeString() +" asd " +new Date(nextDrinkTime).toLocaleTimeString());
  
    if (date.toLocaleTimeString() === new Date(nextDrinkTime).toLocaleTimeString()) {
      
      let alertThing = disabledAlerts ? ()=> {return 0;} : ()=>{return alert("Drink water!")};
      let soundThing = disabledSound ? ()=>{return null} : ()=>{return new Audio("sounds/time-is-now.ogg").play();}
      alertThing();
      soundThing();
    } else if (date.getTime() > nextDrinkTime) {
      foundDrinkTime = false;
    }
  } 
}, 1000);

