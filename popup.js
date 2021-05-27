// Initialize butotn with users's prefered color
// let changeColor = document.getElementById("changeColor");
let submit = document.getElementById("submit");
document.addEventListener('DOMContentLoaded', documentEvents, false);


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
    console.log("tag : " + donation.tag);
    // TODO: add code to save info to chrome storage 

    var defaultValue = [];
    chrome.storage.sync.get({donations: defaultValue}, function(data) {
      console.log(data)
      console.log(typeof(data))
      console.log(data.donations)
      console.log(typeof(data.donations))
      data.donations.push(donation)

      console.log("data.donations: " + data.donations)

      chrome.storage.sync.set({donations: data.donations}, function() {
        console.log("stored data!")
        // The value is now stored, so you don't have to do this again
      });
    });


    // chrome.storage.sync.get(["donations"], function(result) {
    //   var array = result[storagekey]?result[storagekey]:[];

    //   array.unshift(newArrEntry);

    //   var jsonObj = {};
    //   jsonObj[storagekey] = array;
    //   chrome.storage.sync.set(jsonObj, function() {
    //       console.log("Saved a new array item");
    //   });
    // }); 

    // chrome.storage.sync.set({"charities": charity_name}, function() {
    //   console.log('Value is set to ' + value);
    // });
}

function documentEvents() {    
  submit.addEventListener('click', 
    function() { 
      var charity_name = document.getElementById('charity_name').value
      var amount = document.getElementById('amount').value 
      var tags = document.getElementsByName('tag')

      var tag = ""
      for (var i = 0, length = tags.length; i < length; i++) {
        if (tags[i].checked) {
          // do whatever you want with the checked radio
          tag = tags[i].value
      
          // only one radio can be logically checked, don't check the rest
          break;
        }
      }

      var donation = {
        "charity_name": charity_name,
        "amount": amount,
        "tag": tag,
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
document.getElementById('optionsBtn').addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
})
