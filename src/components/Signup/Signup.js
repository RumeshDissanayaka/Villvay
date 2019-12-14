import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { userRegistration } from '../../store/services/userRegistrationService';
import { message } from 'antd';
import { regex } from '../../constants/regex';
import { connect } from 'react-redux';
import { userLoginRequest } from '../../store/actions/user';
import GoogleLogin from 'react-google-login';


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  isValidEmail: false,
  isMandatory: false
}
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  Copyright = () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit">
          Villvay-poc
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    }, () => {
      const { email } = this.state;
      this.emailValidationHandler(email)
    })
  }
  signUpHandler = () => {
    const { isValidEmail, firstName, lastName, password, email } = this.state
    const isMandatory = (email && firstName && lastName && password)
    if (isMandatory) {
      if (isValidEmail) {
        let obj = this.state
        userRegistration({ obj }, res => {
          if (res.Message) {
            message.error(res.Message)
          }
          else {
            if (res.status == 200) {
              console.log(res.data.data)
              this.props.onUserLoginRequest(res.data)
              setTimeout(() => {
                this.props.history.push('/home')
              }, 2000)
              message.success('User register successfully')
            }
          }
        })
      }
      else {
        message.error('Email address is Invalid')
      }
    } else {
      message.error('Please fill in the required fields')
    }
  }

  emailValidationHandler = (email) => {
    if (email !== "") {
      if (regex().emailValidate.regex.test(email)) {
        this.setState({
          isValidEmail: true
        })
      }
      else {
        this.setState({
          isValidEmail: false
        })
      }
    }
    else {
      this.setState({
        isValidEmail: false
      })
    }
  }

  responseGoogle = (response) => {
    if (response.error) {
      message.error(response.error)
    }
    else {
      let obj = {
        id: response.googleId,
        token: response.tokenId
      }
      this.props.onUserLoginRequest(obj)
      setTimeout(() => {
        this.props.history.push('/home')
      }, 2000)
      message.success('User Login successfully')
    }
  }
  render() {
    return (
      <div style={{ marginTop: 100 }}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={useStyles.paper}>
            <Avatar className={useStyles.avatar} style={{ margin: '0 auto' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" style={{ textAlign: 'center' }}>
              Sign up
        </Typography>
            <form className={useStyles.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    id="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={(e) => this.handleChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    onChange={(e) => this.handleChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => this.handleChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => this.handleChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => this.signUpHandler()}
              >
                Sign Up
          </Button>
              <GoogleLogin
                clientId="121518841644-ngpspmq6k8g12uifbuskfjivvh5vlkm4.apps.googleusercontent.com"
                render={renderProps => (
                  <Button
                    style={{ marginTop: 10 }}
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={useStyles.submit}
                    onClick={renderProps.onClick} disabled={renderProps.disabled}>Google Sign In</Button>
                )}
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
              </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            {this.Copyright()}
          </Box>
        </Container>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onUserLoginRequest: (res) => dispatch(userLoginRequest(res)),
  }
}
export default connect(null, mapDispatchToProps)(Signup);
