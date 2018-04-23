import { Alert, Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const styles = {
  bottomMargin: { marginBottom: 10 },
};

class UserEdit extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: this.props.auth.user.email,
      institution: this.props.auth.user.institution,
    };
  }

  handleSubmit(evt) {
    evt.preventDefault();
    /** @todo  Remove hard-coded institution. */
    this.props.onSubmit({
      email: this.formEmail.value.trim(),
      institution: this.formInst.value.trim(),
      // name: this.UserEditName.value.trim(),
      // username: this.UserEditUsername.value.trim(),
    });
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {
    const { auth } = this.props;

    if (auth.user) {

      return (
        <div className="panel panel-default">
          <div className="panel-body">
            <form onSubmit={this.handleSubmit}>
              {auth.error &&
                <Alert bsStyle="danger" style={styles.bottomMargin}>
                  <strong>Error!</strong> {auth.error}
                </Alert>
              }
              {/*<FormGroup controlId="signup-name">
                <ControlLabel>Name:</ControlLabel>
                <FormControl inputRef={(c) => { this.UserEditName = c; }} value={name} type="text" />
              </FormGroup>
              <FormGroup controlId="signup-username">
                <ControlLabel>Username:</ControlLabel>
                <FormControl inputRef={(c) => { this.UserEditUsername = c; }} value={username} type="text" />
              </FormGroup>
              */}
              <FormGroup controlId="signup-email">
                <ControlLabel>Email:</ControlLabel>
                <FormControl inputRef={(c) => { this.formEmail = c; }} value={this.state.email} onChange={this.handleChange} name="email" type="email" />
              </FormGroup>
              <FormGroup controlId="signup-email">
                <ControlLabel>Institution:</ControlLabel>
                <FormControl inputRef={(c) => { this.formInst = c; }} value={this.state.institution} onChange={this.handleChange} name="institution" type="text" />
              </FormGroup>
              <Button
                bsStyle="primary"
                type="submit"
                block
              >Save</Button>
            </form>
          </div>
        </div>
      );
    }
  }
}

UserEdit.displayName = 'UserEdit';

UserEdit.propTypes = {
  auth: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(UserEdit);
