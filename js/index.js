(function() {
  var $, render_img, render_item, render_page, tpl_img, tpl_msg;

  $ = jQuery;

  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };

  tpl_img = "<span class=\"photo\">\n<a href=\"{{ img.page }}\" name=\"/photo/j8gBtn5zH3I\" class=\"photo zoom\" target=\"_blank\">\n    <img src=\"{{ img.preview}}\">\n</a>\n</span>";

  tpl_msg = "<tr>\n  <td class=\"item\">\n    <div class=\"outer\">\n      <div class=\"avatar\">\n        <a href=\"http://fanfou.com/{{ loginname }}\" title=\"{{ realname }}\">\n          <img class=\"avatar\" src=\"{{ avatar }}\">\n        </a>\n      </div>\n      <div class=\"text-outer\">\n        <span class=\"text\">\n          <a href=\"http://fanfou.com/{{ loginname }}\">{{ realname }}</a>\n                  {{ msg }}\n              </span>\n              {{ msghtml }}\n              <span class=\"signature\">\n                  <a href=\"http://fanfou.com/statuses/{{ statusid }}\" class=\"date\">{{ time }}</a>\n                  <span class=\"fav\">收藏 {{ count }} 次</span>\n              </span>\n      </div>\n    </div>\n  </td>\n</tr>";

  render_img = function(item) {
    var _ref;
    if (!((_ref = item.img.page) != null ? _ref.length : void 0)) {
      return '';
    } else {
      return _.template(tpl_img)(item);
    }
  };

  render_item = function(item) {
    item.msghtml = render_img(item);
    return _.template(tpl_msg)(item);
  };

  render_page = function(data) {
    var item, items, title, tophr;
    title = _.template("饭否{{ shift_cn }}精选 {{date}}")(data);
    $('title, h2.content-head').html(title);
    tophr = '<tr>\n  <td id="top-hr"></td>\n</tr>';
    items = (function() {
      var _i, _len, _ref, _results;
      _ref = data.msgs;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        _results.push(render_item(item));
      }
      return _results;
    })();
    $('.content tbody').prepend(items);
    return $('.content tbody').prepend(tophr);
  };

  $(function() {
    var f;
    f = './output/2015-10-05.daily.json';
    return $.get(f, function(data) {
      return render_page(data);
    });
  });

}).call(this);
