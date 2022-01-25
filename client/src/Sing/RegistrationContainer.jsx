import React from "react";
import {connect} from "react-redux";
import {registerAC, registrationThunk, showErrMessageAC} from "../redux/authReducer";
import Registration from "./Registration";

const mapStateToProps = (state) => ({
  errorMessage: state.auth.errorMessage
})
const RegistrationContainer = connect(mapStateToProps, {
    registerAC,
  registrationThunk,
  showErrMessageAC
})(Registration)

export default RegistrationContainer