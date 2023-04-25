var strReceived;
let scannedQRCodes = [];


function generateRandomStringArray() {
  let length = 20;
  let characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = [];
  const charactersLength = characterSet.length;
  for (let i = 0; i < 50; i++) {
    let str = '';
    for (let j = 0; j < length; j++) {
      str += characterSet.charAt(Math.floor(Math.random() * charactersLength));
    }
    result.push(str);
  }
  return result;
}

window.onload = function() {
  let generateButton = document.getElementById('button-qr-generation');
  document.getElementById("qrcode").innerHTML = "";
  generateButton.addEventListener('click', function(event) {
    document.getElementById("qrcode").innerHTML = "";
    const randomStringArray = generateRandomStringArray();
    document.getElementById('string-random').textContent = randomStringArray.join(",");
    const qrcode = new QRCode(document.getElementById("qrcode"), {
      width: 512,
      height: 512,
      colorDark: "#000000",
      colorLight: "#FFFFFF",
      correctLevel: QRCode.CorrectLevel.L
    });
    qrcode.makeCode(randomStringArray.join(","));
  });
}

const video = document.getElementById('camera');

function startQRScanner(){
  navigator.mediaDevices.getUserMedia({ video: true })
  .then(function (stream) {
    video.srcObject = stream;
    video.play();
    const qrScanner = new QrScanner(video, result => {
      scannedQRCodes.push(result);
      document.getElementById('strReceievedDislay').textContent = scannedQRCodes.join(",");
      qrScanner.stop();
    });
    qrScanner.start();
  })
  .catch(function (error) {
    console.log("Error accessing camera: " + error.message);
  });
}
