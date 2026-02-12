import yfinance as yf
import os

# Ensure folders exist
os.makedirs("data/raw", exist_ok=True)

ticker = "RELIANCE.NS"

df = yf.download(
    ticker,
    start="1999-01-01",
    end="2025-12-31",
    auto_adjust=True,
    progress=True
)

print("Rows downloaded:", len(df))
print(df.head())
print(df.tail())

df.to_csv(f"data/raw/{ticker}.csv")
print("Saved to data/raw/")

