import { useQuery } from "react-query"
import { fetchCoinHistory } from "../api"
import ApexChart from "react-apexcharts"

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

interface ChartProps {
    coinId : string
}

function Chart({ coinId } : ChartProps) {
    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId),
    {
        refetchInterval : 10000,
    }
    )
    return (
        <h1>
            {
                isLoading
                ? "Loading Chart ..."
                : <ApexChart 
                    type="line"
                    series={[
                        {
                            name : "Price",
                            data: data?.map(price => price.close)
                        }
                    ]}
                    options={{
                        theme : {
                            mode : "dark"
                        },
                        chart : {
                            height: 300,
                            width: 500,
                            toolbar: {
                                show : false,
                            },
                            background: "transparent",
                        },
                        grid : {
                            show : false
                        },
                        yaxis : {
                            show : false
                        },
                        xaxis : {
                            labels : {
                                show : false
                            },
                            axisTicks : {
                                show : false
                            },
                            axisBorder : {
                                show : false
                            },
                            type : "datetime",
                            categories : data?.map(price => price.time_close)
                        },
                        stroke: {
                            curve: "smooth",
                            width: 4,
                        },
                        fill : {
                            type : "gradient",
                            gradient : {
                                gradientToColors : ["#0be881"],
                                stops : [0, 100]
                            },
                        },
                        colors : ["blue"],
                        tooltip : {
                            y : {
                                formatter : (value) => `$ ${value.toFixed(2)}`
                            }
                        }
                    }}
                /> 
            }
        </h1>
    )
}
export default Chart