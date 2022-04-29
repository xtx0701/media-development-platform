const _db = wx.cloud;
import { getStorage } from '../../utils/utils_wxApi';
import { getUserMessage } from '../../utils/utils_getUserMessage';
import { countUserLevel } from '../../utils/utils_countUserExperience';
Page({
        data: {
                leftBarClassUser: [],//侧边栏用户选项
                leftBarClassInstall: [],//侧边栏设置
                openleftBar: false,//侧边栏开关
                hasUserInfo: false,//判断用户是否保存了登陆状态
                userInfo: [],//储存用户个人数据
                buttonTop: 200,//客服按钮高度
                buttonStartPageY: 0,//客服按钮的开始高度
                buttonHeight: 0,//与胶囊按钮同行组件距离顶部的高度
                userLevel: '',//用户等级
                userExperience: 0,//用户所需升级经验
                levelPercent: 0,//用户升级所需经验百分比
                userRelease: false//发布按钮点击状态
        },
        //点击按钮打开侧边栏 
        openleftBar: function () {
                this.setData({ openleftBar: true });
        },
        // 点击侧边栏外其他区域关闭侧边栏
        closeleftBar: function () {
                this.setData({ openleftBar: false });
        },
        closeRelease: function () {
                this.setData({ userRelease: false });
        },

        // 用户登陆并且跳转个人资料详情页
        userLogin: async function () {
                const that = this;
                try {
                        const { hasUserInfo } = that.data;
                        if (hasUserInfo) {
                                wx.navigateTo({ url: '../personalPage/personalPage' });
                                return;
                        }
                        const user = (await wx.getUserProfile({ desc: '完善个人信息' })).userInfo;
                        wx.showLoading({ title: '登陆中' });
                        const openId = (await _db.callFunction({ name: 'getUserOpenId' })).result.openid;
                        wx.setStorage({
                                key: 'openId',
                                data: openId
                        })
                        const isRegistered = await getUserMessage('judgeSign', openId);
                        // 根据用户是否注册来判断提交的参数
                        const releaseContent = isRegistered ? [openId] : [openId, user.nickName, user.avatarUrl];
                        const userInfo = await getUserMessage('getInfo', ...releaseContent);
                        that.setData({ userInfo: userInfo });
                        const { experience } = that.data.userInfo;
                        this.countUserLevel(experience);
                        that.setData({ hasUserInfo: true });
                        wx.showToast({ title: '登陆成功' });
                        wx.hideLoading();
                } catch (err) {
                        wx.showToast({ title: '登陆失败', icon: "error" });
                        throw err;
                }
        },
        // 侧边栏按钮跳转
        leftBarMove: function (e) {
        },

        // 客服按钮移动
        buttonStart: function (e) {
                // 获取按钮初始高度
                const that = this;
                that.setData({ buttonStartPageY: e.touches[0].clientY })
        },

        buttonMove: function (e) {
                const that = this;
                const { buttonStartPageY, buttonTop } = that.data;
                const buttonEndY = e.touches[0].clientY;
                const buttonNewY = buttonTop + (buttonEndY - buttonStartPageY);
                that.setData({
                        buttonTop: buttonNewY,
                        buttonStartPageY: e.touches[0].clientY
                })
        },

        // 计算用户等级和所差经验值
        countUserLevel: async function (num) {
                try {
                        const that = this;
                        const experience = await countUserLevel(num);
                        const userExperience = ((experience[0] * 100) - num);
                        const levelPercent = (num / ((experience[0] - experience[1]) * 100));
                        that.setData({
                                userLevel: [experience[2], experience[3]],
                                userExperience,
                                levelPercent
                        })
                } catch (err) {
                        throw err;
                }
        },

        // 发布按钮
        userRelease: function () {
                const that = this;
                const { userRelease } = that.data;
                that.setData({ userRelease: !userRelease });
        },

        // 选择发布内容
        chooseReleaseContent: function (e) {
                wx.navigateTo({ url: `../userRelease/userRelease?typeNum=${e.currentTarget.dataset.typeNum}` })
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
                const that = this;
                // 设置侧边栏按钮的高度
                const buttonHeight = wx.getMenuButtonBoundingClientRect().top;
                that.setData({ buttonHeight: buttonHeight });

                // 在云数据库请求侧边栏选项的图标和文字
                _db.callFunction({
                        name: 'getLeftBarClass'
                }).then(res => {
                        const { leftBarClassUser, leftBarClassInstall } = res.result;
                        that.setData({
                                leftBarClassUser,
                                leftBarClassInstall
                        })
                }).catch(err => { console.log('失败了', err); })
        },

        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        onReady: function () {

        },

        /**
         * 生命周期函数--监听页面显示
         */
        onShow: async function () {
                const that = this;
                // tabBar栏
                if (typeof that.getTabBar === 'function' && that.getTabBar()) {
                        that.getTabBar().setData({ selected: 0 });
                }
                try {
                        // 检测用户是否保存了登陆状态
                        const openId = await getStorage('openId');
                        const userInfo = await getUserMessage('getInfo', openId);
                        that.countUserLevel(userInfo.experience);
                        that.setData({
                                userInfo,
                                hasUserInfo: true
                        })
                } catch (err) {
                        throw (err);
                }
        },

        /**
         * 生命周期函数--监听页面隐藏
         */
        onHide: function () {

        },

        /**
         * 生命周期函数--监听页面卸载
         */
        onUnload: function () {
        },

        /**
         * 页面相关事件处理函数--监听用户下拉动作
         */
        onPullDownRefresh: function () {

        },

        /**
         * 页面上拉触底事件的处理函数
         */
        onReachBottom: function () {

        },

        /**
         * 用户点击右上角分享
         */
        onShareAppMessage: function () {

        }
})