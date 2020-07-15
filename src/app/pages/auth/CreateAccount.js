import React, { useState } from "react";
import { Link } from "react-router-dom";
import { verify, createPassword } from "../../services/auth"
import { TextField } from "@material-ui/core";
import clsx from "clsx";

function CreateAccount(props) {
  const [password, setPassword] = useState('');
  const [validatingToken, setValidatingToken] = useState(true)
  const [validToken, setValidToken] = useState(false)
  const [userId, setUserId] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [createSuccess, setCreateSuccess] = useState(false)

  React.useEffect(() => {
    const token = props.match.params.token
    verify(token).then(({data, status}) => {
        setValidatingToken(false)
        setValidToken(true)
        setUserId(data.id)
    }).catch(err => {
        setValidatingToken(false)
    })
  }, []);

  const handleOnSubmit = async () => {
    setSubmitting(true)
    const data = {
        token: props.match.params.token,
        userId: userId,
        newPassword: password
    }

    createPassword(data).then(resp => {
        setSubmitting(false)
        setSubmitted(true)
        setCreateSuccess(true)
    }).catch(err => {
        setSubmitting(false)
        setSubmitted(true)
        setCreateSuccess(false)
    })
  };

  return (
    <React.Fragment>
        <div className="kt-login__body">
          <div className="kt-login__form">
            <div className="kt-login__title">
                {
                   validatingToken && <h5>Verifying the invitationt token ...</h5> 
                }
                {
                    !validatingToken && !validToken && <h5>The invitation token is invalid or has expired.</h5>
                }
                {
                    !validatingToken && validToken && 
                    <React.Fragment>
                        <h3>
                            Create New Password
                        </h3>
                        <h5>Thankyou for accepting the invitation</h5>
                    </React.Fragment>
                }
            </div>
            {
                !validatingToken && validToken && 
                <React.Fragment>
                    <div className="form-group">
                        <TextField
                        type="password"
                        margin="normal"
                        label="Password"
                        className="kt-width-full"
                        name="password"
                        onChange={(e)=>setPassword(e.target.value)}
                        value={password}
                        />
                    </div>
                    <div className="kt-login__actions">
                        <button
                            id="kt_login_signin_submit"
                            type="submit"
                            onClick={handleOnSubmit}
                            className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx(
                                {
                                "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light":
                                    submitting,
                                }
                            )}`}
                            style={
                                submitting
                                ? { paddingRight: "3.5rem" }
                                : { paddingRight: "2.5rem" }
                            }
                            disabled={submitting || (submitted && createSuccess)}
                        >
                        Create Password
                        </button>
                    </div>
                    {
                        submitted &&
                        <div className="form-group">
                            {
                                createSuccess && <div>Your password was created successfully. Please proceed to login page. <Link to="/auth/login">LOGIN</Link></div>
                            }
                            {
                                !createSuccess && <div>There was an error creating your password. Please contact support team.</div>
                            }
                        </div>
                    }
                    
                </React.Fragment>
            }
            
          </div>
        </div>
    </React.Fragment>
  );
}

export default CreateAccount;
