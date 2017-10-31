let cheerio = require('cheerio');
let request = require('request');
let iconv = require('iconv-lite');

let url = 'http://www.okooo.com/livecenter/football/?date=2017-10-30';
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
        let trList = $('table').children('tr');
        trList = trList.slice(0, 10);
        for (let i = 0; i < trList.length; i++) {
            let tdArr = trList.eq(i + 2).find("td");
            let game_type = tdArr.eq(1).text();//赛事类型
            if(game_type.length==0)continue;
            let game_time = tdArr.eq(2).text();//开始时间
            let game_status = tdArr.eq(3).text();//比赛状态
            let game_host = tdArr.eq(4).find('a').text();//主队
            let game_result = tdArr.eq(5).text();//比赛结果
            let game_guest = tdArr.eq(6);//客队
            let guestNode = $(game_guest).children('a');
            let guest = guestNode.eq(0).text();
            let game_guest3 = tdArr.eq(9);//胜 平 负
            let valuesNode = $(game_guest3).children('span');
            let values = [];
            values.push({
                win: valuesNode.eq(0).text(),
                even: valuesNode.eq(1).text(),
                lost: valuesNode.eq(2).text(),
            });
            let game_guest5 = tdArr.eq(11);
            let hrefs = $(game_guest5).children('a');
            let urls = [];
            const prefixUrl = 'http://www.okooo.com';
            urls.push({
                oddUrl: prefixUrl + hrefs.eq(0).attr('href'),
                historyUrl: prefixUrl + hrefs.eq(1).attr('href'),
            });

            let game = {
                game_type: game_type,
                game_time: game_time,
                game_status: game_status,
                game_host: game_host,
                game_guest: guest,
                game_result: game_result,
                game_guest3: values,
                game_guest5: urls,
            }
            console.log(game);
        }
    });
}


fetchPage = (url) => {
    startRequest(url);
}

fetchPage(url);
