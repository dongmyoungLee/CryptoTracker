import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import styled from "styled-components"

interface RouteParams {
    coinId : string
}
interface RouteState {
    name : string
}
interface ITag {
    coin_counter: number
    ico_counter: number
    id: string
    name: string
}
interface ITeam {
    id: string
    name: string
    position: string
}
// Object.keys(temp1).join() 으로 키값 전부 다 받아오고 쉼표없애서 엔터 친 후, 컨트롤+알트+i 로 모든 영역 선택 후 지우고, Object.values(temp1).map(x => typeof x).join() 로 값의 타입 가져와서 붙여넣기 했음.

interface InfoData {
    id : string
    name : string
    symbol : string
    rank : number
    is_new : boolean
    is_active : boolean
    type : string
    tags : ITag[]
    team : ITeam[]
    description : string
    message : string
    open_source : boolean
    started_at : string
    development_status : string
    hardware_wallet : boolean
    proof_type : string
    org_structure : string
    hash_algorithm : string
    links : object
    links_extended : object
    whitepaper : object
    first_data_at : string
    last_data_a : string
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

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`
const Header = styled.header`
    height : 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Title = styled.h1`
    font-size: 48px;
    color : ${props => props.theme.accentColor};
`
const Loader = styled.span`
    text-align: center;
    display: block;
`
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`
const Description = styled.p`
  margin: 20px 0px;
`

function Coin() {
    const [loading, setLoading] = useState(true)
    const {coinId} = useParams<RouteParams>()
    const { state } = useLocation<RouteState>()
    // useLocation -> Link 값 받아오기 (string)

    const [info, setInfo] = useState<InfoData>()
    const [priceInfo, setPriceInfo] = useState<PriceData>()

    useEffect(() => {
        (async () => {
            const infoData = await (
              await  fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
            ).json()
            const priceData = await (
              await  fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
            ).json()
            setInfo(infoData)
            setPriceInfo(priceData)
            setLoading(false)
        })()
    }, [coinId])
    /*
        코드를 1번만 실행할거면 아무것도 넣지 않음 []
        하지만 hooks 의 최선의 성능을 위해서라면 넣어줘야함.
        coinId가 변하면 동작함. 하지만 내 프로젝트에선 url 이기 때문에 변할수가없음.
        따라서 빈 값이나 넣어준거나 똑같음
    */
    
    return (
        <Container>
            <Header>
                {/* home에서 들어왔으면 state.name을 보여주고 혹은 loading 이 true 라면 Loading... 을, 아니면 info?.name 을 */}
                <Title>{
                state?.name
                ? state.name
                : loading ? "Loading..." : info?.name
                }</Title>
                {/* Home을 기본으로 열어야함. coin 을 가진 URL 로 접속시 component 는 Home에서 클릭할 때 생성되기 때문에 state가 정의되지 않을것임. */}
            </Header>
            {
                loading 
                ? (<Loader>Loading ...</Loader>)
                : (
                    <>
                        <Overview>
                            <OverviewItem>
                            <span>Rank:</span>
                            <span>{info?.rank}</span>
                            </OverviewItem>
                            <OverviewItem>
                            <span>Symbol:</span>
                            <span>${info?.symbol}</span>
                            </OverviewItem>
                            <OverviewItem>
                            <span>Open Source:</span>
                            <span>{info?.open_source ? "Yes" : "No"}</span>
                            </OverviewItem>
                        </Overview>
                        <Description>{info?.description}</Description>
                        <Overview>
                            <OverviewItem>
                            <span>Total Suply:</span>
                            <span>{priceInfo?.total_supply}</span>
                            </OverviewItem>
                            <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{priceInfo?.max_supply}</span>
                            </OverviewItem>
                        </Overview>
                    </>
                )
            }
        </Container>
    )
}
export default Coin