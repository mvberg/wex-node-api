'use strict';

const { WexDepth, WexTrades } = require('../index.js');

const wx = new WexDepth();

wx.subscribe('btc_usd')
    .on('btc_usd', (d) => {
        console.log(d);
    })