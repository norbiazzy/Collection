import React from "react";
import {connect} from "react-redux";
import {registerAC, registrationThunk} from "../redux/authReducer";
import Registration from "./Registration";

const mapStateToProps = (state) => ({
    register: state.authPage,
})
const RegistrationContainer = connect(mapStateToProps, {
    registerAC,
  registrationThunk
})(Registration)

export default RegistrationContainer