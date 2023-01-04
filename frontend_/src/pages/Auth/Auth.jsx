import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../actions/AuthAction";

const Auth = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.authReducer.loading);
    const [isSignUp, setIsSignUp] = useState(false);
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        password: "",
        confirmpass: "",
        username: "",
    });
    const [confirmPass, setConfirmPass] = useState(true);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignUp) {
            data.password === data.confirmpass
                ? dispatch(signUp(data))
                : setConfirmPass(false);
        } else {
            dispatch(logIn(data));
        }
    };

    const resetForm = () => {
        setConfirmPass(true);
        setData({
            firstname: "",
            lastname: "",
            password: "",
            confirmpass: "",
            username: "",
        });
    };

    return (
        <div className="Auth">
            <div className="a-left">
                <img src={Logo} alt="" />
                <div className="Webname">
                    <h1>PELCM</h1>
                    <h6>Connect with others around the world</h6>
                </div>
            </div>

            <div className="a-right">
                <form className="infoForm authForm" onSubmit={handleSubmit}>
                    <h3>{isSignUp ? "Sign up" : "Log in"}</h3>
                    {isSignUp && (
                        <div>
                            <input
                                type="text"
                                placeholder="First Name"
                                className="infoInput"
                                name="firstname"
                                onChange={handleChange}
                                value={data.firstname}
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="infoInput"
                                name="lastname"
                                onChange={handleChange}
                                value={data.lastname}
                            />
                        </div>
                    )}
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            className="infoInput"
                            name="username"
                            onChange={handleChange}
                            value={data.username}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="infoInput"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                        />
                        {isSignUp && (
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="infoInput"
                                name="confirmpass"
                                onChange={handleChange}
                                value={data.confirmpass}
                            />
                        )}
                    </div>

                    <span
                        style={{
                            display: confirmPass ? "none" : "block",
                            color: "red",
                            fontSize: "12px",
                            alignSelf: "flex-end",
                            marginRight: "5px",
                        }}
                    >
                        * confirm password is not the same *
                    </span>

                    <div>
                        <span
                            style={{ fontSize: "12px", cursor: "pointer" }}
                            onClick={() => {
                                setIsSignUp(!isSignUp);
                                resetForm();
                            }}
                        >
                            {isSignUp
                                ? "Already have an account. Click me!"
                                : "Don't have an account? Click me!"}
                        </span>
                    </div>
                    <button
                        className="button infoButton"
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Loading..."
                            : isSignUp
                            ? "Sign up"
                            : "Log in"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Auth;
