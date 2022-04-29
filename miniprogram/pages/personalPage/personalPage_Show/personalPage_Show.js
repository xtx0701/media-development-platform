const userMessage = require('../../../utils/utils_getUserMessage');
const userUpdate = require('../../../utils/utils_userUpdate');
import { getStorage } from '../../../utils/utils_wxApi';
import { getUserMessage } from '../../../utils/utils_getUserMessage';
import { userDelete, userUploadPlog, userUploadVlog } from '../../../utils/utils_userUpdate';
Page({

        /**
         * 页面的初始数据
         */
        data: {
                userContent: [],//储存用户的照片或者视频
                deleteContent: [],//储存用户要删除的数据
                chooseAll: false,//是否选择了所有照片
                chooseNum: 0,//选择的照片数量
                pageType: '',//判断进入的是照片展示还是视频展示
                isChoose: false,//判断是否点击了选择按钮
                buttonHeight: 0//侧边栏按钮高度
        },
        // 返回按钮事件
        backUser: function () {
                wx.navigateTo({ url: '../../personalPage/personalPage' });
        },

        // 选择按钮事件
        isChoose: function () {
                const that = this;
                const { userContent, isChoose } = that.data;
                userContent.map((uObj)=>{ return uObj.checked=false});
                that.setData({
                        isChoose: false,
                        userContent,
                        chooseAll: false,
                        isChoose:!isChoose
                })
        },

        // 选择照片
        choosePhoto: function (e) {
                const that = this;
                const { index: num } = e.currentTarget.dataset;
                const { userContent, deleteContent } = this.data;
                userContent[num].checked = !userContent[num].checked;
                if (userContent[num].checked) deleteContent.push(num);
                else deleteContent.map((dObj, index) => { if (dObj === num) deleteContent.splice(index, 1) });
                if (userContent.length === deleteContent.length) that.setData({ chooseAll: true });
                else that.setData({ chooseAll: false })
                that.setData({
                        userContent,
                        deleteContent,
                        chooseNum: that.data.deleteContent.length
                })
        },

        // 全选按钮事件
        chooseAll: function () {
                const that = this;
                const { userContent, chooseAll } = that.data;
                let allChecked = false;
                if (!chooseAll)  allChecked=true;
                const chooseArray=allChecked?[userContent,userContent.length]:[[],0];
                userContent.map((uObj)=>{return uObj.checked=allChecked });
                that.setData({
                        userContent,
                        deleteContent:chooseArray[0],
                        chooseNum:chooseArray[1],
                        chooseAll:!chooseAll
                })
        },

        // 删除按钮事件
        deleteContent: async function () {
                const that = this;
                const { userContent, deleteContent, pageType } = that.data;
                const userChoose = (await wx.showModal({ title: '删除所选内容' })).cancel;
                if (userChoose) return;
                wx.showLoading();
                const openId = await getStorage('openId');
                await Promise.all(deleteContent.sort().reverse().map(async (dNum) => {
                        await userDelete(openId, userContent[dNum].src);
                        userContent.splice(dNum, 1);
                }))
                const dealContent = userContent.map((uObj) => { return uObj.src; })
                // 若删除后数组为空必须加入引号才能提交(后端规定不能提交空数组)
                const newDealContent = dealContent.length === 0 ? [""] : dealContent;
                if (pageType === 'plog') userUploadPlog(openId, newDealContent);
                else userUploadVlog(openId, newDealContent);
                that.addCheaked(pageType);
                that.setData({
                        isChoose: false,
                        chooseNum: 0,
                        deleteContent: []
                })
                wx.showToast({ title: '删除成功' });
                wx.hideLoading();
        },

        // 请求数据并且加入checked属性
        addCheaked: async function (type) {
                try {
                        const that = this;
                        const openId = await getStorage('openId');
                        class Content {
                                constructor(src) {
                                        this.src = src;
                                        this.checked = false;
                                }
                        };
                        const userInfo = await getUserMessage('getInfo', openId);
                        const dealContent = await Promise.all(userInfo[type].map(async (uObj) => {
                                return new Content(uObj);
                        }))
                        that.setData({ userContent: dealContent });
                } catch (err) {
                        throw err;
                }
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
                const that = this;
                // 设置侧边栏按钮的高度
                const buttonHeight = wx.getMenuButtonBoundingClientRect().top;
                that.setData({ buttonHeight });
        },

        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        onReady: function () {

        },

        /**
         * 生命周期函数--监听页面显示
         */
        onShow: function (options) {
                const that = this;
                const pages = getCurrentPages();//获取页面栈数据
                const currentPage = pages[pages.length - 1];//最大索引的页面为当前页面
                that.setData({ pageType: currentPage.options.type });
                that.addCheaked(currentPage.options.type);//加载或者刷新页面的内容
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