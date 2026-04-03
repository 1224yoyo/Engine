const _pending = {};
const app = new Proxy({}, {
  set(obj, key, value){
    obj[key] = value;
    if(!window._engineTemplatesReady){
      _pending[key] = value;
      return true;
    }
    updateTemplates();
    return true;
  }
});

function updateTemplates(){
  document.querySelectorAll("*").forEach(el => {
    if(el._template){
      let html = el._template;
      for(let k in app){
        html = html.replaceAll(`{${k}}`, app[k]);
      }
      el.innerHTML = html;
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("*").forEach(el => {
    if(el.innerHTML.includes("{")){
      el._template = el.innerHTML;
    }
  });
  window._engineTemplatesReady = true;
  for(let k in _pending){
    app[k] = _pending[k];
  }
});
