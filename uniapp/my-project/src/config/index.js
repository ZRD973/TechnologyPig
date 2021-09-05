/*
 * @Author: your name
 * @Date: 2021-04-25 18:59:03
 * @LastEditTime: 2021-04-25 20:03:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \HBMSApp\trunk\src\config\index.js
 */
// export const baseApiUrl = 'https://shhb.group/lwp/api';
// export const baseApiUrl='http://172.16.6.84:3000';
// export const baseApiUrl='https://shhb.group/api/test';
export const baseApiUrl='https://shhb.group/api/real';
export const FileApi = baseApiUrl + '/FileApi'
export const baseFileUrl = FileApi + '/FilePreview?appid=NewERP&downloadPath=';

//服务器api地址
export const apiUrl = {
    Api: 'https://shhb.group/api/test/API',
    defaultApi: 'https://shhb.group/api/test/ProManageApi',
    OpenApi: 'https://shhb.group/api/test/OpenApi',
    CenterDataApi:'https://shhb.group/api/test/CenterDataApi',
    FileApi: 'https://shhb.group/api/test/FileApi',
}