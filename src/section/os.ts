import { Systeminformation } from "systeminformation";
const si = require('systeminformation');

export interface IOs {
    platform: string;
    distro: string;
    release: string;
    codename: string;
    kernel: string;
    arch: string;
    hostname: string;
    serial: string
    build: string
}

export async function getOs(): Promise<IOs> {
    const osFull: Systeminformation.OsData = await si.osInfo();
    
    const { fqdn, codepage, logofile, servicepack, uefi, hypervisor, remoteSession,  ...os } = osFull;
    
    return os;
}