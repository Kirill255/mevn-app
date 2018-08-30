// Этот файл пока не подключён и не используется, он оставлен для примера организации кода в модуле

// import Vue from "vue";

// export default {
//   namespaced: true,
//   state: {
//     users: [],
//     loading: false
//   },
//   getters: {
//     users(state) {
//       return state.users;
//     },
//     usersCount(state) {
//       return state.users.length;
//     },
//     loading(state) {
//       return state.loading;
//     }
//   },
//   mutations: {
//     getUsers(state, payload) {
//       state.users = payload;
//     },
//     onloading(state) {
//       state.loading = !state.loading;
//     }
//   },
//   actions: {
//     getUsers(store, payload) {
//       store.commit("onloading");
//       let url = "http://localhost:3000/users";
//       Vue.http.get(url).then(
//         response => {
//           store.commit("getUsers", response.body);
//           store.commit("onloading");
//         },
//         error => {
//           // error callback
//           console.log("error :", error);
//         }
//       );
//     }
//   }
// };
