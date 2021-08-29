const layout = (size) => {
  const domHtml = document.querySelector('html');
  const domBody = document.querySelector('body');
  const domApp = document.querySelector('#app');
  domHtml.style.height = size;
  domBody.style.height = size;
  domApp.style.height = size;
  setTimeout(() => {
    // document.body.clientHeight滚动屏幕高度，domHtml.clientHeight视口高度（不滚动）
    // if (document.body.clientHeight < domHtml.clientHeight) {
    if (domApp.offsetHeight < domHtml.clientHeight) {
      domHtml.style.height = '100%';
      domBody.style.height = '100%';
      domApp.style.height = '100%';
    }
  }, 0)
};
export default {
  layout,
}