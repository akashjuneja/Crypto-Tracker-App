import { makeStyles } from '@material-ui/core';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import { Coins } from './pages/Coins';
import { HomePage } from './pages/HomePage';

function App() {
  const useStyles = makeStyles({
  App:{
    backgroundColor:"#14161a",
    color:"white",
    minHeight:"100vh"
  }
});
const classes = useStyles();
  return (
    <div className={classes.App}>
      
      <BrowserRouter>
      <Header/>
    <div >
      
      <Routes>
    <Route path="/" element={<HomePage/>} exact/>
    <Route path="/coins/:id" element={<Coins/>}/>
    </Routes>
    </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
