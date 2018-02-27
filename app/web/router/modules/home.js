export default [{
  name: 'Home',
  path: '/Home',
  component: () => import('@/page/home/Index')
}, {
  name: 'Login',
  path: '/',
  component: () => import('@/page/home/Login')
}];
