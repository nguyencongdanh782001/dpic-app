import { Grid } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router'
import SlideBar from '../components/slidebar/SlideBar'
import Home from '../pages/home/Home'
import NewPost from '../pages/newpost/NewPost'
import Notify from '../pages/notify/Notify'
import { GridLeft, GridRight } from './Style'

const Exhibition = () => {
    const location = useLocation()
    let body 
    body = (
        <>
            {location.pathname === "/exhibition" && <Home/>}
            {location.pathname === "/exhibition/notify" && <Notify/>}
            {location.pathname === "/exhibition/newpost" && <NewPost/>}
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

export default Exhibition
