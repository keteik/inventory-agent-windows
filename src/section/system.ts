import { Systeminformation } from "systeminformation";
const si = require('systeminformation');

export type ISystem = {
    os: string,
    hardware: string,
}

export async function getSystem(): Promise<ISystem> {
    const uuidFull: Systeminformation.UuidData = await si.uuid();

    const { macs, ...uuid } = uuidFull;

    return uuid;
}