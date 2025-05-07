let baseurl="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
let amount=document.querySelector(".amount input");
for(let select of dropdowns){
  for(currcode in countryList){
    let newopt=document.createElement("option");
    newopt.innerText=currcode;
    newopt.value=currcode;
    if(select.name==="from" && currcode==="USD"){
      newopt.selected="selected";

  }
  else if(select.name==="to" && currcode==="INR"){
    newopt.selected="selected";
  }
  select.append(newopt);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
const updateFlag=(element)=>{
  let currCode=element.value;
  let countryc=countryList[currCode];
  console.log(countryc);
  let nsrc=`https://flagsapi.com/${countryc}/flat/64.png`;
  let img=element.parentElement.querySelector("img");
  img.src=nsrc;
};

const updatecurrency=async()=>{
  let amtval=amount.value;
  if(amtval==="" || amtval<1){
    amtval=1;
    amount.value="1";
  }
  const URL=`${baseurl}/${fromCurr.value.toLowerCase()}.json`;
  let res=await fetch(URL);
  let data=await res.json();
  let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  console.log(rate);
  let finalamt=amtval*rate;
  msg.innerText=`${amtval} ${fromCurr.value} = ${finalamt} ${toCurr.value}`;
};

window.addEventListener("load", () => {
  updatecurrency();});
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updatecurrency();
});






