# vscode-upload-tencentcos

vscode 插件，上传图片到腾讯云COS, 返回markdown格式链接

## 功能

* 支持本地选择图片上传
* 支持本地绝对路径上传
* 支持本地相对于 md 文件所在路径上传
* 支持无反爬防盗的简单在线图片路径上传

上传后自动返回 markdown 图片地址插入到当前位置。

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