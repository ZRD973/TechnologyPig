class Login {
  constructor() {
    // 做初始化
    this.init()
  }

  init () {
    let mask = document.createElement('div')
    //
    mask.classList.add('mask-layer')
    mask.innerHTML = `
    <div class="login-wrapper">
    <div class="login-title">
      <div class="title-text">登录框</div>
      <div class="close-btn">×</div>
    </div>
    <div class="username-input user-input">
      <span class="login-text">用户名:</span>
      <input type="text">
    </div>
    <div class="pwd-input user-input">
      <span class="login-text">密码:</span>
      <input type="password">
    </div>
    <div class="btn-wrapper">
      <button class="confrim-btn">确定</button>
      <button class="clear-btn">清空</button>
    </div>
    </div>
    `
    document.body.insertBefore(mask, document.body.childNodes[0])
    // 添加关闭登录框的事件
    Login.addClose()
  }

  static getLoginDom (cls) {
    return document.querySelector(cls)
  }

  static addClose () {
    this.getLoginDom(".close-btn").addEventListener('click', () => {
      // 给遮罩层添加style 用于隐藏遮罩
      this.getLoginDom(".mask-layer").style = 'display:none'
    })
  }

  // 
  static getInstance () {
    if (!this.instance) {
      this.instance = new Login()
    } else {
      // 移除遮罩
      this.getLoginDom(".mask-layer").removeAttribute('style')
    }
    return this.instance
  }

}


Login.getLoginDom(".login-btn").addEventListener('click', () => {
  Login.getInstance()
})





