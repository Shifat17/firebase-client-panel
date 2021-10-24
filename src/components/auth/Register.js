import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { notifyUser } from "../../actions/notifyActions";
import Alert from "../layout/Alert";

class Register extends Component {
  state = {
    email: "",
    password: "",
  };

  UNSAFE_componentWillMount() {
    const { allowRegistration } = this.props.settings;
    if (!allowRegistration) {
      this.props.history.push("/");
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { firebase, notifyUser } = this.props;
    const { email, password } = this.state;

    //Register with firebase
    firebase
      .createUser({
        email,
        password,
      })
      .catch((err) => notifyUser("User Already exists", "error"));
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { message, messageType } = this.props.notify;
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              {message ? (
                <Alert message={message} messageType={messageType} />
              ) : null}
              <h1 className="text-center pb-4 pt-3">
                <span className="text-primary">
                  <i className="fas fa-lock"></i> Register
                </span>
              </h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    required
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <div
                  className="d-grid gap-2 col-6 mx-auto"
                  style={{ marginTop: "2rem" }}
                >
                  <input
                    type="submit"
                    value="Register"
                    className="btn btn-primary"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired,
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify,
      settings: state.settings,
    }),
    { notifyUser }
  )
)(Register);
