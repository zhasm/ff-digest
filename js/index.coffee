$ = jQuery

render_img = (item) ->

  img = item.img

  tpl_img = """
  <span class="photo">
  <a href="#{ img.page }" name="/photo/j8gBtn5zH3I" class="photo zoom" target="_blank">
      <img src="#{ img.preview}">
  </a>
  </span>
  """

  unless item.img.page?.length
    ''
  else
    tpl_img

render_item = (item) ->
  item.msghtml = render_img item

  """
    <tr>
      <td class="item">
        <div class="outer">
          <div class="avatar">
            <a href="http://fanfou.com/#{ item.loginname }" title="#{ item.realname }">
              <img class="avatar" src="#{ item.avatar }">
            </a>
          </div>
          <div class="text-outer">
            <span class="text">
              <a href="http://fanfou.com/#{ item.loginname }">#{ item.realname }</a>
                      #{ item.msg }
                  </span>
                  #{ item.msghtml }
                  <span class="signature">
                      <a href="http://fanfou.com/statuses/#{ item.statusid }" class="date">#{ item.time }</a>
                      <span class="fav">收藏 #{ item.count } 次</span>
                  </span>
          </div>
        </div>
      </td>
    </tr>
  """

render_page = (data) ->
  title = "饭否#{ data.shift_cn }精选 #{ data.date }"
  $('title, h2.content-head').html title

  tophr = '''<tr>
    <td id="top-hr"></td>
  </tr>'''

  items = (render_item(item) for item in data.msgs)

  $('.content tbody').prepend items
  $('.content tbody').prepend tophr

get_page = (url) ->
  $.get url, (data) ->
    unless typeof(data) is 'object'
      data = JSON.parse data
    render_page data

click = ->

  tophr = '''<tr>
    <td id="top-hr"></td>
  </tr>'''

  shifts =
    daily: '每日'
    weekly: '每周'
    hourly: '实时'

  $('#history').click ->
    index = './json/index.json'

    $.get index, (data)->
      if typeof(data) is 'string'
        data = JSON.parse data
      unless typeof(data) is 'object' and typeof(data[0]) is 'string' and data[0].length
        "error here"
        return

      title = "往期精彩回顾"
      $('.content h2').html title
      $('.content table tbody').html ''
      ret = []
      for url in data
        pattern = ///(\d{4}-\d{2}-\d{2})\.(daily|weekly)///
        match = url.match pattern
        unless match
          return
        [date, shift] = match[1..2]

        tpl = """
        <tr>
          <td>
          <a class="ajax-nav" href="#{url}">
          #{date} #{shifts[shift]}精选
          </a>
          </td>
        </tr>
          """
        ret.push tpl

      $('.content table tbody').html ret
      $('.ajax-nav').click (e)->
        e.preventDefault()
        target = $(@)
        url = target.attr 'href'
        window.location.hash = url.replace('./json/', '#').replace('.json', '')
        get_page url
  $('#history').bind('touchstart click', ->
    $('#history').click()
  )

routing = () ->
  hash = window.location.hash

  unless hash?.length
    index = './json/index.json'

    $.get index, (data)->
      if typeof(data) is 'string'
        data = JSON.parse data
      if typeof(data) is 'object' and typeof(data[0]) is 'string' and data[0].length
        get_page data[0]

  url_pattern = ///\d{4}-\d{2}-\d{2}\.(?:daily|weekly)///
  if hash.match url_pattern
    fn = hash.match(url_pattern)[0]
    url = "./json/#{fn}.json"
    get_page url

initFastClick = () ->
  FastClick.attach document.body

$ () ->
  initFastClick()
  routing()
  click()
