import { Description } from "./Description"

export type Tooth = {
    number: number,
    description: string,
    descriptions: Description[],
    cavity : boolean,
    rootCanal : boolean,
    forObservation:boolean,
    caries:boolean,
    secondaryCaries:boolean,
    filling:boolean,
    prostheticCrown:boolean,
    channelsFilledCorrectly:boolean,
    channelNotCompleted:boolean,
    periapicalChange:boolean,
    crownRootInsert:boolean,
    supragingivalCalculus:boolean,
    subgingivalCalculus:boolean,
    impactedTooth:boolean,
    noTooth:boolean,
    microdonticTooth:boolean,
    developmentalDefect:boolean,
    pathologicalClash:boolean
}