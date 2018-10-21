const COS = require('cos-nodejs-sdk-v5')
const path = require('path')
const url = require('url')
const request = require('request')
const fs = require('fs')
const uuidV4 = require('uuid/v4')

const formatParam = file => {
    let dirname = path.dirname(file)
    let ext = path.extname(file)
    let filename = path.basename(file, ext) + '-' + uuidV4()

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
        host: bucket + ".cos." + region + ".myqcloud.com"
    })

    const param_mdfile = formatParam(mdfile)

    if (file.indexOf('http') == 0) {
        return new Promise((resolve, reject) => {
            let temp_image = path.resolve(param_mdfile.dirname, param_mdfile.filename+'.jpg')
            console.log(temp_image)
            request(file).pipe(fs.createWriteStream(temp_image).on('close', () => {
                console.log('finished')
                fs.stat(temp_image, (err, stat) => {
                    console.log(err || stat)
                })
                fs.exists(temp_image, (exists) => {
                    if (exists)
                        console.log("exists")
                    else 
                        console.log("not exis")
                })
    
                console.log(path.resolve(__dirname, temp_image))
    
                cos.putObject({
                    Bucket: bucket,
                    Region: region,
                    Key: param_mdfile.filename+'.jpg',
                    Body: fs.readFileSync(path.resolve(__dirname, temp_image))
                }, (err, data) => {
                    console.log(err || data)
                    if (err) {
                        reject(err)
                    } else {
                        resolve({
                            name: param_mdfile.filename,
                            url: url.resolve(domain, param_mdfile.filename+'.jpg')
                        })
                    }
                })
            }))
            
        })

    } else {
        const param = formatParam(file)

        console.log(param)
        console.log(param_mdfile)
        if (param.dirname == '.') {
            console.log(path.resolve(param_mdfile.dirname, file))
            file = path.resolve(param_mdfile.dirname, file)
        }

        return new Promise((resolve, reject) => {
            fs.exists(file, exists => {
                if (!exists)
                    reject("The local file is not available.")
            })

            // @ts-ignore
            cos.putObject({
                Bucket: bucket,
                Region: region,
                Key: param.filename+param.ext,
                Body: fs.readFileSync(path.resolve(__dirname, file))

            }, function (err, data) {
                console.log(err || data)
                // console.log(err.statusCode || data.statusCode || "error statusCode")
                if (err) {
                    reject(err)
                } else {
                    resolve({
                        name: param.filename,
                        url: url.resolve(domain, param.filename+param.ext)
                    })
                }
            })
        })
    }
}