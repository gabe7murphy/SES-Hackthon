
// Initialize butotn with users's prefered color
let submit = document.getElementById("submit-btn");
let form = document.getElementById("donationForm");
document.addEventListener('DOMContentLoaded', documentEvents, false);
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
});

function addDonation(donation) {
  console.log("donation value is : " + donation.amount);
  console.log("charity name: " + donation.charity_name);
  console.log("tag : " + donation.tag);
  // TODO: add code to save info to chrome storage 

  var defaultValue = [];
  chrome.storage.sync.get({ donations: defaultValue }, function (data) {
    console.log(data)
    console.log(typeof (data))
    console.log(data.donations)
    console.log(typeof (data.donations))
    data.donations.push(donation)

    console.log("data.donations: " + data.donations)

    chrome.storage.sync.set({ donations: data.donations }, function () {
      console.log("stored data!")
      // The value is now stored, so you don't have to do this again
    });
  });
}

async function sendData(data) {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': 'Q3Uzd3Jua0JXZkFhN3lpc2xMMkw6emxWOGNhZUFUSXU4eW5zaEkzVnF3QQ',
    'Accept': 'application/json'
  }
  const url = "http://localhost:9200/donations2/_doc"
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: 'same-origin', // include, *same-origin, omit
    headers:  ({
      Accept: "application/json",
      "Content-Type": "application/json",
      'Authorization': 'Q3Uzd3Jua0JXZkFhN3lpc2xMMkw6emxWOGNhZUFUSXU4eW5zaEkzVnF3QQ'
     })
,
    //redirect: 'follow', // manual, *follow, error
    //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  }
  )
  // if (response.ok) {
  //   let JSON = await response.json()
  //   console.log(JSON)
  // }
  return response
}





function documentEvents() {
  submit.addEventListener('click', () => {

    var charity_input = document.getElementById("charity_name");
    var amount_input = document.getElementById("amount");
    var charity_name = charity_input.value.trim().toLowerCase();
    var amount = amount_input.value.trim();
    var tag = document.getElementById("org-select").value;


    charity_name === "" ? charity_input.classList.add("is-invalid") : charity_input.classList.remove("is-invalid");
    amount === "" ? amount_input.classList.add("is-invalid") : amount_input.classList.remove("is-invalid");

    if ((charity_name === "") || (amount === ""))
      return;

    var donation = {
      "charity_name": charity_name,
      "amount": amount,
      "tag": tag,
      "date": Date()
    }
    charity_input.value = "";
    amount_input.value = "";
    addDonation(donation);
    //send_elasticAPI(donation);
    sendData(donation)
      .then(data => console.log(data))
      .catch(error => console.log(error));
  });

  // you can add listeners for other objects ( like other buttons ) here 
}


document.getElementById('optionsBtn').addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
})
