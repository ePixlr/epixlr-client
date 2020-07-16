import React, {useState, useEffect, useRef} from 'react'
import {
    makeStyles
  } from '@material-ui/core';
import swal from 'sweetalert';
import { inviteUser } from '../../../../services/admin'

const useStyles = makeStyles((theme) => ({
    '@global': {
        'label': {
            width: "20%",
            textAlign: "right",
            paddingRight: "10px"
        },
        'h5':{
            marginBottom: '20px'
        }
    },
    mb20:{
        marginBottom: "20px"
    },
}));

function InviteUser(props) {
    const classes = useStyles();
    const [newUser, setNewUser] = useState({});
    const [submitting ,setSubmitting] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewUser({
          ...newUser,
          [name]: value,
        });
    };

    const handleSubmit = () => {
        setSubmitting(true)
        inviteUser(newUser).then(({data, status}) => {
            setSubmitting(false)
            setNewUser({})
            swal('User Invited','An invitation email has been sent to the user to join ePixilier',"success")
        }).catch((error) => {
            setSubmitting(false)
            if (error.response) {
                if(error.response.status === 409){
                    swal('Error','User with this email already exists',"error")
                }
                else{
                    swal('Error','There was an error inviting the user. Please try again',"error")
                }
            }
            else{
                swal('Error','There was an error inviting the user. Please try again',"error")
            }
        })
    }

    return (
        <React.Fragment>
            <div className="row">
                <div className="col">
                    <div className="kt-portlet">
                        <div className="kt-portlet__body">
                            <div className="row">
                                <div className="col-md-5 col-xs-12 d-flex align-items-start">
                                    <div className="row">
                                        <div className="col-md-12 d-flex align-items-center">
                                            <h5>Invite User</h5>
                                        </div>
                                        <div className={"col-md-12 d-flex align-items-center " + classes.mb20 }>
                                            <label>Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className={"col-md-12 d-flex align-items-center " + classes.mb20 }>
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className={"col-md-12 d-flex align-items-center " + classes.mb20 }>
                                            <label>Role</label>
                                            <select onChange={handleChange} className="form-control" name="role">
                                                <option value="ADMIN">Admin</option>
                                                <option value="PHOTOGRAPHER">Photographer</option>
                                                <option value="DESIGNER">Designer</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row px-5">
                <div className="col d-flex justify-content-end">
                    <span className="spacer p-2" />
                    <button disabled={submitting} className="btn btn-primary" onClick={handleSubmit}>
                        Invite User
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default InviteUser