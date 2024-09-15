import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import SignUp from '@/views/SignUpView.vue';
import ResetPassword from '@/views/ResetPassword.vue';
import HomeView from '@/views/HomeView.vue';
import CertificateOfOrigin from '@/views/CertificateOfOrigin.vue';
import TransactionsView from '@/views/TransactionsView.vue';
import OrderInvoice from '@/components/CertificateOrigin/OrderInvoice.vue';
import ShowOrder from '@/components/CertificateOrigin/ShowOrder.vue';
import ChamberTemplate from '@/views/ChamberTemplate.vue';
import CertificateTemplate from '@/views/CertificateTemplate.vue';
import ViewBook from '@/views/ViewBook.vue';
import ViewCertificateA from '../views/ViewCertificateA.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { hideNavBar: true },
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
    meta: { hideNavBar: true },
  },
  {
    path: '/resetpassword',
    name: 'resetPassword',
    component: ResetPassword,
    meta: { hideNavBar: true },
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/origincertificate',
    name: 'originCertificate',
    component: CertificateOfOrigin,
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: TransactionsView,
  },
  {
    path: '/orderinvoice/:orderNumber',
    name: 'OrderInvoice',
    component: OrderInvoice,
    props: true,
    meta: { hideNavBar: true },
  },
  {
    path: '/showorder/:id',
    name: 'ShowOrder',
    component: ShowOrder,
  },
  {
    path: '/choicetype/:qrarchive',
    name: 'ChoiceTemplate',
    component: ChamberTemplate,
    meta: { hideNavBar: true },
  },
  {
    path: '/choicetypes/:idNumber',
    name: 'ChoiceTemplates',
    component: CertificateTemplate,
    meta: { hideNavBar: true },
  },
  {
    path: '/viewbook/:bookid',
    name: 'ViewBook',
    component: ViewBook,
    meta: { hideNavBar: true },
  },
  {
    path: '/viewcertificate/:certificateid',
    name: 'ViewCertificate',
    component: ViewCertificateA,
    meta: { hideNavBar: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Navigation Guard to check for authentication
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('Token');
  const publicRoutes = ['login', 'signup', 'resetPassword', 'OrderInvoice', 'PdfTemplate', 'ChoiceTemplate', 'ChoiceTemplates', 'ShowCertificate', 'ViewCertificate', 'ViewBook'];

  if (!token && !publicRoutes.includes(to.name)) {
    next('/login');
  } else {
    next();
  }
});

export default router;
