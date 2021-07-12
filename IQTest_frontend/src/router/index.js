import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../pages/user/Login";
import UserList from "../pages/user/UserList";
import QuestionList from "../pages/question/QuestionList";
import QuestionCreate from "../pages/question/QuestionCreate";
import QuestionUpdate from "../pages/question/QuestionUpdate";
import QuestionGroupEdit from "../pages/question/QuestionGroupEdit";
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
        path: "/questionList",
        name: "question-list",
        component: QuestionList,
        meta: {
            auth: true
        }
    },
    {
        path: "/questionCreate",
        name: "question-create",
        component: QuestionCreate,
    },
    {
        path: "/questionUpdate",
        name: "question-update",
        component: QuestionUpdate,
    },
    {
        path: "/questionGroupEdit",
        name: "question-group-edit",
        component: QuestionGroupEdit,
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
