import { Avatar, Button, Container, Paper } from "@mui/material";
import { styled } from "@mui/system";

export const ContainerForm = styled(Container)(({theme}) => ({
    [theme.breakpoints.down('sm')]:{
        paddingTop:'8vh',
    },
}))

export const PaperForm = styled(Paper)(({theme}) => ({
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2)
}))

export const AvataForm = styled(Avatar)(({theme}) => ({
    backgroundColor: '#ffd600',
    margin: theme.spacing(1)
}))

export const FormData = styled('form')(({theme}) => ({
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
}))

export const ButtonSubmit = styled(Button)(({theme}) => ({
    margin: theme.spacing(3, 0, 2),
}))

