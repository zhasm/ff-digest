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

routing = () ->
  hash = window.location.hash

  get_page = (url) ->
    $.get url, (data) ->
      render_page data

  #default routing: use the top one
  unless hash?.length
    index = './json/index.json'
    $.get index, (data)->
      get_page(data[0])

  url_pattern = ///\d{4}-\d{2}-\d{2}\.(?:daily|weekly)///
  if hash.match url_pattern
    fn = hash.match(url_pattern)[0]
    url = "./json/#{fn}.json"
    get_page url

$ () ->
  routing()
