import React, { Component } from 'react';
import { Avatar } from 'antd';
import { connect } from 'react-redux';
import { getUsersDetails } from '../../store/actions/user';
import { Spin, Alert } from 'antd';
import { Card } from 'antd';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './index.css'

class Home extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.onGetUsersDetails()
  }
  render() {
    const { users } = this.props
    const loader = <Spin tip="Loading...">
      <Alert
        message="Loading Data"
        description="Wait loading user information "
        type="info"
      />
    </Spin>
    return (
      <div class="container">
        <div>
          {users.length > 0 ?
            <PerfectScrollbar>
              <div style={{ height: 500 }}>
                {users.map((date, index) => (
                  <Card key={index} >
                    <div className="row">
                      <div className="column">
                        <Avatar shape="square" size={105} icon="user" src={date.avatar} />
                      </div>
                      <div className="column" style={{ marginLeft: 10, marginTop: 10 }}>
                        <p><span><b>First Name:</b>First Name:</span>{date.first_name}</p>
                        <p><span><b>Last Name:</b></span>{date.last_name}</p>
                        <p><span><b>Email:</b></span>{date.email}</p>
                      </div>
                    </div>

                  </Card>
                ))}

              </div> </PerfectScrollbar> : loader}
        </div>
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.userId,
    users: state.user.users
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onGetUsersDetails: (res) => dispatch(getUsersDetails()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);

