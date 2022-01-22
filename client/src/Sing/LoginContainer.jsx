import React from "react";
import {connect} from "react-redux";
import {loginAC, loginThunk} from "../redux/authReducer";
import Login from "./Login";

const mapStateToProps = (state) => ({
    register: state.authPage,
    token: state.auth.token,
})
const LoginContainer = connect(mapStateToProps, {
    loginAC,
    loginThunk
})(Login)

export default  LoginContainer

