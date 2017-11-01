const fs = require('fs');
const path = require('path');
const mineType = require('mime-types');

convert = () => {
    let filePath = path.resolve('./protocol.pdf');
    let data = fs.readFileSync(filePath);
    data = new Buffer(data).toString('base64');

    let base64 = 'data:' + mineType.lookup(filePath) + ';base64,' + data;

    console.log(base64);
    // fs.writeFileSync(path.resolve('your/save/file/path'), base64);
};

convert();