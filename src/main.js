import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import {getAuth} from "firebase/auth";


Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyA9gWx1fCQ7FrgZS_Wt-mGdHur8U4Tz8ac",
  authDomain: "profile-33.firebaseapp.com",
  projectId: "profile-33",
  storageBucket: "gs://profile-33.appspot.com",
  messagingSenderId: "949046131125",
  appId: "1:949046131125:web:c8cffa11b4d77e0a6201fc",
  measurementId: "G-Q20TP7STMJ",
  databaseURL: 'https://profile-33-default-rtdb.firebaseio.com/',
};
const app = initializeApp(firebaseConfig);
getDatabase(app)
getStorage(app)
const user = getAuth()

Vue.directive('click-away', {
  bind(el, binding) {
    el._handleClickOutside = function(event) {
      if (!el.contains(event.target)) {
        binding.value()
      }
    }
    document.addEventListener('click', el._handleClickOutside)
  },
  unbind(el) {
    document.removeEventListener('click', el._handleClickOutside)
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
