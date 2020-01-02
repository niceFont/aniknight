import { mount, shallowMount, createLocalVue } from "@vue/test-utils"
import ListForm from "../../src/components/MyList/ListForm.vue"
import Vue from "vue"
import Vuetify from "vuetify"

describe("ListForm.vue", () => {

    // let vuetify
    let wrapper

    beforeEach(() => {
        //const localVue = createLocalVue()
        Vue.use(Vuetify)
        wrapper = shallowMount(ListForm)
    })

    it("renders", () => {
        expect(shallowMount(ListForm).isVueInstance()).toBe(true)

    })

    it("has a div", () => {
        expect(wrapper.contains("div")).toBe(true)
    })
})