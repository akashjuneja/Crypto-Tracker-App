import { AppBar, Container, Toolbar, Typography,MenuItem,Select,createTheme,ThemeProvider } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

export const Header = () => {
  const history=useNavigate()
   const {currency,setcurency}=CryptoState()
   console.log(currency)
    const styles=makeStyles((theme)=>({
       header:{
           flex:1,
           color:"gold",
           fontFamily:"montserrat",
           fontWeight:"bold",
           cursor:"pointer",
       },
       
    }))

    const classes=styles()
    
    const darkTheme = createTheme({
      palette: {
          primary:{
              main:"#fff"
          },
    type: 'dark',
  },
});

    return (
        <ThemeProvider theme={darkTheme}>
       <AppBar color="transparent" position="static">
<Container>
    <Toolbar>
        <Typography onClick={()=>{
              history("/")
        }}className={classes.header}>Crypto Tracker</Typography>
        <Select variant="outlined" style={{
            width:100,
            height:40,
            marginRight:15
        }}
        value={currency}
        onChange={(e)=>{
            setcurency(e.target.value)
        }}>
             <MenuItem value={"USD"}>USD</MenuItem>
             <MenuItem value={"INR"}>INR</MenuItem>
        </Select>
    </Toolbar>
</Container>
       </AppBar>
       </ThemeProvider>
    )
}
