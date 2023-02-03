import axios from "axios";
import * as fs from 'fs';

export class DeviceApi {
    sessionId = "";
    constructor() {
        const port = 8083;
        const host = "192.168.1.222";
        this.jsAPI = `http://${host}:${port}/ZAutomation/api/v1`;
    }

    async authenticateUser() {
        try {
            let data = {
                login: "admin",
                password: "123456"
            }
            const config = {
                method: "post",
                url: this.jsAPI + "/login",
                headers: {},
                data: data,
            };

            let response = await axios(config);
            this.sessionId = response.data.data.sid;
        } catch (error) {
            console.log(error);
        }
    }

    async getDevices() {
        try {
            const config = {
                method: "get",
                url: this.jsAPI + "/devices",
                headers: {
                    "ZWAYSession": this.sessionId
                },
            };
            let response = await axios(config);
            // Get the current date as a string in ISO format (2023-01-30T15:37:00.477Z)
            const date = new Date().toISOString();

            let fileName = "devices-" + date + ".json"

            fs.writeFileSync(fileName, JSON.stringify(response.data.data.devices), 'utf8', function (error) {
                if (error) {
                    console.error("write error:  " + error.message);
                } else {
                    console.log("Successful Write to " + fileName);
                }
            });

        } catch (error) {
            console.log(error);
        }
    }

    async getEvents() {

        try {
            const config = {
                method: "get",
                url: this.jsAPI + "/notifications",
                headers: {
                    "ZWAYSession": this.sessionId
                },
            };
            let response = await axios(config);
            // Get the current date as a string in ISO format (2023-01-30T15:37:00.477Z)
            const date = new Date().toISOString();

            let fileName = "events" + date + ".json"

            fs.writeFileSync(fileName, JSON.stringify(response.data.data.notifications), 'utf8', function (error) {
                if (error) {
                    console.error("write error:  " + error.message);
                } else {
                    console.log("Successful Write to " + fileName);
                }
            });

        } catch (error) {
            console.log(error);
        }
    }

    async handleCommand(deviceId, command) {
        try {
            const config = {
                method: "post",
                url: `${this.jsAPI}/devices/${deviceId}/command/${command}`,
                headers: {
                    "ZWAYSession": this.sessionId
                },
            };
            let response = await axios(config);

        } catch (error) {
            console.log(error);

        }
    }
}
