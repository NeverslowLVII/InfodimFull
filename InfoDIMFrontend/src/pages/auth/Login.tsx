import React, { useState, useEffect } from "react";
import { Button, Alert} from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

// actions
import { resetAuth } from "../../redux/actions";

// store
import { RootState, AppDispatch } from "../../redux/store";

// components
import { VerticalForm, FormInput } from "../../components/";

import AuthLayout from "./AuthLayout";

interface UserData {
  username: string;
  password: string;
}

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState(null);

  const { userLoggedIn, loading, error } = useSelector(
    (state: RootState) => ({
      loading: state.Auth.loading,
      error: state.Auth.error,
      userLoggedIn: state.Auth.userLoggedIn,
    })
  );

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  /*
  form validation schema
  */
  const schemaResolver = yupResolver(
    yup.object().shape({
      username: yup.string().required(t("Veuillez entrer le matricule")),
      password: yup.string().required(t("Veuillez entrer le mot de passe")),
    })
  );

  /*
  handle form submission
  */
  const onSubmit = async (formData: UserData) => {
    try {
      // Récupérer le token CSRF
      const csrfResponse = await fetch('http://localhost:3333/csrf-token');
      const { csrfToken } = await csrfResponse.json();

      const response = await fetch('http://localhost:3333/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'csrf-token': csrfToken  // Inclure le token CSRF dans le header
        },
        body: JSON.stringify({
          matricule: formData["username"],
          password: formData["password"]
        })
      });

      if (!response.ok) {
        throw new Error('Erreur de réseau lors de la tentative de connexion');
      }
      else{
        console.log("Connexion réussie")
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Erreur d\'authentification', error);
    }
  };

  const location = useLocation();
  //
  // const redirectUrl = location.state && location.state.from ? location.state.from.pathname : '/';
  const redirectUrl = location?.search?.slice(6) || "/";

  return (
    <>
      {(userLoggedIn || user) && <Navigate to={redirectUrl}></Navigate>}

      <AuthLayout
        helpText={t(
          "Entrez votre matricule et votre mot de passe pour accéder au site d'information."
        )}
      >
        {error && (
          <Alert variant="danger" className="my-2">
            {error}
          </Alert>
        )}

        <VerticalForm<UserData>
          onSubmit={onSubmit}
          resolver={schemaResolver}
          defaultValues={{ username: "test", password: "test" }}
        >
          <FormInput
            label={t("Matricule")}
            type="text"
            name="username"
            placeholder="Entrez votre matricule"
            containerClass={"mb-3"}
          />
          <FormInput
            label={t("Mot de passe")}
            type="password"
            name="password"
            placeholder="Entrez votre mot de passe"
            containerClass={"mb-3"}
          ></FormInput>

          <div className="text-center d-grid">
            <Button variant="primary" type="submit" disabled={loading}>
              {t("Se connecter")}
            </Button>
          </div>
        </VerticalForm>
      </AuthLayout>
    </>
  );
};

export default Login;
