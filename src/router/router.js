import Vue from 'vue'
import Router from 'vue-router'
import Risks from '@/components/Risks'
import RiskDetails from '@/components/RiskDetails'
import RiskTypes from '@/components/RiskTypes'
import RiskTypeDetails from '@/components/RiskTypeDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Risks',
      component: Risks
    },
    {
      path: '/risks', // this should show risk name and type at top of card and details when expanded
      name: 'Risks',
      component: Risks
    },
    {
      path: '/risks/new/:type', // this should show risk name and type at top of card and details when expanded
      name: 'RiskDetails',
      component: RiskDetails
    },
    {
      path: '/risks/edit/:uuid?', // this should show a single card with details and a form to edit
      name: 'RiskDetails',
      component: RiskDetails
    },
    {
      path: '/risks/types', // this should show a single card with details and a form to edit
      name: 'RiskTypes',
      component: RiskTypes
    },
    {
      path: '/risks/types/new', // this should show a single card with details and a form to edit
      name: 'RiskTypeDetails',
      component: RiskTypeDetails
    },
    {
      path: '/risks/types/edit/:name?', // this should show a single card with details and a form to edit
      name: 'RiskTypeDetails',
      component: RiskTypeDetails
    }
  ]
})
