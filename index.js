const app = new Proxy({}, {
  set(obj, key, value){
    obj[key] = value

    
    document.querySelectorAll("*").forEach(el => {
      if(el._template){
        let html = el._template
        for(let k in obj){
          html = html.replaceAll(`{${k}}`, obj[k])
        }
        el.innerHTML = html
      }
    })

    return true
  }
})


window.onload = () => {
  document.querySelectorAll("*").forEach(el => {
    if(el.innerHTML.includes("{")){
      el._template = el.innerHTML
    }
  })
}
