import React, { useEffect } from "react";
import { Button, Alert, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

//actions
import { resetAuth, forgotPassword } from "../../redux/actions";
import { RootState, AppDispatch } from "../../redux/store";

// components
import { VerticalForm, FormInput } from "../../components/";

import AuthLayout from "./AuthLayout";

interface UserData {
  username: string;
}

const ForgetPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  const { loading, passwordReset, resetPasswordSuccess, error } = useSelector(
    (state: RootState) => ({
      loading: state.Auth.loading,
      user: state.Auth.user,
      error: state.Auth.error,
      passwordReset: state.Auth.passwordReset,
      resetPasswordSuccess: state.Auth.resetPasswordSuccess,
    })
  );

  /*
   * form validation schema
   */
  const schemaResolver = yupResolver(
    yup.object().shape({
      username: yup.string().required(t("Veuillez entrer le matricule")),
    })
  );

  /*
   * handle form submission
   */
  const onSubmit = (formData: UserData) => {
    dispatch(forgotPassword(formData["username"]));
  };

  return (
    <>
      <AuthLayout
        helpText={t(
          "Entrez votre adresse e-mail et nous vous enverrons un e-mail avec des instructions pour réinitialiser votre mot de passe."
        )}
      >
        {resetPasswordSuccess && (
          <Alert variant="success">{resetPasswordSuccess.message}</Alert>
        )}

        {error && (
          <Alert variant="danger" className="my-2">
            {error}
          </Alert>
        )}

        {!passwordReset && (
          <VerticalForm onSubmit={onSubmit} resolver={schemaResolver}>
            <FormInput
              label={t("Matricule")}
              type="text"
              name="username"
              placeholder={t("Entrez votre matricule")}
              containerClass={"mb-3"}
            />

            <div className="d-grid text-center">
              <Button variant="primary" type="submit" disabled={loading}>
                {t("Réinitialiser le mot de passe")}
              </Button>
            </div>
          </VerticalForm>
        )}
      </AuthLayout>
    </>
  );
};

export default ForgetPassword;
