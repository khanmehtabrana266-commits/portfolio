import React, { useState } from "react";

import { toast } from "react-hot-toast";
import "./AuthModal.css";

import {
  signupUser,
  verifyOtp,
  signinUser,
} from "../../api/authApi";

import GlobalToaster from "./GlobalToaster";

const AuthModal = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [step, setStep] = useState("signin");

  const [loading, setLoading] = useState(false);

  // Messages are kept for logic only.
  // They are NOT displayed inside the card.
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==============================
  // SIGNUP DATA
  // ==============================

  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    userEmail: "",
    passwordHash: "",
  });

  // ==============================
  // OTP
  // ==============================

  const [otp, setOtp] = useState("");

  // ==============================
  // SIGNIN DATA
  // ==============================

  const [signinData, setSigninData] = useState({
    userEmail: "",
    passwordHash: "",
  });

  if (!isOpen) return null;

  // ==============================
  // CLEAR MESSAGES
  // ==============================

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  // ==============================
  // SIGNUP INPUT CHANGE
  // ==============================

  const handleSignupChange = (e) => {
    const { name, value } = e.target;

    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));

    clearMessages();
  };

  // ==============================
  // SIGNIN INPUT CHANGE
  // ==============================

  const handleSigninChange = (e) => {
    const { name, value } = e.target;

    setSigninData((prev) => ({
      ...prev,
      [name]: value,
    }));

    clearMessages();
  };

  // ==============================
  // SIGNUP
  // ==============================

  const handleSignup = async (e) => {
    e.preventDefault();
    clearMessages();

    // ==============================
    // VALIDATE FIELDS
    // ==============================

    if (
      !signupData.firstName.trim() ||
      !signupData.lastName.trim() ||
      !signupData.userEmail.trim() ||
      !signupData.passwordHash.trim()
    ) {
      const message = "Please fill all fields.";

      setError(message);
      toast.error(message);

      return;
    }

    // ==============================
    // PASSWORD VALIDATION
    // ==============================

    if (signupData.passwordHash.length !== 6) {
      const message =
        "Password must be exactly 6 characters long.";

      setError(message);
      toast.error(message);

      return;
    }

    setLoading(true);

    try {
      // ==============================
      // SIGNUP API CALL
      // ==============================

      const result = await signupUser(signupData);

      console.log("Signup Success:", result);

      const message =
        result?.message ||
        "Signup successful! OTP has been sent to your email.";

      setSuccess(message);

      // Show success outside card
      toast.success(message);

      // ==============================
      // SIGNUP SUCCESS → OTP
      // ==============================

      setTimeout(() => {
        setSuccess("");
        setOtp("");
        setStep("otp");
      }, 800);

    } catch (err) {
      console.error("Signup Error:", err);

      const message =
        err?.message ||
        "Signup failed. Please try again.";

      setError(message);

      // Backend error → right side toast
      toast.error(message);

    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // VERIFY OTP
  // ==============================

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    clearMessages();

    // ==============================
    // OTP VALIDATION
    // ==============================

    if (!otp.trim()) {
      const message = "Please enter the OTP.";

      setError(message);
      toast.error(message);

      return;
    }

    if (otp.length !== 6) {
      const message =
        "OTP must be exactly 6 digits.";

      setError(message);
      toast.error(message);

      return;
    }

    setLoading(true);

    try {
      // ==============================
      // OTP PAYLOAD
      // ==============================

      const otpPayload = {
        userEmail: signupData.userEmail,
        otp,
      };

      const result = await verifyOtp(otpPayload);

      console.log("OTP verified:", result);

      const message =
        result?.message ||
        "Email verified successfully!";

      setSuccess(message);

      toast.success(message);

      // ==============================
      // OTP VERIFIED → SIGNIN
      // ==============================

      setSigninData({
        userEmail: signupData.userEmail,
        passwordHash: "",
      });

      setTimeout(() => {
        setOtp("");
        setSuccess("");
        setStep("signin");
      }, 800);

    } catch (err) {
      console.error("OTP Error:", err);

      const message =
        err?.message ||
        "OTP verification failed.";

      setError(message);

      toast.error(message);

    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // SIGN IN
  // ==============================

  const handleSignin = async (e) => {
    e.preventDefault();
    clearMessages();

    // ==============================
    // VALIDATION
    // ==============================

    if (
      !signinData.userEmail.trim() ||
      !signinData.passwordHash.trim()
    ) {
      const message =
        "Email and password are required.";

      setError(message);
      toast.error(message);

      return;
    }

    setLoading(true);

    try {
      // ==============================
      // SIGNIN API CALL
      // ==============================

      const result = await signinUser(signinData);

      console.log("Login Success:", result);

      // ==============================
      // GET TOKEN FROM BACKEND
      // ==============================

      const token =
        result?.access_token ||
        result?.accessToken ||
        result?.token ||
        result?.data?.access_token ||
        result?.data?.accessToken ||
        result?.data?.token;

      if (!token) {
        throw new Error(
          "Login successful but token was not received."
        );
      }

      // ==============================
      // SAVE TOKEN
      // ==============================

      localStorage.setItem("token", token);

      console.log(
        "Token saved:",
        localStorage.getItem("token")
      );

      // ==============================
      // SUCCESS MESSAGE
      // ==============================

      const message =
        result?.message ||
        result?.data?.message ||
        "Sign in successful!";

      setSuccess(message);

      toast.success(message);

      // ==============================
      // LOGIN SUCCESS
      // ==============================

      if (onLoginSuccess) {
        onLoginSuccess(result);
      }

      setTimeout(() => {
        setSuccess("");

        setSigninData({
          userEmail: "",
          passwordHash: "",
        });

        setStep("signin");

        onClose();
      }, 1000);

    } catch (err) {
      console.error("Login Error:", err);

      const message =
        err?.message ||
        "Invalid email or password.";

      setError(message);

      toast.error(message);

    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // GO TO SIGN IN
  // ==============================

  const goToSignin = () => {
    clearMessages();

    setSigninData({
      userEmail: signupData.userEmail || "",
      passwordHash: "",
    });

    setStep("signin");
  };

  // ==============================
  // GO TO SIGN UP
  // ==============================

  const goToSignup = () => {
    clearMessages();
    setOtp("");
    setStep("signup");
  };

  // ==============================
  // CLOSE MODAL
  // ==============================

  const closeModal = () => {
    if (loading) return;

    clearMessages();
    setOtp("");
    setStep("signin");

    onClose();
  };

  // ==============================
  // UI
  // ==============================

  return (
    <>
      {/* =====================================
          GLOBAL TOASTER
          OUTSIDE AUTH MODAL
      ===================================== */}

      <GlobalToaster />

      <div
        className="auth-overlay"
        onClick={closeModal}
      >
        <div
          className="auth-modal"
          onClick={(e) => e.stopPropagation()}
        >

          {/* ==============================
              CLOSE BUTTON
          ============================== */}

          <button
            type="button"
            className="auth-close"
            onClick={closeModal}
          >
            ×
          </button>

          {/* ==============================
              SIGN UP
          ============================== */}

          {step === "signup" && (
            <div className="auth-content">

              <div className="auth-header">

                <span className="auth-small-title">
                  JOIN MY PORTFOLIO
                </span>

                <h2>Create Account</h2>

                <p>
                  Create your account to stay connected.
                </p>

              </div>

              <form onSubmit={handleSignup}>

                {/* FIRST + LAST NAME */}

                <div className="auth-row">

                  <div className="auth-field">

                    <label>
                      First Name
                    </label>

                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={signupData.firstName}
                      onChange={handleSignupChange}
                      required
                    />

                  </div>

                  <div className="auth-field">

                    <label>
                      Last Name
                    </label>

                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={signupData.lastName}
                      onChange={handleSignupChange}
                      required
                    />

                  </div>

                </div>

                {/* EMAIL */}

                <div className="auth-field">

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    name="userEmail"
                    placeholder="you@example.com"
                    value={signupData.userEmail}
                    onChange={handleSignupChange}
                    required
                  />

                </div>

                {/* PASSWORD */}

                <div className="auth-field">

                  <label>
                    Password
                  </label>

                  <input
                    type="password"
                    name="passwordHash"
                    placeholder="6 character password"
                    value={signupData.passwordHash}
                    onChange={handleSignupChange}
                    minLength={6}
                    maxLength={6}
                    required
                  />

                </div>

                {/* NO INLINE ERROR HERE */}

                <button
                  className="auth-submit"
                  type="submit"
                  disabled={loading}
                >
                  {loading
                    ? "Creating..."
                    : "Create Account"}
                </button>

              </form>

              <div className="auth-switch">

                Already have an account?

                <button
                  type="button"
                  onClick={goToSignin}
                >
                  Sign In
                </button>

              </div>

            </div>
          )}

          {/* ==============================
              OTP
          ============================== */}

          {step === "otp" && (
            <div className="auth-content otp-content">

              <div className="otp-icon">
                ✉
              </div>

              <div className="auth-header">

                <span className="auth-small-title">
                  EMAIL VERIFICATION
                </span>

                <h2>
                  Verify Your Email
                </h2>

                <p>
                  Enter the OTP sent to
                  <br />

                  <strong>
                    {signupData.userEmail}
                  </strong>
                </p>

              </div>

              <form onSubmit={handleOtpVerify}>

                <div className="auth-field">

                  <label>
                    Verification Code
                  </label>

                  <input
                    className="otp-input"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => {
                      setOtp(
                        e.target.value.replace(
                          /\D/g,
                          ""
                        )
                      );

                      setError("");
                    }}
                    required
                  />

                </div>

                {/* NO INLINE ERROR HERE */}

                <button
                  className="auth-submit"
                  type="submit"
                  disabled={loading}
                >
                  {loading
                    ? "Verifying..."
                    : "Verify OTP"}
                </button>

              </form>

              <div className="auth-switch">

                Wrong email?

                <button
                  type="button"
                  onClick={goToSignup}
                >
                  Go Back
                </button>

              </div>

            </div>
          )}

          {/* ==============================
              SIGN IN
          ============================== */}

          {step === "signin" && (
            <div className="auth-content">

              <div className="auth-header">

                <span className="auth-small-title">
                  WELCOME BACK
                </span>

                <h2>
                  Sign In
                </h2>

                <p>
                  Sign in to continue to your account.
                </p>

              </div>

              <form onSubmit={handleSignin}>

                {/* EMAIL */}

                <div className="auth-field">

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    name="userEmail"
                    placeholder="you@example.com"
                    value={signinData.userEmail}
                    onChange={handleSigninChange}
                    required
                  />

                </div>

                {/* PASSWORD */}

                <div className="auth-field">

                  <label>
                    Password
                  </label>

                  <input
                    type="password"
                    name="passwordHash"
                    placeholder="Your password"
                    value={signinData.passwordHash}
                    onChange={handleSigninChange}
                    required
                  />

                </div>

                {/* NO INLINE ERROR HERE */}

                <button
                  className="auth-submit"
                  type="submit"
                  disabled={loading}
                >
                  {loading
                    ? "Signing In..."
                    : "Sign In"}
                </button>

              </form>

              <div className="auth-switch">

                Don't have an account?

                <button
                  type="button"
                  onClick={goToSignup}
                >
                  Sign Up
                </button>

              </div>

            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default AuthModal;