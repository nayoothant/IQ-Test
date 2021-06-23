import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../pages/user/Login";
import UserList from "../pages/user/UserList";
import UserCreate from "../pages/user/UserCreate";
import QuestionList from "../pages/question/QuestionList";
import AnswerPage from "../pages/answer/AnswerPage";
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
    },
    {
        path: "/createuser",
        name: "create_user",
        component: UserCreate,
    },
    {
        path: "/questionList",
        name: "question-list",
        component: QuestionList,
    },
    {
        path: "/answerpage",
        name: "answer-page",
        component: AnswerPage,
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
