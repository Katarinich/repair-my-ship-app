import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import DateFormats from '../../constants/date-formats';

import { formatDate } from '../../utils/moment';

const useStyles = makeStyles(() => ({
  card: {
    margin: 10
  }
}));

const Post = ({ post }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        title={post.title}
        subheader={formatDate(post.createdAt, DateFormats.LONG_DATE_FORMAT)}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
