const getters = {
  device: state => state.app.device,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.username,
  welcome: state => state.user.welcome,
  roles: state => state.user.roles,
  userInfo: state => state.user,
  addRouters: state => state.permission.addRouters,
  multiTab: state => state.app.multiTab,
  lang: state => state.i18n.lang,
  userid: state => state.user.userid,
}

export default getters