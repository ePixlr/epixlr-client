import React, {useState, useEffect, useCallback} from 'react'
import { Link } from 'react-router-dom'
import {
    makeStyles
  } from '@material-ui/core';
import { getMyUsers, deleteUser } from '../../../../services/admin'
import { getUserSubscription } from '../../../../services/subscription'
import swal from 'sweetalert';

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
    avatar:{
        width: "100px",
        height: "100px",
        borderRadius: "100%",
        marginBottom: "20px"
    },
    shadow: {
        boxShadow: "2px 3px 22px #88888824"
    },
    subscriptionError: {
        color: "red",
        padding: "10px"
    },
    disabled: {
        cursor: "default",
        pointerEvents: "none",
        textDecoration: "none",
        backgroundColor: "#00bcd5b0"
    },
    editProfileLink: {
        position: "absolute",
        top: "7%",
        right: "5%",
        textDecoration: "underline"
    },
    deleteProfileLink: {
        position: "absolute",
        top: "16%",
        right: "5%",
        textDecoration: "underline",
        cursor: "pointer",
        color: "#ed1d25"
    },
    w100:{
        width: "100%"
    },
    planSup:{
        color: "#00bbd4"
    }
}));

function UsersList(props) {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [usersLoaded, setUsersLoaded] = useState(false);
    const [userHasSubscription, setUserHasSubscription] = useState(false)
    const [canInviteUsers, setCanInviteUsers] = useState(false)

    useEffect(() => {
        getUserSubscription().then(({data, status}) => {
            setUserHasSubscription(true)
            const subscription = data
            getMyUsers().then(({data, status}) => {
                setUsersLoaded(true)
                if(status === 200){
                    setUsers(data)
                    if(subscription && subscription.plan.noOfUsers > data.length){
                        setCanInviteUsers(true)
                    }
                }    
            })
        }).catch(err => {
            setUsersLoaded(true)
        })
        
    },[]);

    const handleDeleteUser = useCallback((id) => {
        swal({
            title: 'Delete User',
            text:'Are you sure you want to delete this user? This operation cannot be undone.',
            icon:"warning",
            buttons: {
                cancel: "No, Cancel it!",
                proceed: {text: "Yes, I'm sure", closeModal: false, value:"proceed"}
            }
        }).then(value => {

            if (value === null) return new Promise((resolve, reject) => reject())
            return deleteUser(id) 
        }).then(({data,status}) => {
            setUsers(data)
            swal("User Deleted","User has been deleted successfully.","success")
            
        }).catch(err => swal.close())
    },[])

    return (
        <React.Fragment>
            <div className={"row " + classes.mb20}>
                <div className="col d-flex justify-content-start">
                    <span className="spacer p-2" />
                    <Link to="/admin/invite-user" className={ (userHasSubscription && canInviteUsers) ? "btn btn-primary" :  "btn btn-primary disabled"}>
                        Invite User
                    </Link>
                    {
                        usersLoaded && !userHasSubscription && <div className={classes.subscriptionError}>You need to subscribe to a plan to be able to invite users</div>
                    }
                    {
                        usersLoaded && userHasSubscription && !canInviteUsers && <div className={classes.subscriptionError}>Please upgrade your subscription to be able to invite more users</div>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="row">
                        {
                            usersLoaded ?
                                users.length > 0 ?
                                    users.map((user,key) => {
                                        return <div key={key} className="col-md-3 col-xs-12 d-flex align-items-start">
                                            <div className={"card " + classes.shadow + " " + classes.w100}>
                                                <div className="card-body">
                                                    <div>
                                                        <img className={"" + classes.avatar} src={user.profile.avatar ? user.profile.avatar : process.env.PUBLIC_URL + "/media/avatar.png"} alt="User Profile img" />
                                                        <Link className={classes.editProfileLink} to={ key === 0 ? "/profile/me" :"/profile/" + user._id} >Edit User Profile</Link>
                                                        {key !== 0 ? <span onClick={() => handleDeleteUser(user._id)} className={classes.deleteProfileLink} >Delete User</span> : ''}
                                                    </div>
                                                    <h5 className="card-title">{user.userName} {key ===0 ? <sup className={classes.planSup}>{user.subscription.plan.planName}</sup> : <sub className={classes.planSup}>{user.status}</sub>}</h5>
                                                    <p className="card-text">{user.role}</p>
                                                </div>
                                            </div>
                                        </div>;
                                    })
                                    : <h5>No users found</h5>
                                : <h5>Loading users...</h5>
                        }
                    </div>
                </div>
            </div>
            
        </React.Fragment>
    )
}

export default UsersList