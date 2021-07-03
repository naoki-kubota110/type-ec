<template>
  <v-app>
    <v-container text-xs-center>
      <p class="font-weight-bold text-center mt-5">
        <big>お届け先情報</big>
      </p>
      <div v-if="userInfo" class="text-center" id="fetchUserInfo">
        <v-checkbox label="前回の入力情報を呼び出す" color="#3d3935" @change="changeCheck"></v-checkbox>
      </div>
      <v-layout row wrap justify-center>
        <v-flex xs6 mt-6>
          <v-form ref="form" v-model="valid" lazy-validation>
            <div>
              お名前<v-text-field v-model="name" :rules="[rules.required]"></v-text-field>
            </div>
            <div>
              メールアドレス<v-text-field v-model="email" :rules="[rules.required, rules.email]"></v-text-field>
            </div>
            <div>
              郵便番号
              <v-text-field v-model="zipcode" :rules="[rules.required,rules.zipcode]"></v-text-field>

            </div>
            <div>
              住所<v-text-field v-model="address" :rules="[rules.required]"></v-text-field>
            </div>
            <div>
              電話番号<v-text-field v-model="tel" :rules="[rules.required, rules.tel]"></v-text-field>
            </div>
          
            <div class="mt-5">
              <p>配達日時を選択</p>
              <input type="date" v-model="date">
              <p class="red--text">{{dateMsg}}</p>
            </div>
            <div v-if="!dateMsg">
               <small>時間</small>
              <v-select :items="times" v-model="time" :rules="[rules.required]"></v-select>
            </div>
            <div>
            <v-radio-group row v-model="pay">
              <v-radio label="代金引換" :value=1 color="#3d3935"></v-radio>
               <v-radio label="クレジットカード" :value=2 color="#3d3935"></v-radio>
            </v-radio-group>
            </div>
            <div v-if="pay === 2">
               <v-text-field label="クレジットカード番号" v-model="credit" :rules="[rules.required,rules.credit]"></v-text-field>
            </div>
            <v-row justify="center">
              <v-col cols="4">
                <v-btn rounded class="#3d3935" dark @click="orderBtn">注文する</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import draggable from "vuedraggable";
@Component({
  components: {
    draggable
  },
})
export default class Order extends Vue{
  lists = [
    {name: "apple"},
    {name: "banana"},
    {name: "grape"}
  ]
  private name = ""
    private email = ""
    private zipcode = ""
    private address = ""
    private tel = ""
    private pay = 1
    private date = ""
    private credit = ""
    private valid = true
    private time =null
    private success = true
    private today = new Date()
    private year = this.today.getFullYear()
    private month = this.today.getMonth() + 1
    private day = this.today.getDate()
    get dateMsg(){
      let errorMsg = "" 
      let checkMonth:string = String(this.month)
      if(this.month < 10){
        checkMonth = "0" + String(this.month)
      }else{
        checkMonth = String(this.month)
      }
      const orderDate = Number(String(this.year) + String(checkMonth) + String(this.day))
      const specifyYear = this.date.slice(0,4)
      const specifyMonth = this.date.slice(5,7)
      const specifyDate = this.date.slice(8,10)
      const specify = Number(specifyYear + specifyMonth + specifyDate)
      if(this.date === ""){
        errorMsg = ""
      }else if(orderDate - specify >= 0){
        errorMsg="明日以降の日付を選択"
      }
      return errorMsg
    }
    times = [
      {text:'10時',value:10},
      {text:'11時',value:11},
      {text:'12時',value:12},
      {text:'13時',value:13},
      {text:'14時',value:14},
      {text:'15時',value:15},
      {text:'16時',value:16},
      {text:'17時',value:17},
      {text:'18時',value:18},
    ]
  rules=  {
    required: value => !!value || "※入力必須です",
    email: value => {
      const patternEmail = /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
      return patternEmail.test(value) || '※メールアドレスの形式が不正です'
    },
    zipcode: value => {
      const patternZipcode = /^\d{3}-\d{4}$/
      return patternZipcode.test(value) || '※郵便番号はXXX-XXXXの形式で入力してください'
    },
    tel: value => {
      const patternTel = /^\d{2,5}-\d{1,4}-\d{4}$/
      return patternTel.test(value) || "電話番号はXXX-XXXX-XXXXの形式で入力してください"
    },
    credit: value => {
      const patternCredit = /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/
      return patternCredit.test(value) || "※クレジッドカード番号はXXXX-XXXX-XXXX-XXXXの形式で入力してください"
    },
    date: value => {
     const patternCredit = /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/
      return patternCredit.test(value) || "※クレジッドカード番号はXXXX-XXXX-XXXX-XXXXの形式で入力してください"
    }
  }
  get userInfo(){
    return this.$store.state.userInfo
  }
  private checkbox = false
  changeCheck(){
    this.checkbox = !this.checkbox
    if(this.checkbox===true){
      this.name = this.userInfo.name
      this.email = this.userInfo.email
      this.zipcode = this.userInfo.zipcode
      this.address = this.userInfo.address
      this.tel = this.userInfo.tel
      this.credit = this.userInfo.credit
    }else{
      this.name = ""
      this.email = ""
      this.zipcode = ""
      this.address = ""
      this.tel = ""
      this.credit = ""
    }
  }
  orderBtn(){
    if(this.$refs.form.validate() && this.dateMsg===""){
      const orderDay = new Date()
      const orderYear = orderDay.getFullYear()
      const orderMonth = orderDay.getMonth() + 1
      const orderDate = orderDay.getDate()
      const orderHour = orderDay.getHours()
      const orderMinits = orderDay.getMinutes()
      const orderTime =String(orderYear) + "-" + String(orderMonth) + "-" + String(orderDate) + "-" + String(orderHour) + ":" + String(orderMinits) + "分" 
      let status;
      if(this.pay === 1){
        status = 1
      }else{
        status = 2
      }
      const userInfoData= {
        name: this.name,
        email: this.email,
        zipcode: this.zipcode,
        address: this.address,
        tel : this.tel,
        credit: this.credit
      }
      let specifyDate = this.date + "-" + String(this.time) + ":" + "00"
      const orderData = {
        orderId: this.$store.getters.orderId,
        id: this.$store.state.cart.id,
        itemInfo: this.$store.getters.cart,
        orderTime: orderTime,
        status : status,
        name: this.name,
        email: this.email,
        zipcode: this.zipcode,
        address: this.address,
        tel : this.tel,
        credit: this.credit,
        time: specifyDate,
        paymentMethod: this.pay
      }
      if(this.$store.getters.userInfo){
        this.$store.dispatch("updateUserInfo", userInfoData)
      }else{
        this.$store.dispatch("addUserInfo", userInfoData)
      }
      this.$store.dispatch("order", orderData)
      this.success = true
      this.$router.push("/ordercomplete")
    }else{
      this.success = false;
      this.$router.push("/cartitem")
    }
  }
}
</script>
<style scoped>
#fetchUserInfo{
 text-align: center !important;
}

</style>