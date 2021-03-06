function sidebarScrollIntoView() {
  let el = document.querySelector('.book-summary .active')
  if (el) {
    el.scrollIntoView({behavior: 'smooth', block: 'center'})
  }
}

require(["gitbook", "jQuery"], function (gitbook, $) {
  gitbook.events.bind('start', function (e, config) {
    setTimeout(() => {
      gitbook.toolbar.removeButtons(['btn-1', 'btn-2', 'btn-3'])
      let host = 'https://cloud.minapp.com'

      gitbook.toolbar.createButton({
        className: 'ifrx-btn',
        text: '进入控制台',
        label: 'ifrx-btn-console',
        position: 'right',
        onClick: function () {
          window.open(host + '/dashboard/')
        }
      })

      gitbook.toolbar.createButton({
        className: 'ifrx-btn ifrx-btn-landing',
        text: '知晓云',
        label: 'ifrx-btn-landing',
        position: 'right',
        onClick: function () {
          window.open(host)
        }
      })

    }, 300)
  })

  gitbook.events.bind('page.change', function () {
    setTimeout(sidebarScrollIntoView, 300)
  })
})