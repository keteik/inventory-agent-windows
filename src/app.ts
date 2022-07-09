import axios, { AxiosResponse, ResponseType } from 'axios';
import { getSystem } from './section/system';
import { getOs, IOs } from './section/os';
import { getCpu, ICpu } from './section/cpu';
import { getNetwork, INetwork } from './section/network';
import { sortAndDeduplicateDiagnostics } from 'typescript';

interface Result {
    osUuid: string;
    hardwareUuid: string;
    os: IOs,
    cpu: ICpu
    network: INetwork
}

async function getAllData(): Promise<Result> {

    let result = {} as Result;
    
    try {
        await Promise.all([
            getSystem().then((system) => {
                result.osUuid = system.os;
                result.hardwareUuid = system.hardware;
            }),
            getOs().then((os) => {
                result.os = os;
            }),
            getCpu().then((cpu) => {
                result.cpu = cpu;
            }),
            getNetwork().then((network) => {
                result.network = network;
            })
        ])
    } catch(err) {
        console.error(err);
    }
    
    return result;
}

async function sendReport(data: Result): Promise<void> {
    let url: string = 'http://localhost:3000/api/v1/device/';

    try {
        let res = await axios.put(url + data.hardwareUuid, data);

        console.log(`Code: ${res.status}`);
        console.log(`Status: ${res.data.status}`); 
        console.log(`Info: ${res.data.message}`); 
    } catch(err: any) {
        if(err.response.status !== 404)
            console.error(err);
        
        try {
            let res = await axios.post(url, data);

            console.log(`Code: ${res.status}`);
            console.log(`Status: ${res.data.status}`); 
            console.log(`Info: ${res.data.message}`); 
        } catch(err) {
            console.error(err);
        }
    }
}

async function app() {
    const data: Result = await getAllData();
    sendReport(data);
}

app();

