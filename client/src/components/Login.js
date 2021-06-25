import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className="btn btn-primary btn-block" style={{width: "200px"}} onClick={() => loginWithRedirect()}>Enter to Dashboard</button>;
};

export default LoginButton;