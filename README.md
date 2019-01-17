# vscode-upload-tencentcos

vscode 插件，上传图片到腾讯云COS, 返回markdown格式链接

## 功能

* 支持本地选择图片上传
* 支持本地绝对路径上传
* 支持本地相对于 md 文件所在路径上传
* 支持无反爬防盗的简单在线图片路径上传

上传后自动返回 markdown 图片地址插入到当前位置。

## 使用说明

### 获取配置参数[2]

1. 到 [COS 对象存储控制台](https://console.cloud.tencent.com/cos4) 创建存储桶，得到 Bucket（存储桶名称） 和 Region（地域名称）。

存储桶访问权限设置为公有读私有写，详见[存储桶管理  设置访问权限](https://cloud.tencent.com/document/product/436/13315)


2. 到 [控制台密钥管理](https://console.cloud.tencent.com/capi) 获取您的项目 SecretId 和 SecretKey。

根据腾讯云的推荐，同样也是安全性问题，建议创建子用户，策略关联这个，理论上只需要写就足够了，如果之后失败了，可以再关联完全控制功能。

PS. 我当时新建的用户没有关联任何策略，不确认当时腾讯云是否已经推出策略关联来进行权限控制。似乎控制台有些变化了。

### 插件使用

1. 打开md后缀文件，插件会自动激活并读取配置参数

2. 使用
   * 通过`Ctrl/Command+shift+p`打开command palette，输入tencentCOS upload
   * 通过`Alt + u`快捷键呼出
   * 另一地址输出栏同上操作，快捷键为`Alt + y`。

3.  弹出选择图片栏，选中提交会触发上传操作。

4. 上传完成后会在光标所在位置自动插入该图片的markdown链接。

-----------

vscode extension to upload image into tencent COS for markdown 

## Function
* upload Http url image(only jpg/webp)
* upload local image (relative path to the md file || absolute path)
* select local image

## Usage

1. Enter Command Palette.
2. Choose Select/Upload to upload local image to COS. 

# Reference
1. [vscode-qiniu-upload-image](https://github.com/yscoder/vscode-qiniu-upload-image.git)
2. [腾讯云 Node.js SDK](https://cloud.tencent.com/document/product/436/8629)