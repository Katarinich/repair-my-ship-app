import React, { Component } from 'react';

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

    mutate({
      variables: { text: values.postText, title: values.postTitle }
    }).then(({ data }) => {
      const { createPost } = data;

      history.push(`/post/${createPost.id}`);
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

export default withStyles(styles)(CreateNewPost);
