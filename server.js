const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

function encryptMessage(message, shiftAmount = 2) {
    return message
        .split('')
        .map(char => {
            const code = char.charCodeAt(0);

            if (code >= 65 && code <= 90) {
                return String.fromCharCode(((code - 65 + shiftAmount) % 26) + 65);
            }

            if (code >= 97 && code <= 122) {
                return String.fromCharCode(((code - 97 + shiftAmount) % 26) + 97);
            }

            return char;
        })
        .join(''); 
}

function decryptMessage(message, shiftAmount = 2){
    return message
    .split('')
    .map(char => {
        const code = char.charCodeAt(0);

        if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 - shiftAmount + 26) % 26) + 65);
        }

        if (code >= 97 && code <= 122) {
            return String.fromCharCode(((code - 97 - shiftAmount + 26) % 26) + 97);
        }

        return char;
    })
    .join(''); 
}

app.post('/encrypt', (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const encryptedMessage = encryptMessage(message);
    res.json({ encryptedMessage });
});

app.post('/decrypt', (req, res) => {
    const { message } = req.body;

    console.log(message);

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const decryptedMessage = decryptMessage(message);
    res.json({ decryptedMessage });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
