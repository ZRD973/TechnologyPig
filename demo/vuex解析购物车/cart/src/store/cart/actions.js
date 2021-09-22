import { ADD, REDUCE } from './mutations-type'
export default {
  increment ({
    commit
  }, payload) {
    commit(ADD, payload)
  },
  reduce ({
    commit
  }, payload) {
    commit(REDUCE, payload)
  }
}