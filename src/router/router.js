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
      name: 'Home',
      component: Risks
    },
    {
      path: '/risks', // all risks and details
      name: 'Risks',
      component: Risks
    },
    {
      path: '/risks/new/:type', // create a new risk of given type
      name: 'RiskNew',
      component: RiskDetails
    },
    {
      path: '/risks/edit/:uuid?', // update a risk with uuid
      name: 'RiskDetails',
      component: RiskDetails
    },
    {
      path: '/risks/types', // all risk types with fields
      name: 'RiskTypes',
      component: RiskTypes
    },
    {
      path: '/risks/types/new', // create a new risk type
      name: 'RiskTypeNew',
      component: RiskTypeDetails
    },
    {
      path: '/risks/types/edit/:name?', // update a given risk type
      name: 'RiskTypeDetails',
      component: RiskTypeDetails
    }
  ]
})
