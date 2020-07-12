import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import {
    makeStyles
  } from '@material-ui/core';
import swal from 'sweetalert';
import { getMyUsers } from '../../../../services/admin'

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
    }
}));

function UsersList(props) {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [usersLoaded, setUsersLoaded] = useState(false);

    useEffect(() => {
        getMyUsers().then(({data, status}) => {
            setUsersLoaded(true)
            if(status === 200)
                setUsers(data)
        })
    },[]);

    return (
        <React.Fragment>
            <div className={"row " + classes.mb20}>
                <div className="col d-flex justify-content-start">
                    <span className="spacer p-2" />
                    <Link to="/admin/invite-user" className="btn btn-primary">
                        Invite User
                    </Link>
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