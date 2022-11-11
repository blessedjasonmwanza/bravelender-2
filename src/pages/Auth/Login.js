import React from 'react'
import state from '../../state/state'

setInterval(() => {
 state.value = state.value + 1;
}, 100)
export default function Login() {
  return (
    <div>Login</div>
  )
}
