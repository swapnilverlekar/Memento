import express from 'express';
import { getPostsBySearch, getPosts, createPosts, updatePost, deletePost, likePost } from '../controllers/posts.js';

import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/', getPosts); //all users can see the posts
router.post('/', auth, createPosts); //user needs to be logged in to create a post
router.patch('/:id', auth, updatePost); //user needs to be logged in, only user who created the post shall update it
router.delete('/:id', auth, deletePost); //user needs to be logged in, only user who created the post shall delete it
router.patch('/:id/likePost', auth, likePost); //user needs to be logged in, a user can only like the post once


export default router;