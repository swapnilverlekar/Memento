import React from 'react';
import useStyles from "./styles";
import { Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import ThumpUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';

const Post =({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
        if (post.likes.length > 0) {
          return post.likes.find((like) => like === (user?.result?.sub || user?.result?._id))
            ? (
              <><ThumpUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.given_name}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>

            </div>

            {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
                <div className={classes.overlay2} >
                    <Button style={{color:'white'}} size='small' onClick={() => setCurrentId(post._id)}>
                        <MoreHoriz fontSize='medium'/>
                    </Button>
                </div>
            )}
            <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={ classes.title} variant='h5' gutterBottom>{post.title}</Typography>
            <CardContent>
            <Typography  variant='body2' color='text-secondary' component='p'>{post.message}</Typography>
            </CardContent >
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                    <Likes />
                </Button>
                    {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
                        <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
                            <DeleteIcon fontSize="small" /> Delete
                        </Button>
                    )}
            </CardActions>
        </Card>
    );
}

export default Post;