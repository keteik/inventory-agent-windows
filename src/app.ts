import axios from 'axios';
import { getSystem } from './section/system';
import { getOs, IOs } from './section/os';
import { getCpu, ICpu } from './section/cpu';
import { getNetwork, INetwork } from './section/network';

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

function sendReport(data: Result): void {
    let url: string = 'http://localhost:3000/api/v1/device/';
    axios.post(url, data)
            .then((res: any) => {
                console.log(res.status, res.data);
            }).catch((err: any) => {
                if(err.response.status === 409) {
                    axios.put(url + data.hardwareUuid, data)
                            .then((res: any) => {
                                console.log(res.status, res.data)
                            });
                } else {
                    console.error(err);
                }
            });
}

getAllData().then((result: Result) => {
    sendReport(result);
}).catch((err) => {
    console.log(err);
})

