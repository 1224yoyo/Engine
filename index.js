
const app = new Proxy({}, {
  set(obj, key, value){
    obj[key] = value

    
    if(!window._engineTemplatesReady){
      document.addEventListener("DOMContentLoaded", () => {
        updateTemplates()
        obj[key] = value 
      }, { once: true })
      return true
    }

    
    updateTemplates()
    return true
  }
})

function updateTemplates(){
  document.querySelectorAll("*").forEach(el => {
    if(el._template){
      let html = el._template
      for(let k in app){
        html = html.replaceAll(`{${k}}`, app[k])
      }
      el.innerHTML = html
    }
  })
}


window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("*").forEach(el => {
    if(el.innerHTML.includes("{")){
      el._template = el.innerHTML
    }
  })
  window._engineTemplatesReady = true
})
