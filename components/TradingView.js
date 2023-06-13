import React from 'react';
import { WebView } from 'react-native-webview';

const TradingView = ({ route }) => {

  const html = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <style>
          #tradingview-widget-container {
            resize: none;
            border: none;
          }
        </style>
        <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
      </head>
      <body>
        <div id="tradingview-widget-container"></div>
        <script type="text/javascript">
          new TradingView.widget({
            autosize: true,
            symbol: "NASDAQ:${route.params.symbol}",
            interval: "D",
            timezone: "Etc/UTC",
            theme: "light",
            style: "1",
            locale: "en",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            hide_top_toolbar: true,
            hide_legend: true,
            save_image: false,
            container_id: "tradingview-widget-container"
          });
        </script>
      </body>
    </html>
  `;

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html }}
      style={{ flex: 1 }}
    />
  );
};

export default TradingView;
