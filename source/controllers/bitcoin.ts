import { Request, Response, NextFunction } from 'express';
import axios from 'axios';


const getBitCoinInfo = async (req: Request, res: Response, next: NextFunction) => {

    let currency = req.query.currency;
    // let currentRate: AxiosResponse = await axios.get("https://api.coindesk.com/v1/bpi/currentprice/eur.json").then(response => {

    // })

    
    let val = String(currency).toUpperCase();
    // console.log(currentRate)

    if(val === 'USD' || val === 'EUR') {
        let respUsd: number = await axios.get("https://api.coindesk.com/v1/bpi/currentprice/eur.json").then(response  => response.data.bpi.USD.rate_float);
        let respEur: number = await axios.get("https://api.coindesk.com/v1/bpi/currentprice/eur.json").then(response  => response.data.bpi.EUR.rate_float);
        let dt = new Date()
        let today = dt.toISOString().split('T')[0]
        let last30 = new Date(dt.setDate(dt.getDate() - 30)).toISOString().split('T')[0]
        let respHist: object = await axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${last30}&end=${today}&currency=${currency}`).then(response  => response.data.bpi);
        let allVals = Object.values(respHist)
        let maxVal = Math.max(...allVals)
        let minVal = Math.min(...allVals)
        let currentRate = 0;
        
        if(val === 'USD') {
            currentRate = respUsd
        } else if(val === 'EUR' ) {
            currentRate = respEur
        }
        return res.status(200).json({
            current_rate: currentRate,
            lowest_rate_last: minVal,
            highest_rate: maxVal
        });
    }
    else {
        return res.status(400).json({
            message: "Please provide a valid currency"
        });
    }
    
};
export default { getBitCoinInfo };