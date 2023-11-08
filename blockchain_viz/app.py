from flask import Flask, render_template
import requests

app = Flask(__name__)


# Function to fetch data from CoinMarketCap API
def fetch_coinmarketcap_data():
    # Replace 'YOUR_API_KEY' with your actual CoinMarketCap API key
    API_KEY = '73bef37a-8b85-41d7-8190-ca4c50a2179f'
    API_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'
    
    parameters = {
        'start': '1',
        'limit': '10',
        'convert': 'USD'
    }
    
    headers = {
        'Accepts': 'application/json',
        'X-CMC_PRO_API_KEY': API_KEY,
    }
    
    response = requests.get(API_URL, headers=headers, params=parameters)
    data = response.json()
    
    cryptos = data['data']
    crypto_data = [{'name': crypto['name'], 'price': crypto['quote']['USD']['price'], 'market_share': crypto['quote']['USD']['market_cap']} for crypto in cryptos]
    
    # Sort the crypto_data list based on cryptocurrency prices (descending order)
    crypto_data.sort(key=lambda x: x['price'], reverse=True)
    
    return crypto_data

@app.route('/')
def index():
    crypto_data = fetch_coinmarketcap_data()
    return render_template('index.html', crypto_data=crypto_data)

if __name__ == '__main__':
    app.run(debug=True)
