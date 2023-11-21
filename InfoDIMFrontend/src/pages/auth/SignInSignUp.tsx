import React, { useEffect } from "react";
import { Row, Col, Button, Alert } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

// actions
import { resetAuth, loginUser, signupUser } from "../../redux/actions";

import { RootState, AppDispatch } from "../../redux/store";

// components
import { VerticalForm, FormInput } from "../../components/";

import AuthLayout from "./AuthLayout";

interface UserData {
  username: string;
  loginpassword: string;
  password: string;
  fullname: string;
  email: string;
}

const SignInSignUp = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const { user, userSignUp, loading, error } = useSelector(
    (state: RootState) => ({
      user: state.Auth.user,
      loading: state.Auth.loading,
      error: state.Auth.error,
      userSignUp: state.Auth.userSignUp,
    })
  );

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  /*
    form validation schema
    */
  const loginSchema = yupResolver(
    yup.object().shape({
      username: yup.string().required(t("Veuillez entrer le nom d'utilisateur")),
      loginpassword: yup.string().required(t("Veuillez entrer le mot de passe")),
    })
  );

  const signUpSchema = yupResolver(
    yup.object().shape({
      password: yup.string().required(t("Veuillez entrer le mot de passe")),
      fullname: yup.string().required(t("Veuillez entrer le nom complet")),
      email: yup
        .string()
        .required("Veuillez entrer l'email")
        .email("Veuillez entrer un email valide"),
    })
  );

  /*
    handle form submission
    */
  const onSubmit = (formData: UserData) => {
    dispatch(loginUser(formData["username"], formData["loginpassword"]));
  };

  const onSignUp = (formData: UserData) => {
    dispatch(
      signupUser(formData["fullname"], formData["email"], formData["password"])
    );
  };

  return (
    <>
      {user ? <Navigate to="/"></Navigate> : null}

      {userSignUp ? <Navigate to={"/auth/confirm"}></Navigate> : null}

      <AuthLayout isCombineForm={true}>
        <Row>
          <Col lg={6}>
            <div className="p-sm-3">
              <h4 className="mt-0">{t("Se connecter")}</h4>
              <p className="text-muted mb-4">
                {t("Entrez votre nom d'utilisateur et votre mot de passe pour accéder à InfoDIM")}
              </p>
              {error && (
                <Alert variant="danger" className="my-2">
                  {error}
                </Alert>
              )}
              <VerticalForm<UserData>
                onSubmit={onSubmit}
                resolver={loginSchema}
                defaultValues={{ username: "test", loginpassword: "test" }}
              >
                <FormInput
                  label="Nom d'utilisateur"
                  type="text"
                  name="username"
                  placeholder="Entrez votre nom d'utilisateur"
                  containerClass={"mb-3"}
                />
                <FormInput
                  label="Mot de passe"
                  type="password"
                  name="loginpassword"
                  placeholder="Entrez votre mot de passe"
                  containerClass={"mb-3"}
                >
                  <Link
                    to="/auth/forget-password"
                    className="text-muted float-end"
                  >
                    <small>{t("Mot de passe oublié ?")}</small>
                  </Link>
                </FormInput>

                <div className="mb-3">
                  <Button
                    variant="primary"
                    type="submit"
                    className="btn btn-primary btn-sm float-sm-end"
                    disabled={loading}
                  >
                    {t("Connexion")}
                  </Button>
                  <FormInput
                    label="Se souvenir de moi"
                    type="checkbox"
                    name="checkbox"
                    containerClass={"pt-1"}
                  />
                </div>
              </VerticalForm>
            </div>
          </Col>

          <Col lg={6}>
            <div className="p-sm-3">
              <h4 className="mt-0">{t("Inscription gratuite")}</h4>
              <p className="text-muted mb-4">
                {t(
                  "Vous n'avez pas de compte ? Créez votre compte, cela prend moins d'une minute"
                )}
              </p>

              <VerticalForm
                onSubmit={onSignUp}
                resolver={signUpSchema}
                defaultValues={{}}
              >
                <FormInput
                  label={t("Nom complet")}
                  type="text"
                  name="fullname"
                  placeholder={t("Entrez votre nom")}
                  containerClass={"mb-3"}
                />
                <FormInput
                  label={t("Adresse e-mail")}
                  type="email"
                  name="email"
                  placeholder={t("Entrez votre email")}
                  containerClass={"mb-3"}
                />
                <FormInput
                  label={t("Mot de passe")}
                  type="password"
                  name="password"
                  placeholder={t("Entrez votre mot de passe")}
                  containerClass={"mb-3"}
                />

                <div className="mb-0">
                  <Button
                    variant="success"
                    type="submit"
                    className="btn btn-success btn-sm float-sm-end"
                    disabled={loading}
                  >
                    {t("Inscription")}
                  </Button>
                  <FormInput
                    label={t("J'accepte les termes et conditions")}
                    type="checkbox"
                    name="checkboxsignup"
                    containerClass={"pt-1"}
                  />
                </div>
              </VerticalForm>
            </div>
          </Col>
        </Row>
      </AuthLayout>
    </>
  );
};

export default SignInSignUp;
