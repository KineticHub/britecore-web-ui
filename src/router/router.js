import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import About from '@/components/About'
import Risks from '@/components/Risks'
import RiskDetails from '@/components/RiskDetails'
import RiskTypes from '@/components/RiskTypes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/risks', // this should show risk name and type at top of card and details when expanded
      name: 'Risks',
      component: Risks
    },
    {
      path: '/risks/types', // this should show a single card with details and a form to edit
      name: 'RiskTypes',
      component: RiskTypes
    },
    {
      path: '/risks/:uuid', // this should show a single card with details and a form to edit
      name: 'RiskDetails',
      component: RiskDetails
    }
  ]
})
