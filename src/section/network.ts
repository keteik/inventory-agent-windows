import { Systeminformation } from "systeminformation";
const si = require('systeminformation');

export interface INetwork {
    iface: string;
    ip4: string;
    ip4subnet: string;
    ip6: string;
    ip6subnet: string;
    mac: string;
    speed: number;
    dhcp: boolean;
}

export async function getNetwork(): Promise<INetwork> {
  

    const networkFull: Systeminformation.NetworkInterfacesData = await si.networkInterfaces("default");

    const { 
            ifaceName, 
            internal, 
            virtual,
            operstate, 
            type, 
            duplex, 
            mtu, 
            dnsSuffix, 
            ieee8021xAuth, 
            ieee8021xState, 
            carrierChanges, 
            ...network 
        } = networkFull;

    return network;
}



