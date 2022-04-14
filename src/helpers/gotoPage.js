export default function gotoPage(pageName, pageParams) {
  this.emitter.emit('gotoPage', [pageName, pageParams]);
}
