import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import DateFormats from '../../constants/date-formats';

import { formatDate } from '../../utils/moment';

const useStyles = makeStyles(theme => ({
  card: {
    margin: 10
  },
  cardTitle: {
    '& a': {
      color: theme.palette.secondary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  }
}));

const Post = ({ post }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        classes={{ title: classes.cardTitle }}
        title={<Link to={`/post/${post.id}`}>{post.title}</Link>}
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
