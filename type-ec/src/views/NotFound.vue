<template>
  <v-row>
    <v-col cols=12 lg=12 md=12 sm=12 align="center">
      <h1 class="mt-5">Not Found</h1>
      <h3 class="mt-5">お探しのページが見つかりませんでした。</h3>
      <h3>URLをご確認の上、再度お試しいただくか、<br>上のナビゲーションより既存ページへアクセスしてください。</h3>
      <v-btn dark rounded class="orange mt-5" :to="{name:'Home'}">トップ画面に戻る</v-btn>
    </v-col>
  </v-row>
</template>