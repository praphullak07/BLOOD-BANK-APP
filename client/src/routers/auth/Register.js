import React from "react";
import Form from "../../components/shared/forms/Form";

const Register = () => {
  return (
    <>
      <div className="col-md-4 form-container">
        <Form formTitle={'Register'} submitBtn={'Register'} formType={'register'} />
      </div>
    </>
  );
};

export default Register;
