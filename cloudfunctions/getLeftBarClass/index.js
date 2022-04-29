// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init({
        env:'bleem-one-0g7wf6h4992ae3cd'
});
const db=cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
        const leftBarClassUser = await db.collection('leftBarClassUser').get();
        const leftBarClassInstall=await db.collection('leftBarClassInstall').get();
        return {
                leftBarClassUser:leftBarClassUser,
                leftBarClassInstall:leftBarClassInstall
        }
}