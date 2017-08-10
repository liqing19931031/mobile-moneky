<template lang="html">
  <div class="busregist">
    <div class="busregist--banner">

    </div>
    <div class="busregist--card">
      <div class="card--title">
        我要申请为美猴王{{this.params.beltsettled_type === 2 ? '供应商' : '第三方服务商'}}
      </div>
      <p>美猴王产业带{{this.params.beltsettled_type === 2 ? '供应商' : '第三方服务商'}}火热招募中！</p>
      <p>只需两步，百万商家邀您入驻:</p>
      <p>第一步:美猴王供应商入驻报名，按照要求提供报名相关信息；</p>
      <p>第二步:申请审核，5个工作日内工作人员会联系您商谈合作事宜；</p>
      <div class="form-card">
        <mu-text-field hintText="公司名称" v-model='params.beltsettled_company_name' :errorText='errText.beltsettled_company_name'  @blur='blur("beltsettled_company_name")' fullWidth/>
        <mu-text-field hintText="平台账号" v-model='params.beltsettled_account_number' :errorText='errText.beltsettled_account_number' @blur='blur("beltsettled_account_number")' fullWidth/>
        <mu-text-field hintText="联系人" v-model='params.beltsettled_linkman' :errorText='errText.beltsettled_linkman'  @blur='blur("beltsettled_linkman")' fullWidth/>
        <mu-text-field hintText="手机号" v-model='params.beltsettled_phone' :errorText='errText.beltsettled_phone' @blur='blur("beltsettled_phone", {fuc: textPhone, message: "电话号码格式不正确！"})' fullWidth/>
        <mu-text-field hintText="邮箱" v-model='params.beltsettled_mail' type='email' :errorText='errText.beltsettled_mail' @blur='blur("beltsettled_mail")' fullWidth/>
        <mu-text-field hintText="公司所在地" v-model='params.beltsettled_address' :errorText='errText.beltsettled_address' @blur='blur("beltsettled_address")' fullWidth/>
        <mu-text-field hintText="验证码" v-model='params.code' :errorText='errText.code' @blur='blur("code", {fuc: textCode, message: "验证码不正确！"})' class="ver-code"/>
        <div class="code-group pull-right">
          <div class="code-group--code">
            {{this.code}}
          </div>
          <div class="code-refresh pull-right" @click='getCode'>
            <i class='glyphicon-refresh glyphicon'></i>
          </div>
        </div>
        <div class="text-center">
          <div class="button" @click='subMit'>
            提交
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'

export default {
  data () {
    return {
      code: '',
      isgetCode: true,
      errText: {
        code: '',
        beltsettled_company_name: '',
        beltsettled_linkman: '',
        beltsettled_phone: '',
        beltsettled_mail: '',
        beltsettled_account_number: '',
        beltsettled_address: ''
      },
      params: {
        code: '',
        from: 'wap',
        beltsettled_type: this.$route.query.type || 2,
        beltsettled_company_name: '',
        beltsettled_linkman: '',
        beltsettled_phone: '',
        beltsettled_mail: '',
        beltsettled_account_number: '',
        beltsettled_address: ''
      }
    }
  },
  mounted () {
    this.getCode()
  },
  methods: {
    blur (key, fuc) {
      if (this.params[key] === '') {
        this.errText[key] = '必填信息不能为空！'
      } else {
        if (fuc) {
          if (!fuc.fuc(this.params[key])) {
            this.errText[key] = fuc.message
          } else {
            this.errText[key] = ''
          }
        } else {
          this.errText[key] = ''
        }
      }
    },
    textPhone (phone) {
      return /^1[34578]{1}\d{9}$/.test(phone)
    },
    textCode () {
      return this.code.toLowerCase() === this.params.code.toLowerCase()
    },
    getCode () {
      this.isgetCode && this.$ajax('get', '', {
        ctl: 'Login',
        met: 'getVerifyCode',
        typ: 'json',
        length: 4
      }).then((data) => {
        this.isgetCode = true
        this.code = data.data.code
      })
      this.isgetCode = false
    },
    subMit () {
      this.$ajax('get', '', {
        ctl: 'Beltsettled_Belt',
        met: 'disposeForm',
        typ: 'json',
        ...this.params
      }).then((data) => {
        if (data.status === 200) {
          this.$router.push({path: '/index'})
        } else {
          Message({
            message: data.msg,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
.busregist{
  .busregist--banner{
    height: 5.333333rem;
    background: url('/static/busbanner.png');
    background-size:  100% 100%;
  }
  .busregist--card{
    padding: 1rem .666667rem;
    box-sizing: border-box;
    background-color: white;
    border: solid 1px #dddddd;
    position: relative;
    top: -1rem;
    margin: 0 2rem;
    width: 21rem;
    .card--title{
      color: #5858de;
      font-size: .8rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }
    p{
      color: #333;
      font-size: .666667rem;
      line-height: 1.333333rem;
    }
  }
  .form-card{
    margin-top: 1.333333rem;
    padding: 1rem .666667rem;
    background-color: #fbfbfb;
    border: solid 1px #dddddd;
    .ver-code{
      width: 10rem;
    }
    .code-group{
      width: 8rem;
      height: 2.133333rem;
      margin-top: 1.333333rem;
      .code-group--code{
        text-align: center;
        width: 5rem;
        color: white;
        font-style: italic;
        line-height: 2.133333rem;
        background-color: #5858de;
        display: inline-block;
        height: 100%;
      }
      .code-refresh{
        text-align: center;
        font-size: 1.333333rem;
      }
    }
    .button{
      margin-top: 2rem;
      background-color: #5858de;
      height: 1.666667rem;
      width: 10rem;
      color: white;
      text-align: center;
      display: inline-block;
      font-size: 1rem;
      border-radius: .4rem;
    }
  }
}
</style>
