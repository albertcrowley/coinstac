import { connect } from 'react-redux';
import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import PropTypes from 'prop-types';
import UserEdit from './user-edit';
import { clearError, updateUser } from '../../state/ducks/auth';
import { notifyError, notifySuccess } from '../../state/ducks/notifyAndLog';
import {
  updateUserProp,
} from '../../state/graphql/props';
import {
  UPDATE_USER_MUTATION,
} from '../../state/graphql/functions';

class UserEditController extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleupdateUserError = this.handleupdateUserError.bind(this);
  }

  componentWillUnmount() {
    const { auth, clearError } = this.props;
    if (auth.error) {
      clearError();
    }
  }

  /**
   * Handle new user form submits.
   *
   * @todo  Improve form validation, move Redux action or middleware.
   *
   * @param  {object}    formData
   * @param  {string}    formData.email
   * @param  {string}    formData.institution
   * @param  {string}    formData.name
   * @param  {string}    formData.username
   * @return {undefined}
   */
  /* eslint-disable no-console */
  onSubmit(formData, user = this.props.auth.user) {
    let error;

    // if (!formData.name) {
    //   error = 'Name required';
    // } else if (!formData.username) {
    //   error = 'Username required';
    // } else
    if (!formData.email) {
      error = 'Email required';
    } else if (!formData.institution) {
      error = 'Institution required';
    }

    if (error) {
      return UserEditController.handleupdateUserError(error);
    }

    return this.props.updateUserSettings(user.id, formData.email, formData.institution)
      .then(() => {
        if (!error) {
          this.props.notifySuccess({
            message: 'Changes Saved.',
          });
        }
      })
      .catch((error) => {
        this.props.notifyError({
          message: error.message,
        });
      });
  }

  handleupdateUserError(error) {
    let message;

    if (error.message) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    } else {
      message = 'updateUser error occurred. Please try again.';
    }

    this.props.notifyError({
      message,
    });
  }

  render() {
    return (
      <UserEdit onSubmit={this.onSubmit} />
    );
  }
}
/* eslint-disable no-console */

UserEditController.contextTypes = {
  router: PropTypes.object.isRequired,
};

UserEditController.displayName = 'UserEditController';

UserEditController.propTypes = {
  auth: PropTypes.object.isRequired,
  clearError: PropTypes.func.isRequired,
  notifyError: PropTypes.func.isRequired,
  notifySuccess: PropTypes.func.isRequired,
};

const UserEditControllerWithData = compose(
  graphql(UPDATE_USER_MUTATION, updateUserProp('updateUserSettings')),
  withApollo
)(UserEditController);

function mapStateToProps({ auth, updateUser }) {
  return { auth, updateUser };
}

export default connect(
  mapStateToProps,
  { clearError, notifyError, notifySuccess, updateUser }
)(UserEditControllerWithData);
