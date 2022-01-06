import React from "react";
import Registration from "./Registration";
import {connect} from "react-redux";
import {registerAC, registrationUserThunkCreate} from "../redux/authReducer";

const mapStateToProps = (state) => ({
    register: state.authPage,
})
const RegistrationContainer = connect(mapStateToProps, {
    registerAC,
    registrationUserThunkCreate
})(Registration)

export default RegistrationContainer