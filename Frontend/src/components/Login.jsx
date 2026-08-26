import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from  "../firebase";

import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const GOOGLE_OAUTH_URL =
  "http://localhost:8080/oauth2/authorization/google";

let CSS = `
.login-page{
    margin:0;
    font-family:Arial, sans-serif;
    background:#f5f5f5;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    min-height:100vh;
}

.login-page .brand{
    margin-bottom:20px;
    font-size:1.6rem;
    font-weight:bold;
    color:#1a3c5e;
    text-decoration:none;
}

.login-page .login-box{
    width:350px;
    background:white;
    padding:30px;
    border-radius:12px;
    box-shadow:0 0 10px rgba(0,0,0,0.2);
    text-align:center;
}

.login-page h2{
    margin-bottom:20px;
    color:#222;
}

.login-page input{
    width:100%;
    padding:12px;
    margin:10px 0;
    border:1px solid #ccc;
    border-radius:8px;
    box-sizing:border-box;
}

.login-page button,
.login-page .google-link{
    width:100%;
    padding:12px;
    margin:10px 0;
    border:none;
    border-radius:8px;
    cursor:pointer;
    font-size:16px;
    display:block;
    box-sizing:border-box;
}

.login-page .google-link{
    text-decoration:none;
    background:#ff9800;
    border:1px solid #ccc;
    color:#222;
}
.login-page .google-link:hover{
    background:#f57c00;
}
.login-page .email{
    background:#1a3c5e;
    color:white;
}

.login-page .phone{
    background:#e63946;
    color:white;
}

.login-page hr{
    margin:20px 0;
}

.login-page a{
    text-decoration:none;
    color:#1a3c5e;
    font-weight:bold;
}
.login-page .continue{
    background:#1a3c5e;
    color:white;
    font-weight:bold;
}

.login-page .continue:hover{
    background:#14314d;
}

.login-page .verify{
    background:#28a745;
    color:white;
    font-weight:bold;
}

.login-page .verify:hover{
    background:#218838;
}
`;

export default function Login() {
    const navigate = useNavigate();

// -------------------- STATES --------------------
    

    const [email, setEmail] = useState("");
    const [emailOtp, setEmailOtp] = useState("");

    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [showEmail, setShowEmail] = useState(false);
    const [showOtp, setShowOtp] = useState(false);
    const [showPhone, setShowPhone] = useState(false);
    const [showPhoneOtp, setShowPhoneOtp] = useState(false);
    const [sendingEmailOTP, setSendingEmailOTP] = useState(false);
    const [confirmation, setConfirmation] = useState(null);

// -------------------- RECAPTCHA --------------------

async function sendEmailOTP() {

    if (!email) {
        alert("Enter your email");
        return;
    }

    setSendingEmailOTP(true);   // Start loading
    setShowEmail(false);
    setShowOtp(true);
    //setSendingEmailOtp(false);
    try {

        const response = await fetch(
            "http://localhost:8080/api/auth/send-email-otp",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            }
        );

        if (response.ok) {

            alert("OTP sent successfully");
            setShowEmail(false);
            setShowOtp(true);

        } else {

            alert("Unable to send OTP");

        }

    } catch (err) {

        console.log(err);
        alert("Server Error");

    } finally {

        setSendingEmailOTP(false);   // Stop loading

    }
}

async function verifyEmailOTP() {

  try {

    const response = await fetch(
      "http://localhost:8080/api/auth/verify-email-otp",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          email,
          otp: emailOtp,
        }),
      }
    );

    if(response.ok){
      navigate("/shop");

    }
    else{

      alert("Invalid OTP");

    }

  }
  catch(err){

    console.log(err);

    alert("Server Error");

  }

}
// -------------------- PHONE OTP --------------------
function setupRecaptcha() {

    if (!window.recaptchaVerifier) {

        window.recaptchaVerifier = new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {
                size: "normal",
            }
        );

    }

}
async function sendOTP() {

    setupRecaptcha();

    try {

        const result = await signInWithPhoneNumber(
            auth,
            phone,
            window.recaptchaVerifier
        );

        setConfirmation(result);

        setShowPhone(false);

        setShowPhoneOtp(true);
        // Hide reCAPTCHA
        document.getElementById("recaptcha-container").style.display = "none";
        alert("OTP Sent Successfully");

    } catch(err) {

        alert(err.message);

    }

}

async function verifyOTP() {

    if (!confirmation) {
        alert("Please send OTP first.");
        return;
    }

    try {

        await confirmation.confirm(otp);
        navigate("/shop");

    } catch(err) {

        alert("Invalid OTP");

    }

}

return (
  <div className="login-page">
    <style>{CSS}</style>

    <div className="login-box">

      <h2>Login to ShopNow</h2>

      {/* GOOGLE LOGIN */}

      <a
        className="google-link"
        href={GOOGLE_OAUTH_URL}
      >
        🔵 Continue with Google
      </a>
  
      <button
        className="email"
        onClick={() => setShowEmail(true)}
      >
       📧 Continue with Email
      </button>
      
      {showEmail && !showOtp && (
<>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <button
            className="continue"
            onClick={sendEmailOTP}
        >
         Continue
        </button>
        
    </>
)}
        {showOtp && (
<>
        <input
          type="text"
          placeholder="Enter OTP"
          value={emailOtp}
          onChange={(e)=>setEmailOtp(e.target.value)}
    />

       <button
            className="verify"
            onClick={verifyEmailOTP}
        >
            Verify
        </button>
</>
)}
     

      <button
       className="phone"
       onClick={() => setShowPhone(true)}
      >
      📱 Continue with Phone
      </button>
      {showPhone && !showPhoneOtp && (
<>
    <input
        type="tel"
        placeholder="+1(305)555-3911"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
    />

    <button
        className="phone"
        onClick={sendOTP}
    >
        Continue
    </button>
</>
)}
    {showPhoneOtp && (
<>
    <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e)=>setOtp(e.target.value)}
    />

    <button
        className="verify"
        onClick={verifyOTP}
    >
        Verify
    </button>
</>
)}
  

      <div id="recaptcha-container"></div>

      <hr />

      <p>
        Don't have an account?
      </p>

      <Link to="/register">
        Register
      </Link>

    </div>
  </div>
);
}