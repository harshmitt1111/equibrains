import pandas as pd
import numpy as np

# Load cleaned data
df = pd.read_csv("data/cleaned/RELIANCE.NS.csv", index_col=0, parse_dates=True)

# Use recent period
df = df.loc["2015-01-01":"2025-12-31"]

# Daily returns
df["Returns"] = df["Close"].pct_change()

# Feature calculations
df["Volatility_30d"] = df["Returns"].rolling(30).std() * np.sqrt(252)
df["Volatility_90d"] = df["Returns"].rolling(90).std() * np.sqrt(252)

df["Momentum_6m"] = df["Close"] / df["Close"].shift(126) - 1
df["Momentum_12m"] = df["Close"] / df["Close"].shift(252) - 1

df["MA_50"] = df["Close"].rolling(50).mean()
df["MA_200"] = df["Close"].rolling(200).mean()

df["Trend"] = df["MA_50"] / df["MA_200"] - 1

# Drop NaNs
df = df.dropna()

# Save features
df.to_csv("data/features/RELIANCE_features.csv")

print("Feature engineering completed for RELIANCE.")
print(df.head())
