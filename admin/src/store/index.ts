import { createStore } from 'vuex';
import actions from './action';
import mutations from './mutation';
import state from './state';

import createPersistedState from 'vuex-persistedstate';
const options = {
    actions,
    mutations,
    state,
}
const store = createStore({
    ...options,
    plugins:[
        createPersistedState()
    ]
})
export default store;
