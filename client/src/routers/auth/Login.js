import React from "react";
import Form from "../../components/shared/forms/Form";

const Login = () => {
  return (
    <>
      <div className="form-container">
        <Form formTitle={'Login'} submitBtn={'Login'} formType={'login'} />
      </div>
    </>
  );
};

export default Login;
