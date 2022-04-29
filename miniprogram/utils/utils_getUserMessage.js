// 获取是否已经注册或者获取用户的个人资料
const getUserMessage = function(url, openId, userName, head){
        return new Promise((resolve, reject) => {
                wx.request({
                        url: `http://42.194.250.165:8081/shot/user/${url}?openId=${openId}&userName=${userName}&head=${head}`,
                        method: 'POST',
                        data:{},
                        header: {
                                "Accept": "*/*"
                        },
                        success: (res) => {
                                resolve(res.data);
                        }, fail: (err) => {
                                reject(err)
                        }
                })
        })
}





module.exports = {
        getUserMessage
}