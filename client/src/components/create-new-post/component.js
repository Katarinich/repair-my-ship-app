import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import CreateNewPostForm from '../create-new-post-form';

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

  handleCreateNewPost(values) {
    const { mutate, history } = this.props;

    return mutate({
      variables: { text: values.postText, title: values.postTitle }
    }).then(({ data }) => {
      const { createPost } = data;

      return history.push(`/post/${createPost.id}`);
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container direction="column">
        <Grid container item spacing={0} justify="center">
          <Grid item xs={12} md={6}>
            <div className={classes.wrapper}>
              <Typography variant="h4">Create New Post</Typography>
              <CreateNewPostForm onSubmit={this.handleCreateNewPost} />
            </div>
          </Grid>
        </Grid>
      </Grid>
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
