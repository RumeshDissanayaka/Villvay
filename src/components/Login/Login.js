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
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { cleanHistoryData, userLoginRequest } from '../../store/actions/user';
import { userLogin } from '../../store/services/userLoginService';
import { message } from 'antd';
import LoadingBar from 'react-top-loading-bar';



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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const initialState = {
  email: '',
  password: '',
}
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  componentDidMount() {
    this.clearDetailsHandler()
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
  responseGoogle = (response) => {
    this.startFetch();
    if (response.error) {
      this.onFinishFetch();
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
      }, 1000)
      this.onFinishFetch();
      message.success('User Login successfully')
    }
  }

  clearDetailsHandler = async () => {
    await this.props.onCleanHistoryData();
  }
  loginHandler = () => {
    this.startFetch();
    let obj = this.state
    userLogin({ obj }, res => {
      if (res.Message) {
        message.error(res.Message)
      }
      else {
        if (res.status == 200) {
          this.onFinishFetch();
          //4 is hard code bcz only get token.there is no fake api call to get user using token
          let obj = {
            id: 4,
            token: res.data.token
          }
          this.props.onUserLoginRequest(obj)
          setTimeout(() => {
            this.props.history.push('/home')
          }, 1000)
          message.success('User Login successfully')
        }
      }

    })
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  startFetch = () => {
    this.LoadingBar.continuousStart()
  }

  onFinishFetch = () => {
    this.LoadingBar.complete()
  }
  render() {
    return (
      <div style={{ marginTop: 100 }}>
        <LoadingBar onRef={ref => (this.LoadingBar = ref)} />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={useStyles.paper}>
            <Avatar className={useStyles.avatar} style={{ margin: '0 auto' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" style={{ textAlign: 'center' }}>
              Sign in
        </Typography>
            <form className={useStyles.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => this.handleChange(e)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => this.handleChange(e)}

              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={useStyles.submit}
                onClick={() => this.loginHandler()}
              >
                Sign In
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

              <Grid container style={{ marginTop: 5 }}>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
              </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
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
    onCleanHistoryData: () => dispatch(cleanHistoryData()),
  }
}
export default connect(null, mapDispatchToProps)(Login);
