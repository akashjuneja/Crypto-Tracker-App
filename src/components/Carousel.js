import { Link, makeStyles } from '@material-ui/core'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import { TrendingCoins } from '../config/api';
import { CryptoState } from '../CryptoContext';
import 'react-alice-carousel/lib/alice-carousel.css';


export const Carousel = () => {
    
    const [coins, setcoins] = useState([]);
    console.log(coins)
    const {currency,symbol}=CryptoState()
   
    const getTrendCoins=async ()=>{
        const res=await axios.get(TrendingCoins(currency))
        const data=await res.data
        setcoins(data)
    }
    useEffect(() => {
        getTrendCoins()
    }, [])
     

    const styles=makeStyles((theme)=>({
    carousel:{
        height:"50%",
        display:"flex",
        alignItems:"center"
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",
    },
}))

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
 const styless=styles()
    const items=coins.map((coin)=>{
        let profit = coin?.price_change_percentage_24h >= 0;
        return(
            <Link
            className={styless.carouselItem}  to={`/coins/${coin.id}`}>
               <img src={coin?.image}
               alt={coin?.name}
               height="80"
               style={{marginBottom:10}}/>
               <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
       <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
            </Link>
            
        )
    })

    const responsive={
        0:{
            items:2
        },
        512:{
            items:4
        }
    }
    return (
        <div className={styless.carousel}>
           <AliceCarousel
          mouseTracking
        infinite
        autoPlayInterval={100}
        animationDuration={5000}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay/>
        </div>
    )
}
