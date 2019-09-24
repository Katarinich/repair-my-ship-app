import React from 'react';
import moment from 'moment';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import './post.scss';

const useStyles = makeStyles(theme => ({
  card: {
    margin: 10
  }
}));

const Post = ({ post }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader title={post.title} subheader={moment(post.createdAt).format('MMMM Do YYYY, h:mm:ss a')} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
