import { LIVES_COUNT } from "./consts"

export default (() => {
  return {
    lives: LIVES_COUNT,
    collected: 0,
    total: 0,
    disableLives: true
  }
})()
