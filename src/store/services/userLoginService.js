import axios from 'axios';



export const userLogin = async (data, callback) => {
  const userCreationRequest = {
    email: data.obj.email,
    password: data.obj.password
  }
  axios.post('https://reqres.in/api/login',
    userCreationRequest,
    {
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      return callback(response)
    }).catch(response => {
      return callback({ Message: 'User login is fail' })
    });
}