import axios from "axios"

export const convertData = async (req, res) => {
    const path = process.env.API_URL
    const key = process.env.EXCHANGE_RATE_API_KEY
    try{
        const { from, to, amount } = req.body
        const url = `${path}/${key}/pair/${from}/${to}/${amount}`
        const response = await axios.get(url)
        if(response.data && response.data.result === 'success'){
            res.status(200).json({
                base: from,
                target: to,
                conversionRate: response.data.conversion_rate,
                convertedAmount: response.data.conversion_result
            })
        }else{
            res.status(400).json({
                msg:'Error converting currency ', details: response.data
            })
        }
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: 'Error al realizar la conversión ', e})
    }
}