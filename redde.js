const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin:['http://localhost:3000','http://172.20.10.5:8081','http://172.20.10.6:3000','http://172.20.10.9:8081','http://172.20.10.9:3000','http://192.168.56.1:8081'],
    credentials : true
} 
));
app_id = "20"; //Enter Your App ID Here
api_key = "sL5TyxtS2hEBnwYc4jAdDf7g6K9WeMkuCGvpbqHzZFrXaUmNQP"; //Enter Your Api Key Here


class ReddeApi {
    constructor(apikey, appid) {
        this.apikey = apikey;
        this.appid = appid;
    }

    clientRef(len) {
        const chars = '123456789';
        let result = '';
        for (let i = len; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }

    clientID(len) {
        const chars = '123456789abcdefghijklmnpqrstxyzABCDDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = len; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }

    async sendRequest(options) {
        try {
            console.log(options.data); // Add this line before calling axios in the sendRequest method

            const response = await axios(options);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    receiveMoney(amount, paymentoption, walletnumber, client_reference, client_id, description = "") {
        const options = {
            method: 'post',
            url: 'https://demoapi.reddeonline.com/v1/receive/',
            headers: {
                'Content-Type': 'application/json',
                'ApiKey': this.apikey,
            },
            data: {
                amount,
                appid: this.appid,
                clientreference: client_reference,
                clienttransid: client_id,
                description,
                nickname: "wigal",
                paymentoption: paymentoption,
                walletnumber: walletnumber,
            },
        };
        return this.sendRequest(options);
    }

    sendMoney(amount, paymentoption, walletnumber, client_reference, client_id, description = "") {
        const options = {
            method: 'post',
            url: 'https://demoapi.reddeonline/v1/cashout',
            headers: {
                'Content-Type': 'application/json',
                'ApiKey': this.apikey,
            },
            data: {
                amount,
                appid: this.appid,
                clientreference: client_reference,
                clienttransid: client_id,
                description,
                nickname: "wigal",
                paymentoption: paymentoption,
                vouchercode: "",
                walletnumber: walletnumber,
            },
        };
        return this.sendRequest(options);
    }
}

// Instantiate ReddeApi class
const redde = new ReddeApi(api_key, app_id);

app.post("/receiveMoney", async (req, res) => {
    const { amount, paymentoption, walletnumber, description } = req.body;
    const client_reference = redde.clientRef(6);
    const client_id = redde.clientID(6);
    const response = await redde.receiveMoney(amount, paymentoption, walletnumber, client_reference, client_id, description);
    res.json(response);
    
});

app.post("/sendMoney", async (req, res) => {
    const { amount, payment_option, walletnumber, description } = req.body;
    const client_reference = redde.clientRef(6);
    const client_id = redde.clientID(6);
    const response = await redde.sendMoney(amount, paymentoption, walletnumber, client_reference, client_id, description);
    res.json(response);
});


const port = 3001;
app.listen(port, () => console.log(`Server running on port ${port}...`));
