<template>
    <div class="footerbg">
        <div class="white_W1200">
            <div class="footernavbox">
                <div class="footnav">
                    <ul>
                        <li @click="onGoAfter('about', 'one')"><span class="iconfont icon-info1 blue"></span>平台简介</li>
                        <li @click="onGoAfter('about', 'two')">公司介绍</li>
                        <li @click="onGoAfter('about', 'three')">联系我们</li>
                        <!-- <img src="../../assets/images/footer/qq.jpeg"> -->
                        <li @click="onGoAfter('help', 'hyxw')"><span class="iconfont icon-wenhao "></span>新手指引</li>
                        <li @click="onGoAfter('help', 'hyxw')">协议下载</li>
                        <li @click="onGoAfter('help', 'hyxw')">操作手册</li>
                    </ul>
                </div>
                <div class="footline"></div>
                <div class="focus">
                    <div class="focousus">关注我们</div>
                    <div class="qqimg"><img src="../../assets/images/footer/qq.jpeg"></div>
                    <div class="qqimg"><img src="../../assets/images/footer/wechat.jpeg"></div>
                </div>
                <div class="footline"></div>
                <div class="mobilephone">
                    <div class="iphone"><img src="../../assets/images/footer/iphone.jpeg"></div>
                    <div class="iphone android"><img src="../../assets/images/footer/android.jpeg"></div>
                </div>
                <div class="footline"></div>
                <div class="weekbox">
                    <div class="week">周一至周五 8:30 - 18:00</div>
                    <div class="tel">400-0531-587</div>
                    <div class="week">客服邮箱：kf@cnpyr.com</div>
                </div>
            </div>
            <div class="copyright"> Copyright 2019 www.cnpry.com AII Rights Reserved. 鲁ICP备 19023221号 山东鑫禾金融保理有限公司版权所有
                </br>技术支持：山东摩羯信息科技有限公司 </div>
        </div>
    </div>
    <!-- <div class="footbox w1200">
        <Filing></Filing>
    </div> -->
</template>
<script>
import Filing from './footer-filing';
import urls from '@/config/url_enum.js';
const imgurl = require('@/assets/images/footer/img10.jpg');
export default {
    props: {
        pageNmae: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            imgUrl1: imgurl,
            imgUrl2: imgurl,
            imgUrl3: imgurl
        };
    },
    mounted() {
        // console.log(config);
    },
    methods: {
        onGoAfter(path, param) {
            // if (this.pageNmae === 'home') {
            //     this.goPath(home, param);
            // } else {}
            
                this.goHref(path, param);
            
        },
        goPath(path, param) {
            this.$router.push({
                path: path,
                treePath: param
            });
        },
        goHref(path, param) {
            window.top.location.href =
                location.origin + '/' + urls[path] + '?treePath=' + param;
        }
    },
    components: {
        Filing
    }
};
</script>

<style lang="less">
@import '../../assets/css/mixin.less';
.footerbg {
    height: 225px;
    background: #484e5d;
    .footnav {
        width: 268px;
        padding-top: 48px;
        img {
            width: 14px;
            vertical-align: middle;
            margin-right: 5px;
        }
        .iconfont {
            font-size: 15px;
            color: #fe8617;
            margin-right: 15px;
            float: left;
            &.blue {
                color: #468dd3;
            }
        }
    }
    .footnav ul li {
        font-size: 14px;
        color: #e5e5e5;
        float: left;
        margin-right: 23px;
        line-height: 30px;
        cursor: pointer;
    }
    .footline {
        width: 1px;
        height: 67px;
        background: #cdcdcd;
        margin-top: 48px;
    }
    .footnav ul li:after {
        content: '';
        clear: both;
    }
    .footernavbox {
        display: flex;
        flex-direction: row;
    }
    .focus {
        margin-left: 56px;
        display: flex;
        flex-direction: row;
        margin-right: 56px;
    }
    .focousus {
        font-size: 18px;
        color: #ffffff;
        margin-top: 63px;
    }
    .qqimg {
        margin-left: 25px;
        margin-top: 39px;
        img {
            width: 70px;
        }
    }
    .mobilephone {
        margin-top: 33px;
        margin-left: 56px;
        margin-right: 56px;
    }
    .android {
        margin-top: 14px;
    }
    .weekbox {
        margin-left: 56px;
        margin-top: 48px;
    }
    .week {
        font-size: 14px;
        color: #e5e5e5;
    }
    .tel {
        font-size: 36px;
        color: #fe8617;
    }
    .copyright {
        font-size: 14px;
        color: #e5e5e5;
        text-align: center;
        margin-top: 39px;
    }
}
</style>


