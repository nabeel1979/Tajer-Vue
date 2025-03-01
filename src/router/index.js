import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import SignUp from "@/views/SignUpView.vue";
import ResetPassword from "@/views/ResetPassword.vue";
import HomeView from "@/views/HomeView.vue";
import CertificateOfOrigin from "@/views/CertificateOfOrigin.vue";
import TransactionsView from "@/views/TransactionsView.vue";
import OrderInvoice from "@/components/CertificateOrigin/OrderInvoice.vue";
import ShowOrder from "@/components/CertificateOrigin/ShowOrder.vue";
import ChamberTemplate from "@/views/ChamberTemplate.vue";
import CertificateTemplate from "@/views/CertificateTemplate.vue";
import ViewBook from "@/views/ViewBook.vue";
import ViewCertificateA from "@/views/ViewCertificateA.vue";
import ViewCertificateE from "../views/ViewCertificateE.vue";
import NotFound from "../views/404Page.vue";
import EditPassword from "../views/EditPassword.vue";
import ReDirectPage from "../views/ReDirectPage.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { hideNavBar: true, title: "غرفة تجارة بغداد || تسجيل الدخول" },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
    meta: { hideNavBar: true, title: "غرفة تجارة بغداد || انشاء حساب" },
  },
  {
    path: "/resetpassword",
    name: "resetPassword",
    component: ResetPassword,
    meta: {
      hideNavBar: true,
      title: "غرفة تجارة بغداد || اعادة تعيين كلمة المرور",
    },
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { title: "غرفة تجارة بغداد || الصفحة الرئيسية" },
  },
  {
    path: "/origincertificate",
    name: "originCertificate",
    component: CertificateOfOrigin,
    meta: { title: "غرفة تجارة بغداد || طلب شهادة منشأ" },
  },
  {
    path: "/transactions",
    name: "transactions",
    component: TransactionsView,
    meta: { title: "غرفة تجارة بغداد || المعاملات" },
  },
  {
    path: "/orderinvoice/:orderNumber",
    name: "OrderInvoice",
    component: OrderInvoice,
    props: true,
    meta: { hideNavBar: true, title: "غرفة تجارة بغداد" },
  },
  {
    path: "/showorder/:id",
    name: "ShowOrder",
    component: ShowOrder,
    meta: { title: "غرفة تجارة بغداد" },
  },
  {
    path: "/choicetype/:qrarchive",
    name: "ChoiceTemplate",
    component: ChamberTemplate,
    meta: { hideNavBar: true, title: "غرفة تجارة بغداد" },
  },
  {
    path: "/choicetypes/:idNumber",
    name: "CertificateTemplates",
    component: CertificateTemplate,
    meta: { hideNavBar: true, title: "غرفة تجارة بغداد" },
  },
  {
    path: "/viewbook/:bookid",
    name: "ViewBook",
    component: ViewBook,
    meta: { hideNavBar: true, title: "غرفة تجارة بغداد || الكتب" },
  },
  {
    path: "/viewcertificate/:certificateid",
    name: "ViewCertificate",
    component: ViewCertificateA,
    meta: {
      hideNavBar: true,
      title: "غرفة تجارة بغداد || شهادة المنشأ",
    },
  },
  {
    path: "/viewcertificateE/:certificateid",
    name: "ViewCertificateEnglish",
    component: ViewCertificateE,
    meta: {
      hideNavBar: true,
      title: "غرفة تجارة بغداد || Certificate of Origin",
    },
  },
  {
    path: "/edit-password",
    name: "EditPassword",
    component: EditPassword,
    meta: {
      title: "غرفة تجارة بغداد || تعديل كلمة المرور",
    },
  },
  {
    path: "/redirect",
    name: "Redirect",
    meta: {
      hideNavBar: true,
      title: "غرفة تجارة بغداد || أعادة توجيه",
    },
    children: [
      {
        path: "books/:qrCode",
        name: "Books",
        component: ReDirectPage,
      },
      {
        path: "certificates/:id",
        name: "Certificates",
        component: ReDirectPage,
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
    meta: { hideNavBar: true, title: "404 NotFound" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("Token");
  const publicRoutes = [
    "login",
    "signup",
    "resetPassword",
    "OrderInvoice",
    "PdfTemplate",
    "ChoiceTemplate",
    "CertificateTemplates",
    "ShowCertificate",
    "ViewCertificate",
    "ViewBook",
    "ViewCertificateEnglish",
    "Redirect",
    "Books",
    "Certificates",
  ];

  const defaultTitle = "غرفة تجارة بغداد";
  document.title = to.meta.title || defaultTitle;

  if (!token && !publicRoutes.includes(to.name)) {
    next("/login");
  } else {
    next();
  }
});

export default router;
