let cheerio = require('cheerio');
let request = require('request');
let iconv = require('iconv-lite');

let url = 'http://www.okooo.com/livecenter/football/?date=2017-10-29';

startRequest = (url) => {
    request.get({
        url: url,
        encoding: null //让body 直接是buffer
    }, (err, res, buffer) => {
        let html = iconv.decode(buffer, 'gb2312');
        let $ = cheerio.load(html, {
            xml: {
                normalizeWhitespace: true,
            }
        });
        $('table tr').each(function (i, elem) {
            $(this).find('td').map(function (i, e) {
                let a = $(this).text();
                console.log(a);
            });
        });
    });
}


fetchPage = (url) => {
    startRequest(url);
}

fetchPage(url);
