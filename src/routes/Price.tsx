import { useQuery } from "react-query"
import styled from "styled-components"
import { fetchCoinTickers } from "../api"

const PriceList = styled.ul``

const PriceInfo = styled.li`
    text-align: center;
    margin-bottom: 24px;
    font-size: 20px;
    font-family: 'Times New Roman', Times, serif;
`
const PriceDetail = styled.span`
    
`
interface ChartProps {
    coinId : string
}

interface PriceData {
    id : string
    name : string
    symbol : string
    rank : number
    circulating_supply : number
    total_supply : number
    max_supply : number
    beta_value : number
    first_data_at : string
    last_updated : string
    quotes : {
        USD : {
            ath_date: string
            ath_price: number
            market_cap: number
            market_cap_change_24h: number
            percent_change_1h: number
            percent_change_1y: number
            percent_change_6h: number
            percent_change_7d: number
            percent_change_12h: number
            percent_change_15m: number
            percent_change_24h: number
            percent_change_30d: number
            percent_change_30m: number
            percent_from_price_ath: number
            price: number
            volume_24h: number
            volume_24h_change_24h: number
        }
    }
}


function Price({ coinId } : ChartProps) {
    const {isLoading, data} = useQuery<PriceData>(["price", coinId], () => fetchCoinTickers(coinId),
    {
        refetchInterval : 5000,
    }
    )
    return (
        <PriceList>
            <PriceInfo>Price : &nbsp;
                <PriceDetail>
                 $ {data?.quotes.USD.price.toFixed(3)}
                </PriceDetail>
            </PriceInfo>
            <PriceInfo>Change rate (1h) : &nbsp;
                <PriceDetail>
                  {data?.quotes.USD.percent_change_1h} %
                </PriceDetail>
            </PriceInfo>
            <PriceInfo>Change rate (12h) : &nbsp;
                <PriceDetail>
                  {data?.quotes.USD.percent_change_12h} %
                </PriceDetail>
            </PriceInfo>
            <PriceInfo>Change rate (24h) : &nbsp;
                <PriceDetail>
                  {data?.quotes.USD.percent_change_24h} %
                </PriceDetail>
            </PriceInfo>
            <PriceInfo>Change rate (30d) : &nbsp;
                <PriceDetail>
                  {data?.quotes.USD.percent_change_30d} %
                </PriceDetail>
            </PriceInfo>
        </PriceList>
    )
}
export default Price