# Change Log
All notable changes to the "vscode-upload-tencentcos" extension will be documented in this file.

## [Unreleased]
* 考虑在markdown文件下的相对路径的图片被上传
* ‎显示无此图片的error信息
* ‎根据return状态码进行错误显示

## 0.2.0 / Unreleased
* add local upload error message
    * add error: local file is not available when using upload according path
    * add error: fail to upload according to network error or config error.

## 0.1.0 / 2018-10-16
* add uuidv4 into filename in case overwriting the image file

## 0.0.2 / 2018-10-16
* fix the bug that the file's name uploaded is the absolute path which it should be only the file name.

## 0.0.1 / 2018-10-15

* Baic upload local file to tencent COS