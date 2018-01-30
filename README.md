WEX (formally BTC-e)

```js
const { WexDepth, WexTrades } = require('wex-node-api');

const wx = new WexDepth();

wx.subscribe('btc_usd')
    .on('btc_usd', (d) => {
      // book updates
    })
```