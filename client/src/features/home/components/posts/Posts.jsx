import { Grid } from '@mui/material'
import React from 'react'
import PostsItem from './postsItem/PostsItem'

const Posts = ({posts, handleLikePost, user}) => {
    
    return (
        <Grid container alignItems="stretch" justifyContent="center" spacing={3}>
            {posts.map((posts, index) => (
                <Grid key={index} item xs={11} sm={9} lg={8}>
                    <PostsItem posts={posts} handleLikePost={handleLikePost} user={user} />
                </Grid>
            ))}
        </Grid>
    )
}

export default Posts
