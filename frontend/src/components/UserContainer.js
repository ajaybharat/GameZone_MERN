import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../redux'

function UserContainer({ Users,fetchUsers }) {
    useEffect(() => {
        fetchUsers()
    }, [])
    return (
        Users.loading? (
            <h2>loading</h2> 
        ) : Users.error ? (
            <h2>{Users.error}</h2>
        ) : (
            <div>
                <h2>User LIST:</h2>
                <div>
                    {
                        Users && Users.users && Users.users.map(user => <p>{user.name}</p>)
                    }
                </div>
            </div>
        )
    )
}

const mapStatetoProps = state => {
    return {
        Users: state.user
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        fetchUsers: () => dispatch(fetchUsers())
    }
}


export default connect(mapStatetoProps, mapDispatchtoProps)(UserContainer)
