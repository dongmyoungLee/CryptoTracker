import { useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import styled from "styled-components"

interface RouteParams {
    coinId : string
}
interface RouteState {
    name : string
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

function Coin() {
    const [loading, setLoading] = useState(true)
    const {coinId} = useParams<RouteParams>()
    const { state } = useLocation<RouteState>()
    // useLocation -> 값 받아오기

    
    return (
        <Container>
            <Header>
                <Title>{state?.name || "Loading..."}</Title>
                {/* Home을 기본으로 열어야함. coin 을 가진 URL 로 접속시 component 는 Home에서 클릭할 때 생성되기 때문에 state가 정의되지 않을것임. */}
            </Header>
            {
                loading 
                ? <Loader>Loading ...</Loader>
                : null
            }
        </Container>
    )
}
export default Coin