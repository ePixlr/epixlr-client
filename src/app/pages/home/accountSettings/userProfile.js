import React, {useState, useEffect, useRef} from 'react'
import {
    makeStyles
  } from '@material-ui/core';
import swal from 'sweetalert';
import { getUserProfile, updateUserProfile, updateUserProfileAvatar } from '../../../services/userProfile'
import { changePassword } from '../../../services/auth'
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    '@global': {
        'label': {
            width: "20%",
            textAlign: "right",
            paddingRight: "10px"
        },
        'h5':{
            marginBottom: '20px'
        },
        'hr': {
            marginBottom: "2rem",
            width: "94%",
            marginTop: "2rem"
        }
    },
    mb20:{
        marginBottom: "20px"
    },
    changePasswordSpan: {
        marginLeft: "20px",
        textDecoration: "underline",
        zIndex:1,
        '&:hover': {
            cursor: "pointer",
            color:"#062e66"
        },
        
    },
    w85:{
        width:"85%"
    },
    avatar: {
        width: "120px",
        height: "120px",
        borderRadius: "100%",
        background: "#1e1f2d"
    },
    avatarDescription: {
        marginLeft: "20px",
        marginTop: "12px",
        lineHeight: "2.5em"
    }
}));

function UserProfile(props) {
    const classes = useStyles();
    const [userProfile, setUserProfile] = useState({});
    const [submitting ,setSubmitting] = useState(false)
    const [allowChangePassword, setAllowChangePassword] = useState(false)
    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('**********')
    const [updatingPassword, setUpdatingPassword] = useState(false)
    const uploadImageBtn = useRef(null)
    const avatarImg = useRef(null)
    useEffect(() => {
        var userId = window.location.pathname.split('/').pop()
        setUserId(userId)
        getUserProfile(userId).then(({data, status}) => {
            if(status === 200){
                setUserProfile(data)
            }
        })
    },[]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserProfile({
          ...userProfile,
          [name]: value,
        });
    };

    const handlePasswordChange = () => {
        setUpdatingPassword(true)
        changePassword(password).then(() => {
            setAllowChangePassword(false)
            setUpdatingPassword(false)
            setPassword('**********')
            swal('Password updated','Your password has been updated successfully',"success")
        })
    }

    const handleUploadImageClick = () => {
        uploadImageBtn.current.click()
    }

    const handleFileSelect = (e) => {
        const file = e.target.files[0]
        setSubmitting(true)
        updateUserProfileAvatar(file).then(({status}) => {
            if(status === 200){
                swal('Profile picture saved','Your profile picture has been saved successfully',"success")
                setSubmitting(false)
                avatarImg.current.src =  URL.createObjectURL(file)
            }
        })
    }

    const handleSubmit = () => {
        setSubmitting(true)
        updateUserProfile(userProfile, userId).then(({data, status}) => {
            setSubmitting(false)
            if(status === 200){
                swal('Profile saved','Your profile has been saved successfully',"success")
            }
            else{
                swal('Profile not saved','There was an error saving the user profile. Please try again',"error")
            }
        }).catch(err => {
            setSubmitting(false)
            swal('Error','There was an error saving the user profile. Please try again',"error")
        })
    }

    return (
        <React.Fragment>
            <div className="row">
                <div className="col">
                    <div className="kt-portlet">
                        <div className="kt-portlet__body">
                            <div className="row">
                                <div className={"col-md-5 col-xs-12 d-flex align-items-start " + classes.mb20}>
                                    <img ref={avatarImg} className={classes.avatar} src={userProfile.avatar ? userProfile.avatar : process.env.PUBLIC_URL + "/media/avatar.png"}/>
                                    {
                                        userId === "me" &&
                                        <div className={classes.avatarDescription}>
                                            User Photo <br/>
                                            The image should be atleast 300 x 300 pixels <br/>
                                            <button disabled={submitting} onClick={handleUploadImageClick} className={`btn btn-sm btn-primary ${clsx(
                                                {
                                                "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light":
                                                    props.loading,
                                                }
                                            )}`}
                                            style={
                                                props.loading
                                                ? { paddingRight: "3.5rem" }
                                                : { paddingRight: "2.5rem" }
                                            }>
                                                Upload Image
                                            </button>
                                            <input ref={uploadImageBtn} onChange={handleFileSelect} type="file" className="d-none" />
                                        </div>
                                    }
                                    
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-md-5 col-xs-12 d-flex align-items-start">
                                    <div className="row">
                                        <div className="col-md-12 d-flex align-items-center">
                                            <h5>Profile Details</h5>
                                        </div>
                                        <div className={"col-md-12 d-flex align-items-center " + classes.mb20 }>
                                            <label>Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="userName"
                                                value={userProfile.userName || ''}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className={"col-md-12 d-flex align-items-center " + classes.mb20 }>
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                disabled
                                                value={userProfile.email || ''}
                                            />
                                        </div>
                                        <div className={"col-md-12 d-flex align-items-center " + classes.mb20 }>
                                            <label>Password</label>
                                            <input
                                                type="password"
                                                className={"form-control " + classes.w85}
                                                name="password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                disabled = {!allowChangePassword}
                                                value={password}
                                            />
                                            {
                                                updatingPassword && <div class="spinner-border" role="status" />
                                            }
                                            {
                                                !updatingPassword && allowChangePassword && <span onClick={handlePasswordChange} className={classes.changePasswordSpan}>Save</span>
                                            }
                                            {
                                                !allowChangePassword && <span onClick={()=>setAllowChangePassword(true)} className={classes.changePasswordSpan}>Change</span>
                                            }
                                            
                                        </div>
                                        <div className={"col-md-12 d-flex align-items-center " + classes.mb20 }>
                                            <label>Company</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="company"
                                                value={userProfile.company || ''}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5 offset-md-1 col-xs-12 d-flex align-items-center">
                                    <div className="row">
                                        <div className="col-md-12 d-flex align-items-center">
                                            <h5>Billing Information</h5>
                                        </div>
                                        <div className={"col-md-12 d-flex align-items-center " + classes.mb20 }>
                                            <label>Address Line 1</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="billingAddress1"
                                                value={userProfile.billingAddress1 || ''}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className={"col-md-12 d-flex align-items-center " + classes.mb20 }>
                                            <label>Address Line 2</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="billingAddress2"
                                                value={userProfile.billingAddress2 || ''}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className={"col-md-12 d-flex align-items-center " + classes.mb20 }>
                                            <label>City</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="billingCity"
                                                value={userProfile.billingCity || ''}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className={"col-md-12 d-flex align-items-center " + classes.mb20 }>
                                            <label>State</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="billingState"
                                                value={userProfile.billingState || ''}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className={"col-md-12 d-flex align-items-center " + classes.mb20 }>
                                            <label>Zip/Postal Code</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="billingZip"
                                                value={userProfile.billingZip || ''}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className={"col-md-12 d-flex align-items-center " + classes.mb20 }>
                                            <label>Country</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="billingCountry"
                                                value={userProfile.billingCountry || ''}
                                                onChange={handleChange}
                                            />
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
                    <button disabled={submitting} onClick={handleSubmit} className={`btn btn-primary ${clsx(
                            {
                                "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light":
                                submitting,
                            }
                        )}`}
                        style={
                            submitting
                            ? { paddingRight: "3.5rem" }
                            : { paddingRight: "2.5rem" }
                        }>
                        {!submitting ? 'Update Profile' : 'Updating ...'}
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default UserProfile