import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// components
import AuthLayout from "./AuthLayout";

import mailSent from "../../assets/images/mail_sent.png";


const Confirm2 = () => {
  const { t } = useTranslation();

  return (
    <>
      <AuthLayout>
        <div className="text-center">
          <img src={mailSent} alt="mail sent" height="64" />
          <h3>{t("Success !")}</h3>
          <p className="text-muted font-14 mt-2">
            {t("A email has been send to ")}
            <b>{t("youremail@domain.com")}</b>
            {t(
              "Please check for an email from company and click on the included link to reset your password."
            )}
          </p>
          <Link
            to="/auth/login2"
            className="btn w-100 btn-primary waves-effect waves-light mt-3"
          >
            {t("Back to Home")}{" "}
          </Link>
        </div>
      </AuthLayout>
    </>
  );
};

export default Confirm2;
