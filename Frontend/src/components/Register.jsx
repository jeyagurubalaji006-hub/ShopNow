import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CSS = `
.register-page{
    margin:0;
    font-family:Arial, sans-serif;
    background:#f5f5f5;
    text-align:center;
    padding-bottom:40px;
    min-height:100vh;
}

.register-page .brand{
    display:inline-block;
    margin:20px 0 10px;
    font-size:1.6rem;
    font-weight:bold;
    color:#1a3c5e;
    text-decoration:none;
}

.register-page img{
    height:90px;
    margin-top:10px;
}

.register-page .register-box{
    width:380px;
    margin:20px auto;
    background:#fff;
    padding:30px;
    border-radius:12px;
    box-shadow:0 0 10px rgba(0,0,0,0.2);
    text-align:left;
}

.register-page h2{
    text-align:center;
    color:#222;
    margin-bottom:20px;
}

.register-page label{
    display:block;
    font-weight:bold;
    margin-bottom:6px;
    font-size:0.9rem;
}

.register-page input[type="text"],
.register-page input[type="email"],
.register-page input[type="password"],
.register-page input[type="date"]{
    width:100%;
    padding:10px;
    margin-bottom:16px;
    border:1px solid #ccc;
    border-radius:6px;
    font-size:0.95rem;
    box-sizing:border-box;
}

.register-page .gender-row{
    margin-bottom:16px;
}

.register-page .gender-row label{
    display:inline;
    font-weight:normal;
    margin-right:16px;
}

.register-page .gender-row input{
    margin-right:4px;
}

.register-page .terms-row{
    margin-bottom:20px;
    font-size:0.9rem;
}

.register-page .terms-row label{
    display:inline;
    font-weight:normal;
}

.register-page button,
.register-page input[type="submit"]{
    width:100%;
    padding:12px;
    margin:10px 0;
    border:none;
    border-radius:8px;
    cursor:pointer;
    font-size:16px;
    background:#1a3c5e;
    color:#fff;
}

.register-page p.login-link{
    text-align:center;
    font-size:0.9rem;
}

.register-page a{
    text-decoration:none;
    color:#1a3c5e;
    font-weight:bold;
}
`;

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
          //alert("Registration Successful");
          navigate("/shop", { replace: true });
      } else {
        alert(data.error || data.message || "Registration Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  }

  return (
    <>  <div className="register-page">
        <style>{CSS}</style><br/>
        <img src="/images/ShopNow.jpeg" alt="ShopNow" />
        <div className="register-box">
          <h2>Create your account</h2>
  
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={5}
              pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{9,}"
              title="Password must contain at least 5 characters, including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
            />

            <label>Date of Birth:</label>
            <input type="date" required />

            <div className="gender-row">
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: "bold",
                }}
              >
                Gender:
              </label>

              <input type="radio" id="male" name="gender" required />
              <label htmlFor="male">Male</label>

              <input type="radio" id="female" name="gender" />
              <label htmlFor="female">Female</label>

              <input type="radio" id="other" name="gender" />
              <label htmlFor="other">Others</label>
            </div>

            <div className="terms-row">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
            I agree to the{" "}
            <Link to="/terms" target="_blank">
            Terms of Use
            </Link>{" "}
            and{" "}
            <Link to="/privacy" target="_blank">
            Privacy Policy
            </Link>
        
        </label>
    </div>

            <input type="submit" value="Register" />
          </form>

          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};