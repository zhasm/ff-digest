(function() {
  var $, render_img, render_item, render_page, routing;

  $ = jQuery;

  render_img = function(item) {
    var img, tpl_img, _ref;
    img = item.img;
    tpl_img = "<span class=\"photo\">\n<a href=\"" + img.page + "\" name=\"/photo/j8gBtn5zH3I\" class=\"photo zoom\" target=\"_blank\">\n    <img src=\"" + img.preview + "\">\n</a>\n</span>";
    if (!((_ref = item.img.page) != null ? _ref.length : void 0)) {
      return '';
    } else {
      return tpl_img;
    }
  };

  render_item = function(item) {
    item.msghtml = render_img(item);
    return "<tr>\n  <td class=\"item\">\n    <div class=\"outer\">\n      <div class=\"avatar\">\n        <a href=\"http://fanfou.com/" + item.loginname + "\" title=\"" + item.realname + "\">\n          <img class=\"avatar\" src=\"" + item.avatar + "\">\n        </a>\n      </div>\n      <div class=\"text-outer\">\n        <span class=\"text\">\n          <a href=\"http://fanfou.com/" + item.loginname + "\">" + item.realname + "</a>\n                  " + item.msg + "\n              </span>\n              " + item.msghtml + "\n              <span class=\"signature\">\n                  <a href=\"http://fanfou.com/statuses/" + item.statusid + "\" class=\"date\">" + item.time + "</a>\n                  <span class=\"fav\">收藏 " + item.count + " 次</span>\n              </span>\n      </div>\n    </div>\n  </td>\n</tr>";
  };

  render_page = function(data) {
    var item, items, title, tophr;
    title = "饭否" + data.shift_cn + "精选 " + data.date;
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

  routing = function() {
    var fn, get_page, hash, index, url, url_pattern;
    hash = window.location.hash;
    get_page = function(url) {
      return $.get(url, function(data) {
        data = JSON.parse(data);
        return render_page(data);
      });
    };
    if (!(hash != null ? hash.length : void 0)) {
      index = './json/index.json';
      $.get(index, function(data) {
        data = JSON.parse(data);
        return get_page(data[0]);
      });
    }
    url_pattern = /\d{4}-\d{2}-\d{2}\.(?:daily|weekly)/;
    if (hash.match(url_pattern)) {
      fn = hash.match(url_pattern)[0];
      url = "./json/" + fn + ".json";
      return get_page(url);
    }
  };

  $(function() {
    return routing();
  });

}).call(this);
