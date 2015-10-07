(function() {
  var $, click, get_page, render_img, render_item, render_page, routing;

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

  get_page = function(url) {
    return $.get(url, function(data) {
      if (typeof data !== 'object') {
        data = JSON.parse(data);
      }
      return render_page(data);
    });
  };

  click = function() {
    var shifts, tophr;
    tophr = '<tr>\n  <td id="top-hr"></td>\n</tr>';
    shifts = {
      daily: '每日',
      weekly: '每周',
      hourly: '实时'
    };
    $('#history').click(function() {
      var index;
      index = './json/index.json';
      return $.get(index, function(data) {
        var date, match, pattern, ret, shift, title, tpl, url, _i, _len, _ref;
        if (typeof data === 'string') {
          data = JSON.parse(data);
        }
        if (!(typeof data === 'object' && typeof data[0] === 'string' && data[0].length)) {
          "error here";
          return;
        }
        title = "往期精彩回顾";
        $('.content h2').html(title);
        $('.content table tbody').html('');
        ret = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          url = data[_i];
          pattern = /(\d{4}-\d{2}-\d{2})\.(daily|weekly)/;
          match = url.match(pattern);
          if (!match) {
            return;
          }
          _ref = match.slice(1, 3), date = _ref[0], shift = _ref[1];
          tpl = "<tr>\n  <td>\n  <a class=\"ajax-nav\" href=\"" + url + "\">\n  " + date + " " + shifts[shift] + "精选\n  </a>\n  </td>\n</tr>";
          ret.push(tpl);
        }
        $('.content table tbody').html(ret);
        return $('.ajax-nav').click(function(e) {
          var target;
          e.preventDefault();
          target = $(this);
          url = target.attr('href');
          window.location.hash = url.replace('./json/', '#').replace('.json', '');
          return get_page(url);
        });
      });
    });
    return $('#history').bind('touchstart click', function() {
      return $('#history').click();
    });
  };

  routing = function() {
    var fn, hash, index, url, url_pattern;
    hash = window.location.hash;
    if (!(hash != null ? hash.length : void 0)) {
      index = './json/index.json';
      $.get(index, function(data) {
        if (typeof data === 'string') {
          data = JSON.parse(data);
        }
        if (typeof data === 'object' && typeof data[0] === 'string' && data[0].length) {
          return get_page(data[0]);
        }
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
    routing();
    return click();
  });

}).call(this);
