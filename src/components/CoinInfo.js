import { makeStyles } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { HistoricalChart } from '../config/api';
import { chartDays } from '../config/data';
import { CryptoState } from '../CryptoContext';
import SelectButton from './SelectButton';

export const CoinInfo = ({coin}) => {
    const [days, setdays] = useState(1);
    const [historicdata, sethistoricData] = useState();
    const {currency}=CryptoState()
const [flag,setflag] = useState(false);
    const getdata=async ()=>{
        const {data}=await axios.get(HistoricalChart(coin.id,days,currency))
        sethistoricData(data.prices)
    }

    const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));

  const classes = useStyles();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
    console.log(historicdata)
    useEffect(() => {
       getdata()
    }, []);
    return (
        <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
          {!historicdata?(<CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />):(<>
          <Line
          data={{
              labels:historicdata.map((coin)=>{
                  let date= new date(coin[0])
                  let time=date.getHours()>12?
                  `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets:[{data: historicdata.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",},]
          }}
          options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
          >
           <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setdays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </Line>
          </>)}
      </div>
      </ThemeProvider>
    )
}
