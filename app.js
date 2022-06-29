 const dropList = document.querySelectorAll(".drop-list select"),
 fromCurrency = document.querySelector(".from select"),
 toCurrency = document.querySelector(".to select"),
 getBtn = document.querySelector("form button");

 for(let i = 0; i < dropList.length; i++) {
    for(currency_code in country_code){
        // selecting USD by default as FROM currency and  NPR as TO  currency
        let selected;
        if(i == 0){
            selected = currency_code == "USD"? "selected" : "";
        }else if(i == 1){
            selected = currency_code == "NPR"? "selected" : "";
        }
        // creating option tag with passing currency code as a text and value
        let optionTag = `<option value="${currency_code}">${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    } 
    dropList[i].addEventListener("change", (e) => {
      loadTag(e.target);
    });
 }

function loadTag(element) {
  for(code in country_code){
    if(code == element.value){
       let imgTag = element.parentElement.querySelector("img");
       imgTag.src = `https://countryflagsapi.com/png/${country_code[code]}`;
    }
  }
}


 window.addEventListener("load", () => {
    getExchangeRate();
 });

 getBtn.addEventListener("click", e => {
  e.preventDefault(); // preventing Form from submitting
  getExchangeRate();
});

const exchangeRateIcon = document.querySelector(".drop-list .icon");
exchangeRateIcon.addEventListener("click", () => {
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  loadTag(fromCurrency);
  loadTag(toCurrency);
  getExchangeRate();
});

 function getExchangeRate(){
      const amount = document.querySelector(".amount input");
      const exchangerateTxt = document.querySelector(".exchange-rate");
      let amountVal = amount.value;
      // if user don't enter any value or enter 0 then we'll put 1 value by default 
      if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
      }
      exchangerateTxt.innerText = "Getting exchange rate...";
      let url = `https://v6.exchangerate-api.com/v6/53a4a85a7d5c988aaa8f65b7/latest/${fromCurrency.value}`;
      //fetching api response and return it with parsing into js obj and in another then method receiving that obj
      fetch(url).then(response => response.json()).then(result => {
        let exchangerate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountVal * exchangerate).toFixed(2);
        exchangerateTxt.innerText = `${amountVal} ${fromCurrency.value} =  ${totalExchangeRate} ${toCurrency.value}`;
      }).catch(() => {
        exchangerateTxt.innerText = "Something went wrong";
      });
 }