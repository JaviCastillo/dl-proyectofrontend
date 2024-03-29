import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import firebase from 'firebase'
import { firebaseConfig } from '../../src/config/firebaseConfig'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faStar, faFilm, faSearch, faChevronUp, faChevronDown, faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Main from '@/views/Main.vue'
import Destacados from '@/views/Destacados.vue'
import routes from './mocks/router'
import store from './mocks/store'

library.add(faUser, faStar, faFilm, faSearch, faChevronUp, faChevronDown, faPlay)

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('font-awesome-icon', FontAwesomeIcon)
const router = new VueRouter(routes)

firebase.initializeApp(firebaseConfig);

describe('Testing Destacados', () => {


    it('Carga Main', () => {
        const wrapper = shallowMount(Main,{
          localVue,
          router,
          store,
          firebase,
        })
        wrapper.vm.$store.dispatch('putDestacados')
    })

    it('Destacados muestra peliculas', () => {
        const wrapper = shallowMount(Destacados,{
            localVue,
            router,
            store,
            firebase,
        })
        expect(wrapper.html()).toContain('Pelicula Uno', 'Pelicula Dos', 'Pelicula Tres')
    })
  
})