let createXHR = function () { // 实例化XMLHttpRequest 对象
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest()
	} else {
	}
}
let params = function (data) { // 序列化请求参数（只为get请求服务）
	let arr = []
	for (let i in data) {
		arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]))
	}
	return arr.join('&')
}
let ajax = function (obj) {
	return new Promise(function (resolve, reject) { // 返回promise 对象实例 并接受resolve 和reject 两个参数
		let xhr = createXHR()
		obj.url = obj.url //  + '?rand=' + Math.random()
		obj.data = params(obj.data)
		if (obj.method === 'get') {
      obj.url += obj.url.indexOf('?') === -1 ? '?' + obj.data : '&' + obj.data
	  }
	  if (obj.async === true) {
			// xhr.withCredentials = true
	  	xhr.onreadystatechange = function () {
	  		if (xhr.readyState === 4) {
	  			resolve(JSON.parse(xhr.responseText)) // 成功分支
	  		}
	  	}
	  }
	  xhr.open(obj.method, obj.url, obj.async)
	  if (obj.method === 'post') {
	      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
	      xhr.send(obj.data)
	  } else {
	      xhr.send(null)
	  }
	  if (obj.async === false) {
	      resolve(JSON.parse(xhr.responseText))
	  }
	})
}

export default ajax
