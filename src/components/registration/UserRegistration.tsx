import React, {useEffect, useState} from "react";
import {UserApi} from "../../api/UserApi";
import {UserRegistrationData} from "../../models/api/UserRegistrationData";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {
    LoginButton, LoginForm,
    LoginHeader,
    LoginInputs,
    PasswordRecoveryLabel, StyledDatePickerMedium, StyledDatePickerSmall,
    StyledTextFieldMedium,
    StyledTextFieldSmall,
    ValidationError
} from "../login/Login.styles";
import { Grid, Link } from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";


const UserRegistration = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [repeatedPassword, setRepeatedPassword] = useState('')
    const [telNumber, setTelNumber] = useState('')
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
    const [isRepeatedPasswordValid, setIsRepeatedPasswordValid] = useState<boolean>(true);
    const [isDataValid, setIsDataValid] = useState<boolean>(false);
    const [pesel, setPesel] = useState('')
    const [birthDate, setBirthDate] =  useState<dayjs.Dayjs | null>(null);
    const navigate = useNavigate();

    const handleSubmit = () => {
        try{
            let user: UserRegistrationData = {
                firstName: firstName,
                lastName: lastName,
                pesel:pesel,
                birthDate:birthDate?.format("DD-MM-YYYY"),
                email: email,
                password: password,
                phoneNumber: telNumber
            }
            UserApi.registerUser(user).then(r => {
            })
            toast.success("Poprawnie zarejestrowano");
            navigate("/login");
        }catch (error){
            toast.error("Bład serwera")
        }
    }

    useEffect(() => {
        setIsRepeatedPasswordValid(validateRepeatedPassword(repeatedPassword));
        setIsEmailValid(validateEmail(email));
        setIsPasswordValid(validatePassword(password));
        setIsDataValid((isPasswordValid && isEmailValid && isRepeatedPasswordValid))
    }, [birthDate,pesel,repeatedPassword, email, password, isPasswordValid, isEmailValid,  isRepeatedPasswordValid]);

    const validateRepeatedPassword = (repeatedPassword: string) => {
        return password === repeatedPassword;
    };
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        return passwordRegex.test(password);
    }


    const onFirstnameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFirstName(event.target.value)
    }
    const onLastnameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLastName(event.target.value)
    }
    const onEmailChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEmail(event.target.value)
    }
    const onPasswordChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const onRepeatedPasswordChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setRepeatedPassword(event.target.value)
    }

    const onTelNumberChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setTelNumber(event.target.value)
    }
    const handleBirthdayChange = (date: dayjs.Dayjs | any) => {
        setBirthDate(date)
    }

    return (
        <LoginForm height={68}>

            <LoginHeader>
                Rejestracja
            </LoginHeader>

            <LoginInputs>
                <StyledTextFieldMedium label="Imię" size={"medium"} onChange={onFirstnameChange}/>
                <StyledTextFieldSmall label="Imię" size={"small"} onChange={onFirstnameChange}/>

                <StyledTextFieldMedium label="Nazwisko" size={"medium"} onChange={onLastnameChange}/>
                <StyledTextFieldSmall label="Nazwisko" size={"small"} onChange={onLastnameChange}/>

                <StyledTextFieldMedium label="PESEL" size={"medium"} onChange={(event) => setPesel(event.target.value)}/>
                <StyledTextFieldSmall label="PESEL" size={"small"} onChange={(event) => setPesel(event.target.value)}/>
                {pesel.length !== 11 && pesel.length !== 0 && <ValidationError>Błędny PESEL</ValidationError>}

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StyledDatePickerMedium label={"Data urodzenia"} slotProps={{textField:{size:"medium"}}} value={birthDate} format={"DD-MM-YYYY"} onChange={(date) => handleBirthdayChange(date)}/>
                    <StyledDatePickerSmall label={"Data urodzenia"} slotProps={{textField:{size:"small"}}} value={birthDate} format={"DD-MM-YYYY"} onChange={(date) => handleBirthdayChange(date)}/>
                </LocalizationProvider>


                <StyledTextFieldMedium label="Email" size={"medium"} type="email" onChange={onEmailChange}/>
                <StyledTextFieldSmall label="Email" size={"small"} type="email" onChange={onEmailChange}/>
                {!isEmailValid && email.length !== 0 && <ValidationError>Podaj poprawny adres email</ValidationError>}


                <StyledTextFieldMedium label="Hasło" type="password" size={"medium"} onChange={onPasswordChange}/>
                <StyledTextFieldSmall label="Hasło" type="password" size={"small"} onChange={onPasswordChange}/>
                {!isPasswordValid && password.length !== 0 && <ValidationError>Hasło musi mieć co najmniej 8 znaków i zawierać jedną cyfrę, jedną małą i jedną dużą literę</ValidationError>}

                <StyledTextFieldMedium label="Powtórz hasło" type="password" size={"medium"} onChange={onRepeatedPasswordChange}/>
                <StyledTextFieldSmall label="Powtórz hasło" type="password" size={"small"} onChange={onRepeatedPasswordChange}/>
                {!isRepeatedPasswordValid && password.length !== 0 && <ValidationError>Hasła nie są zgodne</ValidationError>}

                <StyledTextFieldMedium label="Numer telefonu" type="tel" size={"medium"} onChange={onTelNumberChange}/>
                <StyledTextFieldSmall label="Numer telefonu" type="tel" size={"small"} onChange={onTelNumberChange}/>

                <LoginButton onClick={handleSubmit} disabled={!isDataValid}>
                    Dołącz
                </LoginButton>

                <PasswordRecoveryLabel container color={"white"}>
                    <Grid>
                        <Link href="#" variant="body2">
                            Nie pamiętasz hasła?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="/login" variant="body2">
                            {"Masz już u nas konto? Zaloguj się "}
                        </Link>
                    </Grid>
                </PasswordRecoveryLabel>

            </LoginInputs>

        </LoginForm>

    );




}
export default UserRegistration;