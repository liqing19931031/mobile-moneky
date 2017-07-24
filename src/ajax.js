let createXHR = function () {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest()
	} else {
	}
}
let params = function (data) {
	let arr = []
	for (let i in data) {
		arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]))
	}
	return arr.join('&')
}
let ajax = function (obj) {
	return new Promise(function (resolve, reject) {
		let xhr = createXHR()
		obj.url = obj.url //  + '?rand=' + Math.random()
		obj.data = params(obj.data)
		if (obj.method === 'get') {
	        obj.url += obj.url.indexOf('?') === -1 ? '?' + obj.data : '&' + obj.data
	  }
	  if (obj.async === true) {
	  	xhr.onreadystatechange = function () {
	  		if (xhr.readyState === 4) {
	  			resolve(JSON.parse(xhr.responseText))
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
