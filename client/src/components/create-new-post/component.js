import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import MainWrapper from '../common/main-wrapper';
import PostWrapper from '../common/post-wrapper';
import CreateNewPostForm from './create-new-post-form';

const styles = theme => ({
  wrapper: {
    margin: theme.spacing(1)
  }
});

class CreateNewPost extends Component {
  constructor(props) {
    super(props);

    this.handleCreateNewPost = this.handleCreateNewPost.bind(this);
  }

  handleCreateNewPost(values, recaptcha) {
    const { mutate, history } = this.props;

    return mutate({
      variables: {
        text: values.postText,
        title: values.postTitle
      },
      context: { recaptcha }
    }).then(({ data }) => {
      const { createPost } = data;

      return history.push(`/post/${createPost.id}`);
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <MainWrapper>
        <PostWrapper>
          <div className={classes.wrapper}>
            <Typography variant="h4">Create New Post</Typography>
            <CreateNewPostForm onSubmit={this.handleCreateNewPost} />
          </div>
        </PostWrapper>
      </MainWrapper>
    );
  }
}

CreateNewPost.propTypes = {
  classes: PropTypes.shape({
    wrapper: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  mutate: PropTypes.func.isRequired
};

export default withStyles(styles)(CreateNewPost);
