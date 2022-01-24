import React from "react";
import {connect} from "react-redux";
import {loginAC, loginThunk} from "../redux/authReducer";
import Login from "./Login";

const mapStateToProps = (state) => ({
    token: state.auth.token,
})
const LoginContainer = connect(mapStateToProps, {
    loginThunk
})(Login)

export default  LoginContainer

