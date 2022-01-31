import {NavLink} from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className={'position-absolute top-50 start-50 translate-middle'}>
      <h2>Error 404</h2>
      <p> Profile is not defined :( </p>
      <NavLink to={'/'}>Go to home page</NavLink>
    </div>
  )
}
export default ErrorPage