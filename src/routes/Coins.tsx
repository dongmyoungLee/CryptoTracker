import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

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

const CoinsList = styled.ul``

const Coin = styled.li`
    background-color: white;
    color: ${(props) => props.theme.bgColor};
    margin-bottom: 10px;
    border-radius: 15px;
    a {
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color 0.2s ease-in;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor}
        }
    }
`


const Title = styled.h1`
    font-size: 48px;
    color : ${props => props.theme.accentColor};
`
const Loader = styled.span`
    text-align: center;
    display: block;
`
const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`

interface CoinInterface {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins() {
    const [coins, setCoins] = useState<CoinInterface[]>([])
    const [loading, setLoading] = useState(true)
    /* 
        1.컴포넌트가 시작될 때
        2.컴포넌트가 끝날 때
        3.뭐든 변화가 일어날 때 마다

        이번 useEffect의 경우 컴포넌트가 처음 시작될때 한번만 하기 위해서 씀<div className=""></div>
    */
   
    useEffect(() => {
        //즉시실행
        (async() => {
            const response = await fetch("https://api.coinpaprika.com/v1/coins")
            const json = await response.json()
            setCoins(json.slice(0, 100))
            setLoading(false)
        })()
    }, [])

    return (
        <Container>
            <Header>
                <Title>코인</Title>
            </Header>
            {
                loading
                ? <Loader>Loading ...</Loader>
                : <CoinsList>
                    {coins.map(coin => (
                        <Coin key={coin.id}>
                            {/* a태그를 이용하면 새로고침이 되기때문에 사용하지않음 */}
                            {/* Link 로 Object 형식으로 데이터보내기도 가능함 */}
                            <Link to={{
                                pathname: `/${coin.id}`,
                                state: { name: coin.name }
                            }}>
                                <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
                                {coin.name} &rarr;
                            </Link>
                        </Coin>
                    ))}
                  </CoinsList>
            }
        </Container>
    )
}
export default Coins