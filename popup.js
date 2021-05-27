// Initialize butotn with users's prefered color
// let changeColor = document.getElementById("changeColor");
let submit = document.getElementById("submit");
document.addEventListener('DOMContentLoaded', documentEvents  , false);


// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

// When the button is clicked, inject setPageBackgroundColor into current page
// changeColor.addEventListener("click", async () => {
//   var charity_name = document.getElementById('charity_name').value
//   var amount = document.getElementById('amount').value 
//   var tag = document.getElementById('tag').value

//   var donation = {
//     "charity_name": charity_name,
//     "amount": amount,
//     "tag": tag,
//     "date": Date()
//   }

//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: setPageBackgroundColor(donation),
//   });
// });

function addDonation(donation) { 
    console.log("donation value is : " + donation);
    console.log("charity name: " + donation.charity_name);
    // TODO: add code to save info to chrome storage 
}

function documentEvents() {    
  submit.addEventListener('click', 
    function() { 
      var charity_name = document.getElementById('charity_name').value
      var amount = document.getElementById('amount').value 

      var donation = {
        "charity_name": charity_name,
        "amount": amount,
        "tag": "temp",
        "date": Date()
      }
      addDonation(donation);
  });

  // you can add listeners for other objects ( like other buttons ) here 
}

// submit.addEventListener("click", async() => {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//   var charity_name = document.getElementById('charity_name').value
//   var amount = document.getElementById('amount').value 
//   var tag = document.getElementById('tag').value

//   var donation = {
//     "charity_name": charity_name,
//     "amount": amount,
//     "tag": tag,
//     "date": Date()
//   }

//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: addDonation,
//   });


//   console.log("object: " + donation)

// //   chrome.storage.sync.get(["storagekey"], function(result) {
// //     var array = result[storagekey]?result[storagekey]:[];

// //     array.unshift(newArrEntry);

// //     var jsonObj = {};
// //     jsonObj[storagekey] = array;
// //     chrome.storage.sync.set(jsonObj, function() {
// //         console.log("Saved a new array item");
// //     });
// // });

// //   chrome.storage.sync.set({"charities": charity_name}, function() {
// //     console.log('Value is set to ' + value);
// //   });
// });

// The body of this function will be execuetd as a content script inside the
// current page
function setPageBackgroundColor() {
  console.log("changed color")

  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
