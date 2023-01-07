import React,{useState, useEffect} from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';

import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from  'react-redux';

import { useHistory } from 'react-router-dom';
import { createPost, updatePost } from '../../actions/posts';
import useStyles from "./styles";

const Form =({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({title: '', message: '', tags: '', selectedFile: ''});
    const post = useSelector((state)=> currentId ? state.posts.find((message) => message._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();

    useEffect(() => {
        if (!post?.title) clear();
        if (post) setPostData(post);
    }, [post]);

    const clear = () => {
        setCurrentId(0);
        setPostData({ title: '', message: '', tags: [], selectedFile: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentId === 0) {
            dispatch(createPost({ ...postData, given_name: user?.result?.given_name }, history));
            clear();
        } else {
            dispatch(updatePost(currentId, { ...postData, given_name: user?.result?.given_name }));
            clear();
        }
    };

    if (!user?.result?.given_name) {
        return (
          <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
              Please Sign In to create your own memories and like other's memories.
            </Typography>
          </Paper>
        );
    }

    
    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId ? `Editing "${post?.title}"` : 'Creating a Memory'}</Typography>
                <TextField name="title" variant='outlined'  label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value})} />
                <TextField name="message" variant='outlined'  label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value})} />
                <TextField name="tags" variant='outlined'  label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',')})} />

                <div className={classes.fileInput}>
                    <FileBase type='file'  multiple= {false} onDone = {({base64}) => setPostData({ ...postData, selectedFile: base64})}/>
                </div>

                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>

        </Paper>
    );
}

export default Form;