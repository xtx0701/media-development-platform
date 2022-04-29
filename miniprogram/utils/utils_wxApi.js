// 获取视频或视频的相对路径
export function uploadFile(file, openId) {
        return new Promise((resolve, reject) => {
                wx.uploadFile({
                        filePath: file,
                        name: 'file',
                        url: `http://42.194.250.165:8081/shot/video/upload1?openId=${openId}`,
                        method: 'POST',
                        header: { "Accept": "*/*" },
                        success: res => { resolve(res.data) },
                        fail: err => { reject(err) }
                });
        })
}

// 获取本地缓存
export function getStorage(key) {
        return new Promise((resolve, reject) => {
                wx.getStorage({
                        key: key,
                        success: res => { resolve(res.data); },
                        fail: err => { reject(err); }
                })
        })
}