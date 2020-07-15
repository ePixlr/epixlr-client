import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {
    makeStyles
  } from '@material-ui/core';
import { getMyUsers } from '../../../../services/admin'
import { getUserSubscription } from '../../../../services/subscription'

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
        width: "150px",
        height: "150px",
        borderRadius: "100%",
        margin: "auto",
        marginTop: "10px"
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

    return (
        <React.Fragment>
            <div className={"row " + classes.mb20}>
                <div className="col d-flex justify-content-start">
                    <span className="spacer p-2" />
                    <Link to="/admin/invite-user" className={ (userHasSubscription && canInviteUsers) ? "btn btn-primary" :  "btn btn-primary disabled"}>
                        Invite User
                    </Link>
                    {
                        !userHasSubscription && <div className={classes.subscriptionError}>You need to subscribe to a plan to be able to invite users</div>
                    }
                    {
                        userHasSubscription && !canInviteUsers && <div className={classes.subscriptionError}>Please upgrade your subscription to be able to invite more users</div>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="kt-portlet">
                        <div className="kt-portlet__body">
                            <div className="row">
                                {
                                    usersLoaded ?
                                        users.length > 0 ?
                                            users.map((user,key) => {
                                                return <div key={key} className="col-md-4 col-xs-12 d-flex align-items-start">
                                                    <div className={"card " + classes.shadow}>
                                                        <img className={"card-img-top " + classes.avatar} src={user.profile.avatar ? user.profile.avatar : process.env.PUBLIC_URL + "/media/avatar.png"} alt="User Profile img" />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{user.profile.name}</h5>
                                                            <p className="card-text">{user.role}</p>
                                                            <Link to={"/profile/" + user._id} className="btn btn-sm btn-secondary">Edit Profile</Link>
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
                </div>
            </div>
            
        </React.Fragment>
    )
}

export default UsersList