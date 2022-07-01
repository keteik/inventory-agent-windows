import { Systeminformation } from "systeminformation";
const si = require('systeminformation');

export interface ICpu {
    manufacturer: string;
    brand: string;
    vendor: string;
    family: string;
    speed: number;
    cores: number;
    physicalCores: number;
    socket: string;
}

export async function getCpu(): Promise<ICpu> {
    const cpuFull: Systeminformation.CpuData = await si.cpu();

    const { model, stepping, revision, voltage, speedMin, speedMax, governor, processors, flags, virtualization, cache, ...cpu } = cpuFull;

    return cpu;
}