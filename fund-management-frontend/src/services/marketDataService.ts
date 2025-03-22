  interface TimeSeriesData {
    "1. open": string;
    "2. high": string;
    "3. low": string;
    "4. close": string;
  }

  export interface MarketData {
    date: string;
    usdToEur: string;
    apple: string;
    google: string;
    amazon: string;
  }
  
  interface ApiKeyResponse {
    marketAPIKey: string;
  }
  
  export const getMarketData = async (): Promise<MarketData[]> => {
    try {
      // Load API key from public/apiKey.json
      const keyResponse = await fetch('/apiKey.json');
      if (!keyResponse.ok) {
        throw new Error('Failed to load API key');
      }
      const keyData: ApiKeyResponse = await keyResponse.json();
      const apiKey = keyData.marketAPIKey;
  
      // Build URLs for the Alpha Vantage API endpoints
      const fxUrl = `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol=EUR&apikey=${apiKey}`;
      const appleUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&apikey=${apiKey}`;
      const googleUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=GOOG&apikey=${apiKey}`;
      const amazonUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AMZN&apikey=${apiKey}`;
  
      // Fetch all endpoints concurrently
      const [fxRes, appleRes, googleRes, amazonRes] = await Promise.all([
        fetch(fxUrl),
        fetch(appleUrl),
        fetch(googleUrl),
        fetch(amazonUrl)
      ]);
  
      // Ensure all responses are successful
      if (!fxRes.ok || !appleRes.ok || !googleRes.ok || !amazonRes.ok) {
        throw new Error('One or more API calls failed');
      }
  
      // Parse JSON responses
      const fxData = await fxRes.json();
      const appleData = await appleRes.json();
      const googleData = await googleRes.json();
      const amazonData = await amazonRes.json();
  
      // Extract the time series data from each API response
      const fxSeries: { [date: string]: TimeSeriesData } = fxData["Time Series FX (Daily)"] || {};
      const appleSeries: { [date: string]: TimeSeriesData }  = appleData["Time Series (Daily)"] || {};
      const googleSeries: { [date: string]: TimeSeriesData }  = googleData["Time Series (Daily)"] || {};
      const amazonSeries: { [date: string]: TimeSeriesData }  = amazonData["Time Series (Daily)"] || {};
  
      // Combine all available dates from the responses
      const dateSet: Set<string> = new Set([
        ...Object.keys(fxSeries),
        ...Object.keys(appleSeries),
        ...Object.keys(googleSeries),
        ...Object.keys(amazonSeries)
      ]);
  
      // Sort dates in descending order (most recent first)
      const dates: string[] = Array.from(dateSet).sort(
        (a, b) => new Date(b).getTime() - new Date(a).getTime()
      );
      console.log(fxSeries, appleSeries)
  
      // Build and return the combined market data
      const combinedData: MarketData[] = dates.map(date => ({
        date,
        usdToEur: fxSeries[date] ? fxSeries[date]["4. close"] : "",
        apple: appleSeries[date] ? appleSeries[date]["4. close"] : "",
        google: googleSeries[date] ? googleSeries[date]["4. close"] : "",
        amazon: amazonSeries[date] ? amazonSeries[date]["4. close"] : "",
      }));
  
      return combinedData;
    } catch (error) {
      console.error("Error in getMarketData:", error);
      throw error;
    }
  }
  