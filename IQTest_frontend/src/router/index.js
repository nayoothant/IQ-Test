import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../pages/user/Login";
import UserList from "../pages/user/UserList";
import UserCreate from "../pages/user/UserCreate";
import QuestionList from "../pages/question/QuestionList";
import AnswerPage from "../pages/answer/AnswerPage";
import QuestionCreate from "../pages/question/QuestionCreate";
import QuestionUpdate from "../pages/question/QuestionUpdate";
import QuestionGroupEdit from "../pages/question/QuestionGroupEdit";
import AnswerIndex from "../pages/answer/Index";
// import Sidebar from "../components/SideBar"
import store from "../store";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "/create-user",
        component: UserCreate,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/questionGroups",
        name: "question-groups",
    },
    {
        path: "/users",
        name: "user-list",
        component: UserList,
    },
    {
        path: "/createuser",
        name: "create-user",
        component: UserCreate,
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
    },
    {

        path: "/answerpage",
        name: "answer-page",
        component: AnswerPage,
    },
    {
        path: "/answerIndex",
        name: "answer-index",
        component: AnswerIndex,
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

/**
 * This is to handle and check authentication for routing.
 */
router.beforeEach((to, from, next) => {
    const loggedIn = store.getters.isLoggedIn;
    if (!loggedIn && (to.name != "create-user" && to.name != 'login' && to.name != 'answer-page' && to.name != 'answer-index')) {
        return next("/createuser");
    }
    next();
});

export default router;
