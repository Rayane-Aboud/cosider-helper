"use client"

import { useState } from "react"
import { Container, Row, Col, Form, Button, Image, Alert } from "react-bootstrap"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import "bootstrap/dist/css/bootstrap.min.css"
import "./LoginPage.css"
import { poles } from "../utils/data" // Import poles from data.js

export default function LoginPage({ onLogin }) {
  const [validated, setValidated] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("Identifiants incorrects. Veuillez réessayer.")

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.stopPropagation()
      setValidated(true)
      return
    }

    const codeRole = form.codeRole.value
    const password = form.password.value

    /* */

    console.log("Login attempt with:", { codeRole, password })

    // Check for admin login
    if (codeRole === 'direction' && password === 'cosider2025') {
      onLogin({ userType: 'admin' })
      setLoginError(false)
    } 
    /* */

    console.log("Login attempt with:", { codeRole, password })

    // Check for pole login using data.js
    const pole = poles.find(p => p.code === codeRole && p.password === password)
    
    if (pole) {
      onLogin({ userType: 'pole', poleData: pole })
      setLoginError(false)
    } else {
      setErrorMessage('Code pôle ou mot de passe incorrect. Veuillez réessayer.')
      setLoginError(true)
      setTimeout(() => setLoginError(false), 3000)
    }

    setValidated(true)
  }

  return (
    <Container fluid className="login-container p-0">
      <Row className="g-0 h-100">
        <Col lg={5} className="form-section d-flex align-items-center justify-content-center">
          <div className="login-form-wrapper">
            <div className="text-center mb-4">
              <Image src="/Logo_Cosider.png" alt="Cosider Logo" className="logo mb-4" />
              <h2 className="welcome-text">
                Bienvenue à Cosider Construction !
                <br />
                Connectez-vous.
              </h2>
            </div>

            {loginError && (
              <Alert variant="danger" className="mb-4">
                {errorMessage}
              </Alert>
            )}

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-4" controlId="codeRole">
                <Form.Label className="form-label">Code Pôle</Form.Label>
                <Form.Control required type="text" placeholder="Entrez votre code pôle (ex. P101)" className="form-input" />
                <Form.Control.Feedback type="invalid">Veuillez entrer votre code pôle.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4" controlId="password">
                <Form.Label className="form-label">Mot de passe</Form.Label>
                <div className="password-container">
                  <Form.Control
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="Entrez votre mot de passe"
                    className="form-input"
                  />
                  <Button variant="link" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </Button>
                </div>
                <Form.Control.Feedback type="invalid">Veuillez entrer votre mot de passe.</Form.Control.Feedback>
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <Form.Check type="checkbox" id="rememberMe" label="Se souvenir de moi" className="remember-me" />
                <a href="#" className="forgot-password">
                  Mot de passe oublié?
                </a>
              </div>

              <Button type="submit" className="login-button w-100">
                Connexion
              </Button>
            </Form>

            <div className="text-center mt-4">
              <p className="text-muted small">© 2025 Cosider Construction. Tous droits réservés.</p>
            </div>
          </div>
        </Col>

        <Col lg={7} className="image-section d-none d-lg-block">
          <div className="image-overlay">
            <div className="overlay-content">
              <h1 className="overlay-title">Ensemble, construisons l'Algérie de demain !</h1>
              <p className="overlay-text">Leader dans le secteur de la construction en Algérie depuis plus de 50 ans.</p>
            </div>
          </div>
          <img src="/background_img.jpg" alt="Construction Site" className="bg-image" />
        </Col>
      </Row>
    </Container>
  )
}