window.addEventListener('load', function() {
  const randomString = generateRandomString(20);
  document.getElementById('string-random').textContent = randomString;

  // Create a new QRCode instance qrcode
  const qrcode = new QRCode(document.getElementById("qrcode"), {
    width: 256,
    height: 256,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  // Generate the QR code with the random string
  qrcode.makeCode(randomString);
});

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
