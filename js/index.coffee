$ = jQuery
_.templateSettings =   interpolate: /\{\{(.+?)\}\}/g

tpl_img = """
<span class="photo">
<a href="{{ img.page }}" name="/photo/j8gBtn5zH3I" class="photo zoom" target="_blank">
    <img src="{{ img.preview}}">
</a>
</span>
"""

tpl_msg = """
  <tr>
    <td class="item">
      <div class="outer">
        <div class="avatar">
          <a href="http://fanfou.com/{{ loginname }}" title="{{ realname }}">
            <img class="avatar" src="{{ avatar }}">
          </a>
        </div>
        <div class="text-outer">
          <span class="text">
            <a href="http://fanfou.com/{{ loginname }}">{{ realname }}</a>
                    {{ msg }}
                </span>
                {{ msghtml }}
                <span class="signature">
                    <a href="http://fanfou.com/statuses/{{ statusid }}" class="date">{{ time }}</a>
                    <span class="fav">收藏 {{ count }} 次</span>
                </span>
        </div>
      </div>
    </td>
  </tr>
"""

render_img = (item) ->
  unless item.img.page?.length
    ''
  else
    _.template(tpl_img)(item)

render_item = (item) ->
  item.msghtml = render_img item
  _.template(tpl_msg)(item)

render_page = (data) ->
  title = _.template("饭否{{ shift_cn }}精选 {{date}}")(data)
  $('title, h2.content-head').html title

  tophr = '''<tr>
    <td id="top-hr"></td>
  </tr>'''

  items = (render_item(item) for item in data.msgs)

  $('.content tbody').prepend items
  $('.content tbody').prepend tophr

$ () ->
  f = './json/2015-10-05.daily.json'
  $.get f, (data)->
    render_page data
