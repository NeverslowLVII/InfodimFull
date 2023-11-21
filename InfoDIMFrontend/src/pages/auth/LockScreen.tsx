import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// components
import { VerticalForm, FormInput } from "../../components/";

import AuthLayout from "./AuthLayout";

import userImg from "../../assets/images/logo-dark-2.png";

interface UserData {
  password: string;
}


const LockScreen = () => {
  const { t } = useTranslation();

  /*
   * form validation schema
   */
  const schemaResolver = yupResolver(
    yup.object().shape({
      password: yup.string().required(t("Please enter Password")),
    })
  );

  /*
   * handle form submission
   */
  const onSubmit = (formData: UserData) => {
    console.log(formData["password"]);
  };

  return (
    <>
    <AuthLayout>
        <div className="text-center w-75 m-auto">
          <img
            src={userImg}
            alt=""
            height="88"
            className="rounded-circle shadow"
          />
          <h4 className="text-dark-50 text-center mt-3">{t("Bonjour !")}</h4>
          <p className="text-muted mb-4">
            {t("Entrez votre mot de passe pour accéder à InfoDIM")}
          </p>
        </div>
        <VerticalForm onSubmit={onSubmit} resolver={schemaResolver}>
          <FormInput
            label={t("Mot de passe")}
            type="password"
            name="password"
            placeholder={t("Entrez votre mot de passe")}
            containerClass={"mb-3"}
          />

          <div className="d-grid text-center">
            <Button variant="primary" type="submit">
              {t("Connexion")}
            </Button>
          </div>
        </VerticalForm>
      </AuthLayout>
    </>
  );
};

export default LockScreen;
