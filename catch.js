if (!window.mycache) {
  window.mycache = (function () {
    // 解决
    var cache = {}
    var cacheArr = []
    // return一些方法，去拿到or编辑缓存区域的数据
    return {
      get: function (api) {
        // 如果有缓存，我们是个同步请求，但是如果没有请求，是个异步操作，那怎样解决这种情况呢？如果是异步，我们在接受时
        // 如果这样写：
        // res = window.mycache.get('api')
        // console.log(res) // 异步情况下，res是获取不到值得，会报错，我们将下面代码写在pormise中可解决
        // if(cache[api]){
        //     // 同步操作
        //     return cache[api]
        // }else{
        //     // 异步操作
        //     this.set(api).then(res=>{
        //         cache[api] = res
        //         return res
        //     })
        // }
        return new Promise((resolve, reject) => {
          if (cache[api]) {
            // 同步操作
            resolve(cache[api])
          } else {
            // 异步操作
            this.set(api).then(res => {
              // 解决缓存超出内存的问题 start
              if (cacheArr.length > 10) {
                var _api = cacheArr.shift()
                this.remove(_api)
              }
              // 解决缓存超出内存的问题 end
              cache[api] = res
              cacheArr.push(api)
              resolve(res)
            })
          }
        })
        //写成Promise后，我们接受返回结果时，只需要像下面这样去接受数据
        // window.mycache.get('api').then(res)=>{
        // ...
        // }
      },
      set: function (api) {

      },
      remove: function () {

      }
    }
  })()
}
