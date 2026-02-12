import yfinance as yf
import os

os.makedirs("data/raw", exist_ok=True)

tickers = ["RELIANCE.NS", "TCS.NS", "INFY.NS"]

for ticker in tickers:
    print(f"Downloading {ticker}...")
    
    df = yf.download(
        ticker,
        start="1999-01-01",
        end=None,
        auto_adjust=True,
        progress=False
    )
    
    if len(df) == 0:
        print(f"No data for {ticker}")
        continue
    
    df.to_csv(f"data/raw/{ticker}.csv")
    print(f"Saved {ticker}")
