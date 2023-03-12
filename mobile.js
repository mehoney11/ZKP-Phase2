const net = require('net');
const crypto = require('crypto');

const PORT = 3000;
const HOST = '127.0.0.1';
const NUM_CHALLENGES = 10;

const client = new net.Socket();

client.connect(PORT, HOST, function() {
  console.log('Connected to server');
});

const jsonObject = {
  mobileId: "9876543210",
  fixedId: "0123456789",
  swapList: [// Add more swap indices as needed 
]
};

console.log(jsonObject);

function initiateChallenge() {
  const randomStr = generateRandomString(20);
  console.log(`Sending string: ${randomStr}`);
  client.write(randomStr);
}

function sendDone() {
  client.write('done');
}

// Perform the specified number of challenges
for (let i = 0; i < NUM_CHALLENGES; i++) {
  initiateChallenge();
}

client.on('data', function(data) {
  const dataArr = data.toString().trim().split(' ');
  if (dataArr.length === 3) {
    const idx1 = parseInt(dataArr[0]);
    const idx2 = parseInt(dataArr[1]);
    const newStr = dataArr[2];
    jsonObject.swapList.push([idx1, idx2]);
    newStr = swapRandomChars(generateRandomString);
    //console.log(`Swapped indices: ${idx1} ${idx2}`);
    console.log(`New string: ${newStr}`);
    client.write(newStr);
  } else if (data.toString().trim() === 'done') {
    //console.log('Swap list:', swapList);
    //console.log('Hash:', jsonToHash({ swapList }));
    client.destroy();
  } else {
    console.log(data.toString().trim());
    client.destroy();
  }
});

client.on('close', function() {
  console.log('Connection closed');
});

function jsonToHash(json) {
  const jsonString = JSON.stringify(json);
  const hash = crypto.createHash('sha256').update(jsonString).digest('hex');
  return hash;
}
function generateRandomString(len) {
  let str = '';
  for (let i = 0; i < len; i++) {
    str += String.fromCharCode(65 + Math.floor(Math.random() * 26));
  }
  return str;
}
function swapRandomChars(str) {
  const len = str.length;
  const idx1 = Math.floor(Math.random() * len);
  let idx2 = Math.floor(Math.random() * len);
  while (idx2 === idx1) {
      idx2 = Math.floor(Math.random() * len);
  }
  const arr = str.split('');
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  const newStr = arr.join('');
  const swapIndices = [idx1, idx2];
  return [newStr, swapIndices];
}