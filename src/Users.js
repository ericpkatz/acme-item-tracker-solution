import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';


const Users = ({ users, createUser })=> {
  return (
    <div>
      <h1>Users</h1>
      <button onClick={ createUser }>+</button>
      <ul>
        {
          users.map( user => {
            return (
              <li key={ user.id }>
                { user.name }
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

const mapStateToProps = (state)=> {
  return {
    users: state.users
  };
}

const mapDispatch = (dispatch)=> {
  return {
    createUser: async()=> {
      const user = (await axios.post('/api/users', {name: Math.random()})).data;
      dispatch({ type: 'CREATE_USER', user});
    }
  };
}
export default connect(mapStateToProps, mapDispatch)(Users);
