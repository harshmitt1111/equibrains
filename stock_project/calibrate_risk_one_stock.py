import pandas as pd
import numpy as np

# Load cleaned data
df = pd.read_csv("data/cleaned/RELIANCE.NS.csv", index_col=0, parse_dates=True)

# Use calibration period
calibration_df = df.loc["1999-01-01":"2015-12-31"]

# Daily returns
returns = calibration_df["Close"].pct_change().dropna()

# Risk metrics
volatility = returns.std() * np.sqrt(252)
max_drawdown = (
    (calibration_df["Close"] / calibration_df["Close"].cummax()) - 1
).min()

# Print results
print("Calibration Period: 1999–2015")
print(f"Annualized Volatility: {volatility:.2%}")
print(f"Max Drawdown: {max_drawdown:.2%}")
