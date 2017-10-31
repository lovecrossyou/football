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
        trList = trList.slice(0,3);
        for (let i=0;i<trList.length;i++) {
            let tdArr = trList.eq(i+2).find("td");
            let game_type = tdArr.eq(1).text();//赛事类型
            let game_time = tdArr.eq(2).text();//开始时间
            let game_status = tdArr.eq(3).text();//比赛状态
            let game_host = tdArr.eq(4).find('a').text();//主队
            let game_result = tdArr.eq(5).text();//比赛结果
            let game_guest = tdArr.eq(6).find('a').text();//客队
            let game_guest1 = tdArr.eq(7).text();//结果
            let game_guest2 = tdArr.eq(8).text();//结果
            let game_guest3 = tdArr.eq(9).text();//结果
            let game_guest4 = tdArr.eq(10).text();//结果


            let game_guest5 = tdArr.eq(11);
            let hrefs = $(game_guest5).children('a');
            let urls = [] ;
            for (let i=0;i<hrefs.length;i++) {
                let tdArr = hrefs.eq(i).find("a");
                urls.push({
                    url1:tdArr.eq(0).text(),
                    url2:tdArr.eq(1).text(),
                    url3:tdArr.eq(2).text()
                });
            }

            console.log({
                game_type:game_type,
                game_time:game_time,
                game_status:game_status,
                game_host:game_host,
                game_guest:game_guest,
                game_result:game_result,
                game_guest1:game_guest1,
                game_guest2:game_guest2,
                game_guest3:game_guest3,
                game_guest4:game_guest4,
                game_guest5:urls,
            })
        }



        // $('table tr').each(function (i, elem) {
        //     $(this).find('td').map(function (index, e) {
        //         let a = $(this).text().trim();
        //         console.log(a);
        //         console.log('td*******************************************',index);
        //     });
        //     console.log('tr*******************************************',i);
        // });
    });
}


fetchPage = (url) => {
    startRequest(url);
}

fetchPage(url);
