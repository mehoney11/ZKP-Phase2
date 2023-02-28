imo
let qrContentInput = document.getElementById("qr-content");
let qrGenerationForm =
document.getElementById("generate-random-qrcode").addEventListener("click", function () {
    // Generate random string
    let randomString = generateRandomString();
    
    if (qrCode == null) {
      // Generate code initially
      qrCode = generateQrCode(randomString);
    } else {
      // If code already generated then make
      // again using same object
      qrCode.makeCode(randomString);
    }
  });
  
let qrCode;
 
function generateQrCode(qrContent) {
  return new QRCode("qr-code", {
    text: qrContent,
    width: 256,
    height: 256,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
}
function generateRandomString() {
    let length = 20;
    let characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = '';
    const charactersLength = characterSet.length;
    for (let i = 0; i < length; i++) {
      result += characterSet.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
 
function qrToString() {
  alert("Hello World!");
}

  
 /*
// Event listener for form submit event
qrGenerationForm.addEventListener("submit", function (event) {
  // Prevent form submission
  event.preventDefault();
  let qrContent = qrContentInput.value;
  if (qrCode == null) {
       
    // Generate code initially
    qrCode = generateQrCode(qrContent);
  } else {
       
    // If code already generated then make
    // again using same object
    qrCode.makeCode(qrContent);
  }
});*/