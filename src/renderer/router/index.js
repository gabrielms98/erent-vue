import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: require('@/components/Home.vue').default,
      props: true
    },
    {
      path: '/Pesquisar',
      name: 'Pesquisar',
      component: require('@/components/Pesquisar.vue').default,
    },
    {
      path: '/Pesquisa:filtro',
      name: 'PesquisaFiltro',
      component: require('@/components/Pesquisar.vue').default,
      props: true
    },
    {
      path: '/Imovel:id',
      name: 'Imovel',
      component: require('@/components/Imovel.vue').default,
      props: true
    },
    {
      path: '/ListaRequisicao',
      name: 'ListaRequisicao',
      component: require('@/components/ListaRequisicao.vue').default
    },
    {
      path: '/Contratos',
      name: 'Contratos',
      component: require('@/components/Contratos.vue').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
