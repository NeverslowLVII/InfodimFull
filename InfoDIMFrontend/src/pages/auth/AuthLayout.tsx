import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

// //import logoDark from "../../assets/images/logo-dark.png";
// //import logoLight from "../../assets/images/logo-light.png";

interface AccountLayoutProps {
  helpText?: string;
  isCombineForm?: boolean;
  children?: any;
}

const AuthLayout = ({
  helpText,
  children,
  isCombineForm,
}: AccountLayoutProps) => {
  useEffect(() => {
    if (document.body)
      document.body.classList.add(
        "authentication-bg",
        "authentication-bg-pattern"
      );

    return () => {
      if (document.body)
        document.body.classList.remove(
          "authentication-bg",
          "authentication-bg-pattern"
        );
    };
  }, []);

  return (
    <>
      <div className="account-pages mt-5 mb-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={isCombineForm ? 9 : 4}>
              <Card className="bg-pattern">
                <Card.Body className="p-4">
                  <div className="text-center w-75 m-auto">
                    <div className="auth-brand">
                      <div className="text-center" style={{ fontSize: '2em' }}>
                          InfoDIM
                      </div>
                    </div>
                    <p className="text-muted mb-4 mt-3">{helpText}</p>
                  </div>
                  {children}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

    </>
  );
};

export default AuthLayout;