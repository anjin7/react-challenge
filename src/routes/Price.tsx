import { useQuery } from "react-query";
import styled from 'styled-components';
import { fetchCoinTickers } from "../api";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const PriceList = styled.ul`
`;

const Data = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  padding: 12px 36px;
  margin-bottom: 10px;
  border-radius: 15px;
  border: 1px solid white;
  `;

const DataTitle = styled.h3`
  font-size: 14px;
  margin-bottom: 6px;
  color: ${props => props.theme.accentColor};
`;

const CoinData = styled.div`
  font-size: 16px;
  color: ${props => props.theme.textColor};
`;

interface PriceProps {
  coinId: string;
};
interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
};

function Price({ coinId }: PriceProps) {
  const { isLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading price..."
      ) : (
          <Container>
            <PriceList>              
              <Data>
                <DataTitle>Market Cap</DataTitle>
                <CoinData>$ {tickersData?.quotes?.USD?.market_cap}</CoinData>
              </Data>
              <Data>
                <DataTitle>Volume (24h)</DataTitle>
                <CoinData>$ {tickersData?.quotes?.USD?.volume_24h?.toFixed(3)}</CoinData>
              </Data>
              <Data>
                <DataTitle>Percent Change (6h)</DataTitle>
                <CoinData>{tickersData?.quotes?.USD?.percent_change_6h?.toFixed(2)} %</CoinData>
              </Data>
              <Data>
                <DataTitle>Percent Change (24h)</DataTitle>
                <CoinData>{tickersData?.quotes?.USD?.percent_change_24h?.toFixed(2)} %</CoinData>
              </Data>
              <Data>
                <DataTitle>Percent Change (7d)</DataTitle>
                <CoinData>{tickersData?.quotes?.USD?.percent_change_7d?.toFixed(2)} %</CoinData>
              </Data>
            </PriceList>
            
          </Container>      
      )}
    </div>
  );
}

export default Price;