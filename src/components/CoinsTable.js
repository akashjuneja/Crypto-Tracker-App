import { Container, ThemeProvider, Typography ,createTheme, 
    TextField, TableContainer, LinearProgress, Table, TableHead,
     TableRow,TableCell, TableBody,makeStyles,
 } from '@material-ui/core';
import Pagination from "@material-ui/lab/Pagination";
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Classnames } from 'react-alice-carousel';
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext'

export const CoinsTable = () => {
    const {currency,symbol}=CryptoState()
    const [coins, setcoins] = useState([]);
    const [loading, setloading] = useState(false);
    const [search, setsearch] = useState();
    const [page, setPage] = useState(1);
    const navigate=useNavigate()
   //functions to get coins
    const getCoins= async()=>{
        setloading(true)
     const res=await axios.get(CoinList(currency))
     const data=await res.data
        setcoins(data)
        setloading(false)
    }
   console.log(coins)

   //UseEffect to load the data
    useEffect(() => {
       getCoins()
    }, []);
    

     const darkTheme = createTheme({
      palette: {
          primary:{
              main:"#fff"
          },
    type: 'dark',
  },
});
const useStyles = makeStyles({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold",
      },
    },
  });
  function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  const classes=useStyles()

//function to filter name

const handleSearch=()=>{
    return coins.filter((coin)=>(
        coin.name.toLowerCase().includes(search)||
        coin.symbol.toLowerCase().includes(search)
    ))
}

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <Container style={{textAlign:"center"}}>
                    <Typography variant="h4"
                    style={{margin:18,fontFamily:"Montserrat"}}>
                        CryptoCurriencies Prices by market Cap
                    </Typography>
                     <TextField label="Search for CryptoCurrency" 
                     variant="outlined"
                     style={{marginBottom:20,width:"100%"}}
                     onChange={(e)=>{
                         setsearch(e.target.value)
                     }}
                     >
                     </TextField>
                     <TableContainer>
                         {loading?(<LinearProgress style={{backgroundColor:"gold"}}>
                         </LinearProgress>):(
                             <Table>
                                 <TableHead style={{backgroundColor:"EEBC1D"}}>
                                     <TableRow>
                                         {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                       <TableCell
                                        style={{
                                        color: "black",
                                         fontWeight: "700",
                                         fontFamily: "Montserrat",
                                         backgroundColor:"gold"
                                               }}
                                           key={head}
                                           align={head === "Coin" ? "" : "right"}
                                                      >
                                                {head}
                                        </TableCell>
                                        ))}
                                     </TableRow>
                                 </TableHead>
                                 <TableBody>
                                    {handleSearch()
                                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                    .map((row)=>{
                                        const profit=row.price_change_percentage_24h >= 0
                                        return (
                                            <TableRow 
                                            onClick={()=>navigate(`/coins/${row.id}`)}
                                             className={classes.row}
                                             key={row.name}>
                                            <TableCell component="th"
                                             scope="row"
                                             style={{
                                                 display:"flex",
                                                 gap:15
                                             }}>
                                              <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                                            </TableCell>
                                            <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                 </TableBody>
                             </Table>
                         )
                         }
                         
                     </TableContainer>
                     <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
                </Container>
            </ThemeProvider>
        </div>
    )
}
