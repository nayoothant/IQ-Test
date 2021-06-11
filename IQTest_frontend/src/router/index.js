import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../pages/user/Login";
import UserList from "../pages/user/UserList";
// import store from "../store";

Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/users",
        name: "user-list",
        component: UserList,
    }
];

const router = new VueRouter({
    mode: "history",
    routes,
});

/**
 * This is to handle and check authentication for routing.
 */
// router.beforeEach((to, from, next) => {
//     const loggedIn = store.getters.isLoggedIn;
//     if (!loggedIn && to.name != "login") {
//         return next("/login");
//     }
//     next();
// });

export default router;
