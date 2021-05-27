// Initialize butotn with users's prefered color
let submit = document.getElementById("submit-btn");
let form = document.getElementById("donationForm");
document.addEventListener('DOMContentLoaded', documentEvents, false);
document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault();
});

function addDonation(donation) { 
    console.log("donation value is : " + donation.amount);
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
  submit.addEventListener('click', () => { 
      var charity_name = document.getElementById('charity_name').value;
      var amount = document.getElementById('amount').value;
      var tag = document.getElementById("org-select").value;
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


document.getElementById('optionsBtn').addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
})
