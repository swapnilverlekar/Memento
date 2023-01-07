import React, { useState, useEffect} from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import {useHistory, useLocation} from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import  useStyles from './styles'
import { useDispatch } from "react-redux";
import { getPosts, getPostBySearch } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
// import Pagination from "../Pagination";
import App from '../../App';


function useQuery(){
    return new URLSearchParams(useLocation().search);
}
export const Home = () => {

    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const [ search, setSearch ] = useState('');
    const [ tags, setTags ] = useState([]);



    useEffect(() => {
        dispatch(getPosts());
    },[currentId, dispatch]);

    const handleKeyPress = (e) => {
        if (e.keyCode === 13){
            searchPost();
        }
    }


    const searchPost = () => {
        if(search.trim() || tags){
            dispatch(getPostBySearch({search, tags: tags.join(',')}));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        }else{
            history.push('/');
        }
    }
    const handleAdd = (tag) => setTags([...tags, tag]);
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag)=> tag!== tagToDelete));

    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid container  justify="flex-start" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                            <TextField
                            name="search"
                            variant="outlined"
                            label="Search Memories"
                            fullWidth
                            value={search}
                            onKeyPress={handleKeyPress}
                            onChange={(e)=> setSearch(e.target.value)}/>
                            <ChipInput
                        style={{margin : '10px 0'}}
                        value={tags}
                        onAdd={handleAdd}
                        onDelete={handleDelete}
                        label='Search Tags'
                        variant='outlined'/>

                        <Button className={classes.searchButton} color="primary" onClick={searchPost} variant='contained'>Search</Button>
                        </AppBar>
                        
                        

                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}
