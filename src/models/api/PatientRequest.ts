import dayjs from "dayjs";

export type PatientRequest = {
    clinicId: number,
    patientId:number,
    firstName: string,
    lastName: string,
    pesel: string,
    birthDate: string | undefined,
    email: string,
    phoneNumber: string
}