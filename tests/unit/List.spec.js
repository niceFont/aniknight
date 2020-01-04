import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueRouter from "vue-router"
import Vue from 'vue'
import { mount, createLocalVue } from "@vue/test-utils"
import List from "../../src/components/MyList/List.vue"

describe("List", () => {
    Vue.use(VueRouter)
    let localVue = createLocalVue()
    let actions
    let wrapper
    let store
    let router

    beforeEach(() => {
        localVue.use(Vuetify)
        localVue.use(Vuex)

        actions = {
            removeAnime: jest.fn()
        }

        store = new Vuex.Store({
            state: {
                myList: [
                    { id: 1, title: "test", url: "testUrl", src: "link" }
                ]
            },
            actions
        })

        router = new VueRouter()

        wrapper = mount(List, {
            store,
            localVue,
            stubs: ['router-link', 'router-view'],
            router,
            created() {
                this.$vuetify.lang = {
                    t: () => { }
                }
                this.$vuetify.theme = { dark: false }

            }
        })

    })


    it("should render", () => {
        expect(wrapper.isVueInstance()).toBe(true)
    })

    it("should match snapshot", () => {
        expect(wrapper.element).toMatchSnapshot()
    })

    it("should render data from store", () => {
        expect(wrapper.find("h3").text()).toBe("test")
    })

    it("should call action", () => {
        wrapper.find("button").trigger("click")
        expect(actions.removeAnime).toHaveBeenCalled()
    })

})