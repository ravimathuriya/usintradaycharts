import React, {useEffect, useState} from 'react'
// import ChartSheet from './ChartSheet'
import Candlechart from './Candlechart';

function Header() {

    const [stock, setStock] = useState([]);
    const [name, setName] = useState("AAPL");
    const [timeframe, setTimeframe] = useState("5min");

    const toDay = new Date()
    const iso = toDay.toISOString();
    const toDate = iso.slice(0, 10);
    
 
    const todayfromDate = new Date()
    todayfromDate.setDate(todayfromDate.getDate()-7)
    const lastDate = new Date(todayfromDate).toISOString();
    const fromDate = lastDate.slice(0, 10);
    

    // const fetchdata = async() =>{
    //     const response = await fetch(`https://financialmodelingprep.com/api/v3/historical-chart/${timeframe}/${name}?from=${fromDate}&to=${toDate}&apikey=BMUnAaJMljEo59BjOrJ4GdZiFkhObm1z`)
        
    //     const data = await response.json();
    //     const CandleHead=  [["Day", "", "", "", ""]];
    //     const candle = [];

    //     for (let index = 0; index < data.length; index++) {
    //         const arr = [];
    //         const date = data[index].date;
    //         const open = data[index].open;
    //         const low = data[index].low;
    //         const close = data[index].close;
    //         const high = data[index].high;
    //         const time = date.slice(11, 16).toString();
            
    //         arr.push(time, low, open, close, high)
    //         candle.unshift(arr)
    //     }
        
    //     setStock(CandleHead.concat(candle))
    // }

    // useEffect(()=>{
    //     fetchdata()
    //     // eslint-disable-next-line 
    // },[timeframe])

    // const handleClick = async() =>{
    //     setName(name)
    //     const response = await fetch(`https://financialmodelingprep.com/api/v3/historical-chart/${timeframe}/${name}?from=${fromDate}&to=${toDate}&apikey=BMUnAaJMljEo59BjOrJ4GdZiFkhObm1z`)
        
    //     const data = await response.json();
    //     const CandleHead=  [["Day", "", "", "", ""]];
    //     const candle = [];

    //     for (let index = 0; index < data.length; index++) {
    //         const arr = []
    //         const date = data[index].date;
    //         const open = data[index].open;
    //         const low = data[index].low;
    //         const close = data[index].close;
    //         const high = data[index].high;
    //         const time = date.slice(11, 16).toString();
            
    //         arr.push(time, low, open, close, high)
    //         candle.unshift(arr)
    //     }
        
    //     setStock(CandleHead.concat(candle))
    // }


    const fetchdata = async() =>{
        const response = await fetch(`https://financialmodelingprep.com/api/v3/historical-chart/${timeframe}/${name}?from=${fromDate}&to=${toDate}&apikey=BMUnAaJMljEo59BjOrJ4GdZiFkhObm1z`)
        const data = await response.json();
        console.log(data)
        // const CandleHead=  [["Day", "", "", "", ""]];
        const candle = [];

        for (let index = 0; index < data.length; index++) {
            const arr = [];
            
            const date = data[index].date;
            const milisec = new Date(date).getTime()
            const x = new Date(milisec)
            const open = data[index].open;
            const low = data[index].low;
            const close = data[index].close;
            const high = data[index].high;
            // const time = date.slice(11, 16).toString();
            
            arr.push(open, high, low, close)

            const y = arr
            const seriesdata = {x, y}
            candle.unshift(seriesdata)
        }
        // console.log(candle)
        setStock(candle)
        
    }

    useEffect(()=>{
        fetchdata()
        // eslint-disable-next-line 
    },[timeframe])

    const handleClick = async() =>{
        setName(name)
        const response = await fetch(`https://financialmodelingprep.com/api/v3/historical-chart/${timeframe}/${name}?from=${fromDate}&to=${toDate}&apikey=BMUnAaJMljEo59BjOrJ4GdZiFkhObm1z`)
        const data = await response.json();
        console.log(data)
        // const CandleHead=  [["Day", "", "", "", ""]];
        const candle = [];

        for (let index = 0; index < data.length; index++) {
            const arr = [];
            
            const date = data[index].date;
            const milisec = new Date(date).getTime()
            const x = new Date(milisec)
            const open = data[index].open;
            const low = data[index].low;
            const close = data[index].close;
            const high = data[index].high;
            // const time = date.slice(11, 16).toString();
            
            arr.push(open, high, low, close)

            const y = arr
            const seriesdata = {x, y}
            candle.unshift(seriesdata)
        }
        console.log(candle)
        setStock(candle)
    }



    return (
        <>
            <nav>U.S. Intraday Trading Charts</nav>
            <section>
                <div>
                    <span>Stock: </span><input type="text" name="stock" id="stock" placeholder='Search your stock' onChange={(e)=>{setName(e.target.value)}}/></div>
                <div><span>Timeframe: </span>
                    <select name="timeframe" id="timeframe" onChange={(e)=>{setTimeframe(e.target.value)}}>
                        <option value="5min">5min</option>
                        <option value="15min">15min</option>
                        <option value="30min">30min</option>
                        <option value="1hour">60min</option>
                    </select>
                </div>
                <button className="btn" onClick={()=>handleClick()}>Search</button>
            </section>

            <div className="stock">
                <div>Index: <span style={{color:"blue", fontWeight:"bold", fontSize:"18px", textTransform:"uppercase"}}>{name}</span></div>
                <div>View Data: <span style={{color:"blue", fontWeight:"bold", fontSize:"18px" }}> {fromDate} </span> To <span style={{color:"blue", fontWeight:"bold", fontSize:"18px"}}> {toDate} </span> </div>
                <div>Timeframe: <span style={{color:"blue", fontWeight:"bold", fontSize:"18px"}}>{timeframe}</span></div>
            </div>

            {/* <ChartSheet stock={stock} /> */}
            <Candlechart stock={stock} />
        </>
    )
}

export default Header
