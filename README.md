# Zkp
zip - QR code scan - using two mobiles
**aim**
The project is a demonstration of Zero Knowledge Proof authentication where a seller and a customer can exchange sensitive information without revealing it to each other. The payment site acts as a mediator to facilitate the exchange and verifies that the information provided by both parties is valid without actually seeing the information itself. The flow involves the seller and customer scanning QR codes, swapping positions of strings, creating hashes, and sending them to the server. The server stores the hashes in a hashmap and the payment site checks for matching hashes and displays the result.
**Overview**

This project consists of three web pages: customer.html, seller.html, and payment.html, and a server.js file.

The customer.html and seller.html pages allow users to scan QR codes, swap strings, and create a new string that is then converted to a hash and sent to the server.js file.

The payment.html page checks if the hashes from the seller.html and customer.html pages match. If a match is found, a message is displayed indicating that a matching hash was found. If no match is found, a message is displayed indicating that no matching hashes were found.

**Technologies Used**

HTML
CSS
JavaScript
Node.js
Express.js
Socket.io


**Functionality**

customer.html
The customer.html page consists of a form with a text input field and a submit button. Users can scan a QR code containing a string, which is then displayed in the input field. The user can then swap the positions of the characters in the string, and submit the form. The swapped string is then hashed and sent to the server.js file. The customer.html page also sends a notification to the payment.html page indicating that a hash has been submitted to the server.js file.

seller.html
The seller.html page is similar to the customer.html page. Users can scan a QR code containing a string, which is then displayed in the input field. The user can then swap the positions of the characters in the string, and submit the form. The swapped string is then hashed and sent to the server.js file. The seller.html page also sends a notification to the payment.html page indicating that a hash has been submitted to the server.js file.

server.js
The server.js file receives the hashes from the customer.html and seller.html pages and stores them in a hashmap. The server.js file also provides a route /check that allows the payment.html page to check if there is a match between the hashes submitted by the customer.html and seller.html pages.

payment.html
The payment.html page displays a message indicating that it is waiting for hashes. When the customer.html and seller.html pages submit hashes to the server.js file, the payment.html page receives a notification and then checks if the hashes match. If a match is found, a message is displayed indicating that a matching hash was found. If no match is found, a message is displayed indicating that no matching hashes were found.

**Flow**

The customer.html and seller.html pages are loaded in the browser.
Users scan QR codes and swap the positions of the characters in the string.
The swapped string is hashed and sent to the server.js file.
The server.js file stores the hashes in a hashmap.
The customer.html and seller.html pages send notifications to the payment.html page indicating that hashes have been submitted to the server.js file.
The payment.html page checks if the hashes match.
If a match is found, a message is displayed indicating that a matching hash was found. If no match is found, a message is displayed indicating that no matching hashes were found.

**Conclusion**

Overall, the project showcases the potential of Zero Knowledge Proof authentication in providing secure and private authentication without the need for exchanging sensitive information. This could have practical applications in various industries, such as finance, healthcare, and government.
