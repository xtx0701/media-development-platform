//更新照片
export function userUploadPlog(openId, plog) {
        return new Promise((resolve, reject) => {
                wx.request({
                        url: `http://42.194.250.165:8081/shot/user/update`,
                        method: 'POST',
                        data: {
                                'openId': openId,
                                'plog': plog
                        },
                        header: {
                                "Accept": "*/*"
                        },
                        success: (res) => {
                                resolve(res);
                        }, fail: (err) => {
                                reject(err)
                        }
                })
        })
}


//更新视频
export function userUploadVlog(openId, vlog) {
        return new Promise((resolve, reject) => {
                wx.request({
                        url: `http://42.194.250.165:8081/shot/user/update`,
                        method: 'POST',
                        data: {
                                'openId': openId,
                                'vlog': vlog
                        },
                        header: {
                                "Accept": "*/*"
                        },
                        success: (res) => {
                                resolve(res);
                        }, fail: (err) => {
                                reject(err)
                        }
                })
        })
}
// 删除照片或视频
export function userDelete(openid, file) {
        return new Promise((resolve, reject) => {
                wx.request({
                        url: `http://42.194.250.165:8081/shot/video/deleteFile?openId=${openid}&file=${file}`,
                        method: 'POST',
                        header: {
                                "Accept": "*/*"
                        },
                        success: (res) => {
                                resolve(res);
                        }, fail: (err) => {
                                reject(err)
                        }
                })
        })
}



