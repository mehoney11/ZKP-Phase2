//npm install qr-scanner
var strReceived;
let scannedQRCodes = [];
//import QRCode from 'qrcode'; --> QR code isnt genereating Error :unexpected identifier QRCode.import call expects one or two arguments." 
function generateRandomStringArray() {
  let length = 20;
  let characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = [];
  const charactersLength = characterSet.length;
  for (let i = 0; i < 100; i++) {
    let str = '';
    for (let j = 0; j < length; j++) {
      str += characterSet.charAt(Math.floor(Math.random() * charactersLength));
    }
    result.push(str);
  }
  return result;
}

window.onload = function() {
 // document.getElementById("qrcode").innerHTML = "";
// Get the button element
let generateButton = document.getElementById('button-qr-generation');
document.getElementById("qrcode").innerHTML = "";
// Add a click event listener to the button
generateButton.addEventListener('click', function(event) {
  document.getElementById("qrcode").innerHTML = "";
  // Generate an array of 2 random strings
  const randomStringArray = generateRandomStringArray();

  // Update the content of the 'string-random' element with the random string array
 document.getElementById('string-random').textContent = randomStringArray.join(",");

  // Create a new QRCode instance
  const qrcode = new QRCode(document.getElementById("qrcode"), {
    width: 512,
    height: 512,
    colorDark: "#000000",
    colorLight: "#FDBB30",
    
    correctLevel: QRCode.CorrectLevel.L
  });

  // Generate the QR code with the random strings
  qrcode.makeCode(randomStringArray.join(","));
});
}


const video = document.getElementById('camera');
// Use navigator.mediaDevices.getUserMedia() to access the camera
function startQRScanner(){
navigator.mediaDevices.getUserMedia({ video: true })
  .then(function (stream) {
    // Display the camera stream in the video element
    video.srcObject = stream;
    video.play();
    
    // Use the qr-scanner library to decode the QR code
    const qrScanner = new QrScanner(video, result => {
      scannedQRCodes= result.textContent;
      document.getElementById('strReceievedDislay').textContent = scannedQRCodes.join(",");

      qrScanner.stop(); // Stop scanning after the code is detected
    });
    qrScanner.start();
  })
  .catch(function (error) {
    console.log("Error accessing camera: " + error.message);
  });
}
const buttonScan = document.getElementById('button-qr-scanner');
buttonScan.addEventListener('click', startQRScanner);

