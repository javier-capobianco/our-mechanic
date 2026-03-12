# https://www.fueleconomy.gov/feg/ws/ 
# https://www.fueleconomy.gov/feg/epadata/vehicles.csv
import requests
import pandas as pd
from io import StringIO

# URL of the CSV file
csv_url = "https://www.fueleconomy.gov/feg/epadata/vehicles.csv"

# Output file
output_file = "cleaned_cars.csv"


def download_csv(url):
    response = requests.get(url)
    response.raise_for_status()
    return response.text


def process_csv(csv_text):
    # Load CSV into dataframe
    df = pd.read_csv(StringIO(csv_text))

    # Keep only required columns
    df = df[["year", "make", "model"]]

    # Remove duplicates where all three match
    df = df.drop_duplicates(subset=["year", "make", "model"])

    return df


def save_csv(df, filename):
    df.to_csv(filename, index=False)


def main():
    print("Downloading CSV")
    csv_text = download_csv(csv_url)
    print("Processing CSV")
    df = process_csv(csv_text)
    print("Saving CSV")
    save_csv(df, output_file)
    print(f"Clean CSV saved to {output_file}")


if __name__ == "__main__":
    main()