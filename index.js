import { DeviceApi } from "./deviceapi.js";


const run = async () => {
    let api = new DeviceApi();
    await api.authenticateUser();
    await api.getDevices();

    await api.getEvents();

    // await api.handleCommand("deviceId", "on");

}

run();