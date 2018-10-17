const COS = require('cos-nodejs-sdk-v5')
const path = require('path')
const url = require('url')
const request = require('request')
const fs = require('fs')
const uuidV4 = require('uuid/v4')

const formatParam = file => {
    let dirname = path.dirname(file)
    let ext = path.extname(file)
    let filename = path.basename(file, ext)+'-'+uuidV4()+ext

    return {
        dirname: dirname,
        filename: filename,
        ext: ext
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
    console.log(param)
    
    return new Promise((resolve, reject) => {
        fs.exists(file, exists => {
            if (!exists)
                reject("The local file is not available.")
        })

        cos.putObject({
            Bucket: bucket,
            Region: region,
            Key: param.filename,
            Body: fs.readFileSync(path.resolve(__dirname, file))
        
        }, function (err, data) {
            console.log(err || data)
            // console.log(err.statusCode || data.statusCode || "error statusCode")
            if (err)
            {
                reject(err)
            }
            else {
                resolve({
                    name: param.filename,
                    url: url.resolve(domain, param.filename)
                })
            }
        })
    })
}