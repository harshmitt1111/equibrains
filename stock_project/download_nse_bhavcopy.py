import requests
import zipfile
import io
import pandas as pd
from datetime import date, timedelta

BASE = "https://www.nseindia.com"
ARCHIVE = "https://archives.nseindia.com"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept": "*/*",
    "Referer": "https://www.nseindia.com/"
}

# 1️⃣ Create NSE session
session = requests.Session()
session.headers.update(HEADERS)
session.get(BASE, timeout=10)

def try_download(d):
    d_str = d.strftime("%d%m%Y")
    year = d.strftime("%Y")
    month = d.strftime("%b").upper()

    url = f"{ARCHIVE}/content/historical/EQUITIES/{year}/{month}/cm{d_str}bhav.csv.zip"
    print(f"Trying NSE Bhavcopy for {d} ...")

    r = session.get(url, timeout=10)
    if r.status_code != 200:
        return None, None

    z = zipfile.ZipFile(io.BytesIO(r.content))
    csv_name = z.namelist()[0]
    df = pd.read_csv(z.open(csv_name))
    return df, d

# 2️⃣ Try last 30 days (NOT 10)
today = date.today()
df = None
used_date = None

for i in range(30):
    d = today - timedelta(days=i)
    df, used_date = try_download(d)
    if df is not None:
        break

if df is None:
    print("⚠️ NSE bhavcopy unavailable.")
    print("➡️ Falling back to last saved market data.")

    fallback_path = "data/raw/nse_latest.csv"
    if not os.path.exists(fallback_path):
        print("❌ No fallback data available. Exiting.")
        exit(0)

    df = pd.read_csv(fallback_path)
    df["DATE"] = pd.to_datetime(df["DATE"])
    df = df.set_index("DATE")
    used_date = df.index.max()

print(f"\n✅ Using bhavcopy date: {used_date}")

# 3️⃣ Filter your stocks
stocks = ["RELIANCE", "TCS", "INFY"]
df = df[df["SYMBOL"].isin(stocks)]

df["DATE"] = pd.to_datetime(df["TIMESTAMP"])
df = df.set_index("DATE")

df.to_csv("data/raw/nse_latest.csv")
print("✅ Saved: data/raw/nse_latest.csv")
print(df[["SYMBOL", "CLOSE"]])
