import { Grid } from '@mui/material'
import React from 'react'
import AllPosts from '../pages/posts/AllPosts'
import AllImage from '../pages/allimage/AllImage'
import Category from '../pages/category/Category'
import { GridLeft, GridRight } from './Style'
import SlideBar from '../components/slidebar/SlideBar'
import DetailCategory from '../pages/detailcategory/DetailCategory'
import { useLocation } from 'react-router'
const Library = () => {
    const location = useLocation()

    let body 
    body = (
        <>
            {location.pathname ==='/library' && <AllPosts/>}
            {location.pathname ==='/library/photos' && <AllImage/>}
            {location.pathname ==='/library/category' && <Category/>}
            {location.pathname ===`/library/category/${location.pathname.split('/')[3]}` && <DetailCategory/>}   
        </>
    )
    return (
        <Grid container justifyContent="space-between">
            <GridLeft item md={4} lg={3}>
               <SlideBar/>
            </GridLeft>
            <GridRight item xs={12} md={8} lg={9}>
                {body}
            </GridRight>
        </Grid>
    )
}

export default Library
