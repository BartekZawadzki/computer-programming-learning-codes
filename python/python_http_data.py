# HTTP i dane w Pythonie: requests (HTTP), pandas (CSV/JSON), walidacja prostymi checkami.
# Linie z komentarzami objaśniającymi.

import requests                      # popularna biblioteka HTTP
import pandas as pd                  # analiza danych (tabele)

BASE_URL = "https://jsonplaceholder.typicode.com"  # przykładowe API

def fetch_posts(limit: int = 5):
    if limit <= 0:
        raise ValueError("limit musi być > 0")     # walidacja wejścia
    url = f"{BASE_URL}/posts"                      # endpoint
    resp = requests.get(url, timeout=5)            # GET z timeout
    resp.raise_for_status()                        # błąd jeśli HTTP != 2xx
    data = resp.json()                             # dekoduj JSON
    return data[:limit]                            # zwróć wycinek

def to_dataframe(posts):
    if not isinstance(posts, list):
        raise TypeError("posts musi być listą")    # walidacja typu
    df = pd.DataFrame(posts)                       # konwersja do DataFrame
    return df                                      # tabela pandas

def save_csv(df: pd.DataFrame, path: str):
    df.to_csv(path, index=False, encoding="utf-8") # zapis bez indeksu

if __name__ == "__main__":
    posts = fetch_posts(3)                         # pobierz 3 posty
    df = to_dataframe(posts)                       # do DataFrame
    print(df.head())                               # podgląd
    save_csv(df, "posts.csv")                      # zapis do CSV

# ---
# Dlaczego tak:
# - requests z timeout i raise_for_status to bezpieczny minimalny wzorzec HTTP w Pythonie.
# - Walidacje (limit > 0, posts jako list) chronią przed złymi danymi jeszcze przed Pandas.
# - DataFrame i save_csv pokazują szybki przepływ: API -> tabela -> zapis.
# - Blok __main__ ułatwia manualny smoke-test bez pisania osobnego skryptu.
