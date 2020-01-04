import { mount, shallowMount, createLocalVue } from "@vue/test-utils"
import ListForm from "../../src/components/MyList/ListForm.vue"
import Vue from "vue"
import VueRouter from "vue-router"
import Vuex from "vuex"
import Vuetify from "vuetify"

describe("ListForm.vue", () => {

    let wrapper
    let store
    let actions
    let router
    let localVue = createLocalVue()
    beforeEach(() => {
        localVue.use(Vuex)

        Vue.use(Vuetify)
        Vue.use(Vuex)
        router = new VueRouter()
        actions = {
            addAnime: jest.fn(),
            removeAnime: jest.fn()
        }
        store = new Vuex.Store({
            state: {
                myList: []
            },
            actions
        })
        wrapper = mount(ListForm, {
            created() {
                this.$vuetify.lang = {
                    t: () => { }
                }
                this.$vuetify.theme = { dark: false }
            },
            data: () => ({
                anime: { id: 0, title: "anime (2012)", url: "" },
                suggestion: [{
                    id: 1,
                    title: {
                        userPreferred: "anime"
                    },
                    coverImage: {
                        medium: ""
                    }
                }],
                selected: {
                    id: 1,
                    title: {
                        userPreferred: "anime"
                    },
                    coverImage: {
                        medium: ""
                    }
                }

            }),
            computed: {
                /*  selected() {
                     return {
                         id: 1,
                         title: {
                             userPreferred: "anime"
                         },
                         coverImage: {
                             medium: ""
                         }
                     }
                 } */
            },
            localVue,
            store,
            router
        })

    })

    it("renders", () => {
        expect(shallowMount(ListForm).isVueInstance()).toBe(true)
    })

    it("Matches snapshot", () => {
        expect(wrapper.element).toMatchSnapshot()
    })

    it("calls action on click", () => {
        wrapper.setMethods({
            checkForDuplicate() {
                return true
            },
            formatUrl() {
                return ""
            },
            clearAll() {
            }
            /* submitAnime() {
                wrapper.vm.$store.dispatch("addAnime")
            } */
        })
        wrapper.find("button").trigger("click")


        expect(actions.addAnime).toHaveBeenCalled()
    })

    it("should call submitAnime", () => {
        const submitAnime = jest.fn()
        wrapper.setMethods({ submitAnime })
        wrapper.find("button").trigger("click")

        expect(submitAnime.mock.calls.length).toBe(1)
    })


})