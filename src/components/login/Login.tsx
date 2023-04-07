import React, {useCallback, useEffect, useState} from "react";
import {
  InputContainer,
  LoginButton,
  LoginContainer,
  LoginInfoText,
  LoginInput,
  ValidationError,
    EmailLabel,
    PasswordLabel,
} from "./Login.styles";
import {AuthApi} from "../../api/AuthApi";
import { toast } from "react-toastify";
import {ACCESS_TOKEN} from "../../constants/constants";
import {useNavigate} from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);

  const navigate = useNavigate();

  const onLoginClicked = useCallback(async () => {
    try {
      const result = await AuthApi.signIn({
        email: email,
        password: password,
      });
      localStorage.setItem(ACCESS_TOKEN, result.data.token);
      toast.success("Poprawnie zalogowano", {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/");
    } catch (error: any) {
      let errorMessage;

      if (error.response && error.response.status === 401) {
        errorMessage = "Podałeś błędne dane, spróbuj ponownie.";
      } else {
        errorMessage = "Wystąpił błąd podczas połączenia z serwerem.";
      }

      toast.error(errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [email, password, navigate]);


  useEffect(() => {
    setIsEmailValid(email.length > 0);
  }, [email]);

  useEffect(() => {
    setIsPasswordValid(password.length > 0);
  }, [password]);

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };


  return (
    <LoginContainer>
      <LoginInfoText>Login</LoginInfoText>
      <InputContainer>
        <EmailLabel>Email</EmailLabel>
        <LoginInput
          placeholder="Email"
          type="email"
          onChange={(e) => onEmailChange(e)}
        ></LoginInput>
        {!isEmailValid && (
          <ValidationError>Wpisz Email</ValidationError>
        )}
        <PasswordLabel>Hasło</PasswordLabel>
        <LoginInput
          onChange={(e) => onPasswordChange(e)}
          placeholder="Hasło"
          type="password"
        ></LoginInput>
        {!isPasswordValid && <ValidationError>Wpisz hasło</ValidationError>}
        <LoginButton
          disabled={!isEmailValid || !isPasswordValid}
          onClick={onLoginClicked}
        >
          Zaloguj się
        </LoginButton>
      </InputContainer>
    </LoginContainer>
  );
};
