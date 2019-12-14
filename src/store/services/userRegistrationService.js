import axios from 'axios';

export const userRegistration = async (data, callback) => {
  const userCreationRequest = {
    firstName: data.obj.firstName,
    lastName: data.obj.lastName,
    email: data.obj.email,
    password: data.obj.password
  }
  axios.post('https://reqres.in/api/register',
    userCreationRequest,
    {
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      return callback(response)
    }).catch(response => {
      return callback({ Message: 'User Registration is fail' })
    });
}