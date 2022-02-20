import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { fetchCoins } from "../api"
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useSetRecoilState } from "recoil";
import { isDartAtom } from "../atoms";

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
    position: relative;
`
const Btn = styled.button`
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    color : gray;
    background: none;
    border: none;
    cursor: pointer;
    color : ${(props) => props.theme.textColor === 'white' ? 'white' : 'black'};
    transition: color 1s;
    &:hover {
        font-weight: bold;
    }
`

const CoinsList = styled.ul``

const Coin = styled.li`
    background-color: ${(props) => props.theme.cardBgColor};
    color: ${(props) => props.theme.textColor};
    margin-bottom: 10px;
    border-radius: 15px;
    border: 1px solid white;
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
        img {
            transform: rotate(360deg);
            transition: 1s;
        }
    }
`


const Title = styled.h1`
    font-size: 48px;
    color : ${props => props.theme.accentColor};
    font-family: Arial, Helvetica, sans-serif;
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

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins() {
    // const [coins, setCoins] = useState<ICoin[]>([])
    // const [loading, setLoading] = useState(true)
    /* 
        1.컴포넌트가 시작될 때
        2.컴포넌트가 끝날 때
        3.뭐든 변화가 일어날 때 마다

        이번 useEffect의 경우 컴포넌트가 처음 시작될때 한번만 하기 위해서 씀<div className=""></div>
    */
    // useEffect(() => {
    //     //즉시실행
    //     (async() => {
    //         const response = await fetch("https://api.coinpaprika.com/v1/coins")
    //         const json = await response.json()
    //         setCoins(json.slice(0, 100))
    //         setLoading(false)
    //     })()
    // }, [])

    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins)
    /*
    
        useQuery 총 2가지 인자가 필요함.
        첫번째 고유식별자,두번째 fetcher 함수

        isLoading 은 boolean 값을 갖는다. loading 컴포넌트 대체 가능
        fetchCoins 가 끝나면 함수의 데이터를 data에 담아줌
        
        fetchCoins 가 로딩중이라면 isLoading 에서 알려줌.

        useQuery 에 type 넣어줌 또한 data 에 ? 달아줘서 undefined 대비

        react-query  가 데이터를 캐시에 저장해두기 때문에 데이터를 파괴하지 않음.
    
    */
    const setDarkAtom = useSetRecoilState(isDartAtom)
    const toggleDarkAtom = () => setDarkAtom(prev => !prev)

    return (
        <Container>
            <HelmetProvider>
                <Helmet>
                    <title>코인</title>
                </Helmet>
            </HelmetProvider>
            <Header>
                <Title>Coin</Title>
                <Btn onClick={toggleDarkAtom}>Toggle Mode</Btn>
            </Header>
            {
                isLoading
                ? <Loader>Loading ...</Loader>
                : <CoinsList>
                    {data?.slice(0,100).map(coin => (
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