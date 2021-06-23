<template>
  <v-container>
  <v-row>
    <v-col cols=12 lg=12 md=12 sm=12 align="center">
      <h1 class="mt-5">決済が完了しました！</h1>
      <h3 class="mt-5">この度はご注文ありがとうございます。</h3>
      <h3>お支払い先は、お送りしたメールに記載してありますのでご確認ください。</h3>
      <h3>メールが届かない場合は「注文履歴」からご確認ください。</h3>
      <v-btn dark rounded class="orange mt-5" :to="{name:'Home'}">トップ画面を表示する</v-btn>
    </v-col>
  </v-row>
</v-container>
</template>
