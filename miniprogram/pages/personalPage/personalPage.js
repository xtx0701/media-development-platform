// pages/personalPage/personalPage.js
import { getUserMessage } from '../../utils/utils_getUserMessage';
import { userUploadVlog, userUploadPlog } from '../../utils/utils_userUpdate';
import { uploadFile, getStorage } from '../../utils/utils_wxApi';
import {countUserLevel} from '../../utils/utils_countUserExperience'
Page({

        /**
         * 页面的初始数据
         */
        data: {
                userInfo: [],//用户信息
                userLevel: '',//用户等级
                userPhotoNum: 0,//用户照片数量
                userVlogNum: 0,//用户视频数量
                buttonHeight: 0,//按钮高度
                userLevel: ''//用户等级
        },

        // 计算用户等级和所差经验值
        countUserLevel: async function (num) {
                try {
                        const that = this;
                        const experience = await countUserLevel(num);
                        that.setData({
                                userLevel: experience[2]
                        })
                } catch (err) {
                        throw err;
                }
        },

        // 返回按钮事件
        backIndex: function () {
                wx.switchTab({
                        url: '../index/index',
                })
        },

        // 跳转到用户展示详情页
        goDetail: function (e) {
                wx.navigateTo({
                        url: `../../pages/personalPage/personalPage_Show/personalPage_Show?type=${e.currentTarget.dataset.type}`,
                })
        },

        // 用户发表图片
        userUploadPhoto: async function () {
                const that = this;
                try {
                        const plogUrl = (await wx.chooseImage({ count: 9, sizeType: "compressed" })).tempFilePaths;
                        wx.showLoading({ title: '发表中' });
                        const { plog, openId } = that.data.userInfo;
                        const newPlogUrl = await Promise.all(plogUrl.map(async (pUrl) => {
                                return await uploadFile(pUrl, openId);
                        }))
                        const newPlog = [...newPlogUrl, ...plog];
                        await userUploadPlog(openId, newPlog);
                        const newUserInfo = await getUserMessage('getInfo', openId);
                        that.setData({
                                userInfo: newUserInfo,
                                userPhotoNum: newUserInfo.plog.length
                        })
                        wx.hideLoading();
                        wx.showToast({ title: '上传成功', icon: 'success' });
                } catch (err) {
                        throw (err);
                }
        },

        // 视频上传
        userUploadVlog: async function () {
                const that = this;
                try {
                        const vlogUrl = (await wx.chooseVideo({ camera: 'back', maxDuration: 30 })).tempFilePath;
                        wx.showLoading({ title: '发表中' });
                        const { vlog, openId } = that.data.userInfo;
                        const newVideoUrl = await uploadFile(vlogUrl, openId);
                        const newVlog = [...newVideoUrl, ...vlog];
                        await userUploadVlog(openId, newVlog);
                        const newUserInfo = await getUserMessage('getInfo', openId);
                        that.setData({
                                userInfo: newUserInfo,
                                userVlogNum: newUserInfo.vlog.length
                        })
                        wx.hideLoading();
                        wx.showToast({ title: '上传成功', icon: 'success' });
                } catch (err) {
                        throw (err);
                }
        },
        // 视频报错
        videoErrorCallback: function (e) {
                throw ('视频错误信息', e);
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
                const that = this;
                // 设置侧边栏按钮的高度
                const buttonHeight = wx.getMenuButtonBoundingClientRect().top;
                that.setData({ buttonHeight })
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
                try {
                        wx.showLoading();
                        const openId = await getStorage('openId');
                        const userInfo = await getUserMessage('getInfo', openId);
                        that.countUserLevel(userInfo.experience);
                        console.log(that.data.userLevel);
                        that.setData({
                                userInfo,
                                userPhotoNum: userInfo.plog.length,
                                userVlogNum: userInfo.vlog.length
                        })
                        wx.hideLoading();
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
