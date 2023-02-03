export class Authenticate {
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

            return this.sessionId;
        } catch (error) {
            console.log(error);
        }
    }
}