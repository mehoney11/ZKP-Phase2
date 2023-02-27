// Get elements from the DOM
const qrContainer = document.getElementById('qr-container');
const qrContainer2 = document.getElementById('qr-container2');
const qrVideo = document.getElementById('qr-video');
const qrVideo2 = document.getElementById('qr-video2');
const qrText = document.getElementById('qr-text');
const qrText2 = document.getElementById('qr-text2');
const hashInput = document.getElementById('hash');
const hashInput2 = document.getElementById('hash2');

// Generate random strings of length 20
function generateRandomStrings() {
	let strings = [];
	for (let i = 0; i < 5; i++) {
		let string = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (let j = 0; j < 20; j++) {
			string += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		strings.push(string);
	}
	return strings;
}

// Generate QR code with random strings
function generateQR() {
	// Generate random strings
	const strings = generateRandomStrings();
	// Generate QR code with random strings
	const qr = new QRCode(qrContainer, {
		text: JSON.stringify(strings),
		width: 256,
		height: 256,
		colorDark : "#000000",
		colorLight : "#ffffff",
		correctLevel : QRCode.CorrectLevel.H
	});
	// Show step 2
	document.getElementById('step1').style.display = 'none';
	document.getElementById('step2').style.display = 'block';
	// Start scanning for QR code
	QRReader.init(qrVideo, function(result) {
		// Stop scanning for QR code
		QRReader.stop();
		// Show scanned QR code
		qrText.innerHTML = result;
		// Parse scanned QR code
		const scannedStrings = JSON.parse(result);
		// Swap positions of each string
		const indices = [];
		for (let i = 0; i < scannedStrings.length; i++) {
			const string = scannedStrings[i];
			const index1 = Math.floor(Math.random() * string.length);
			let index2 = Math.floor(Math.random() * string.length);
			while (index2 == index1) {
				index2 = Math.floor(Math.random() * string.length);
			}
			const newString = string.substring(0, Math.min(index1, index2)) +
				string.charAt(Math.max(index1, index2)) +
				string.substring(Math.min(index1, index2) + 1, Math.max(index1, index2)) +
				string.charAt(Math.min(index1, index2)) +
				string.substring(Math.max(index1, index2) + 1);
			scannedStrings[i] = newString;
			indices.push(index1 + ',' + index2);
		}
		// Generate QR code with swapped positions
		const qr2 = new QRCode(qrContainer2, {
			text: JSON.stringify(scannedStrings),
			width: 256,
			height: 256,
			colorDark : "#000000",
			colorLight : "#ffffff",
			correctLevel : QRCode.CorrectLevel.H
		});
		// Show step 3
		document.getElementById('step2').style.display = 'none';
		document.getElementById('step3').style.display = 'block';
		// Calculate hash of swapped indices
		const hash = CryptoJS.SHA256(indices.join()).toString();
		hashInput.value = hash;
	});
	QRReader.scan();
}
// Swap positions of each string and generate new QR code
function swap() {
	// Get strings from QR code
	const strings = JSON.parse(qrText.innerHTML);
	// Swap positions of each string
	const indices = [];
	for (let i = 0; i < strings.length; i++) {
		const string = strings[i];
		const index1 = Math.floor(Math.random() * string.length);
		let index2 = Math.floor(Math.random() * string.length);
		while (index2 == index1) {
			index2 = Math.floor(Math.random() * string.length);
		}
		const newString = string.substring(0, Math.min(index1, index2)) +
			string.charAt(Math.max(index1, index2)) +
			string.substring(Math.min(index1, index2) + 1, Math.max(index1, index2)) +
			string.charAt(Math.min(index1, index2)) +
			string.substring(Math.max(index1, index2) + 1);
		strings[i] = newString;
		indices.push(index1 + ',' + index2);
	}
	// Generate QR code with swapped positions
	const qr2 = new QRCode(qrContainer2, {
		text: JSON.stringify(strings),
		width: 256,
		height: 256,
		colorDark : "#000000",
		colorLight : "#ffffff",
		correctLevel : QRCode.CorrectLevel.H
	});
	// Show step 4
	document.getElementById('step3').style.display = 'none';
	document.getElementById('step4').style.display = 'block';
	// Calculate hash of swapped indices
	const hash = CryptoJS.SHA256(indices.join()).toString();
	hashInput2.value = hash;
}

// Compare hashes and show result
function compare() {
	const hash1 = hashInput.value;
	const hash2 = hashInput2.value;
	if (hash1 == hash2) {
		document.getElementById('result').innerHTML = 'Transaction successful!';
	} else {
		document.getElementById('result').innerHTML = 'Transaction failed!';
	}
	// Show step 5
	document.getElementById('step4').style.display = 'none';
	document.getElementById('step5').style.display = 'block';
}

// Start the demo
generateQR();
