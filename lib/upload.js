const COS = require('cos-nodejs-sdk-v5')
const path = require('path')
const url = require('url')
const request = require('request')
const fs = require('fs')

const formatParam = file => {
    return {
        dirname: path.dirname(file),
        filename: path.basename(file),
        ext: path.extname(file)
    }
}

module.exports = ({
    secret_id,
    secret_key,
    bucket,
    region
}, file, mdfile) => {
    var cos = new COS({
        SecretId: secret_id, 
        SecretKey: secret_key
    });
    let domain = url.format({
        protocol: "https:",
        host: bucket+".cos."+region+".myqcloud.com"
    })

    const param = formatParam(file)
    console.log(domain)
    console.log(cos)
    // let filename = "avatar_001.jpg"
    // console.log(filename)
    cos.putObject({
        Bucket: bucket,
        Region: region,
        Key: param.filename,
        Body: fs.readFileSync(path.resolve(__dirname, file))
    
    }, function (err, data) {
        console.log(err || data);
        
    })

    // console.log("succeed")
    return new Promise((resolve, reject) => {
        resolve({
            name: param.filename,
            url: url.resolve(domain, param.filename)
        })
    })
}