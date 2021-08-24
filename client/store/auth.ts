// import axios from 'axios'
// import history from '../history'

// const TOKEN = 'token'

// /**
//  * ACTION TYPES
//  */
// const SET_AUTH = 'SET_AUTH'

// /**
//  * ACTION CREATORS
//  */

// interface UserInfo {
//   username: string;
//   password: string;
// }

// interface AuthAction {
//   type: string;
//   auth: UserInfo;
// }

// const setAuth = (auth: UserInfo) => ({type: SET_AUTH, auth})

// /**
//  * THUNK CREATORS
//  */
// export const me = () => async (dispatch: any): Promise<any> => {
//   const token = window.localStorage.getItem(TOKEN)
//   if (token) {
//     const res = await axios.get('/auth/me', {
//       headers: {
//         authorization: token
//       }
//     })
//     return dispatch(setAuth(res.data))
//   }
// }

// export const authenticate = (userInfo: UserInfo, method: string): Promise<any> => {
//   return async (dispatch: any) => {
//     try {
//       const res = await axios.post(`/auth/${method}`, userInfo)
//       window.localStorage.setItem(TOKEN, res.data.token)
//       dispatch(me())
//     } catch (authError) {
//       return dispatch(setAuth({error: authError}));
//     }
//   }
// }

// export const logout = () => {
//   window.localStorage.removeItem(TOKEN)
//   history.push('/login')
//   return {
//     type: SET_AUTH,
//     auth: {}
//   }
// }

// /**
//  * REDUCER
//  */
// export default function(state = {}, action: AuthAction) {
//   switch (action.type) {
//     case SET_AUTH:
//       return action.auth
//     default:
//       return state
//   }
// }
