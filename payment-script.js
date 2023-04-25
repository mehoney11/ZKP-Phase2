//payment site that recives notifiation from customer.html that hashes are depossited and on button click checks for hashes in server and returns true or false message in payment site div
/*var express = require('express');
var app = express();*/
/*
// Listen for messages from the customer.html page
window.addEventListener('message', function(event) {
  if (event.data.type === 'hashDeposited') {
    // Display an alert or notification to the user
    alert('Hash deposited');
  }
});
*/
// Send a GET request to the server to check for matching hash codes
function checkHashCodes(){
  fetch('http://localhost:9990/check')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const messageBox = document.querySelector('.main p');
    if (data.hasMatch) {
      messageBox.innerText = 'Dashcode\'s match found';
    } else {
      messageBox.innerText = 'No matching hashes found';
    }
  })
  .catch(error => {
    // Handle any errors that occur during the request
    console.error(error);
  });
}
/*
window.addEventListener("message", (event) => {
    // Check if the message/notification is from the expected sender
    if (event.origin !== window.location.origin) return;

    // Display the message/notification
    console.log(`Received message: ${event.data}`);
    
    // Send an "OK" message/notification back to the sender
    event.source.postMessage("OK", event.origin);
  });
  //function to check if hash is in server
  */
 /*
  <script>
      // Connect to Socket.io
      const socket = io();

      // Listen for the 'hashSubmitted' event
      socket.on('hashSubmitted', ({ sellerHash, customerHash }) => {
        // Send a GET request to the server to check for matching hashes
        const url = `/check-matching-hashes?sellerHash=${sellerHash}&customerHash=${customerHash}`;
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = () => {
          if (xhr.status === 200 && xhr.responseText === 'true') {
            // Display a message if the hashes match
            document.getElementById('status').textContent = 'The transaction is authentic!';
          } else {
            // Display a message if the hashes don't match
            document.getElementById('status').textContent = 'The transaction is not authentic.';
          }
        };
        xhr.send();
      });

      // Listen for the button click event
      document.getElementById('button').addEventListener('click', () => {
        // Send a GET request to the server to check for matching hashes in the bucket
        const url = `/check-bucket-matching-hashes`;
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = () => {
          if (xhr.status === 200 && xhr.responseText === 'true') {
            // Display a message if the hashes match
            document.querySelector('.main p').textContent = 'The hashes match!';
          } else {
            // Display a message if the hashes don't match
            document.querySelector('.main p').textContent = 'The hashes do not match.';
          }
        };
        xhr.send();
      });
    </script>

 */