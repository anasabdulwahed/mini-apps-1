var App = {};

App.init = function() {
  var send = this.send.bind(this);
  var fetch = this.fetch.bind(this);

  $(document).ready(function() {
    $('#post').on('submit', function(e) {
      e.preventDefault();
      send($('#file-input').val(), $('textarea').val());
    });

    $('#get').on('submit', function(e) {
      e.preventDefault();
      fetch($('#file-search').val());
    });
  })
};

App.fetch = function(filename) {
  var renderCSV = this.renderCSV.bind(this);
  $.ajax({
    url: '/csv',
    method: 'GET',
    data: {filename: filename},
    success: function(result) {
      console.log('fetch successful');
      console.dir(JSON.parse(result));
      renderCSV(JSON.parse(result));
    },
    error: function(err) {
      console.log('fetch failed');
      renderCSV(null, err);
    }
  })
}

App.send = function(filename, json) {
  var fetch = this.fetch.bind(this);

  console.dir(json);
  var data = {
    filename: filename,
    json: JSON.parse(json)
  };

  $.ajax({
    url: '/csv',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: function() {
      console.log('successful');
      fetch(filename);  
    },
    error: function(err) {
      console.log('failed');
      console.log(err);
    }
  })
};

App.renderCSV = function(data, err) {
  $csvContainer = $('#csv-data')
  $csvContainer.empty()
  if (err) {
    $csvContainer.append(
    `<h1>File not found. Try again you boosted monkey</h1>`
    );
    return;
  }
  
  var $table = $(`<table></table>`);
  var $header = $(`<tr></tr>`);
  _.each(data.header, function(field) {
    var $field = $(`<th></th>`);
    $field.text(field);
    $header.append($field);
  });

  $table.append($header);

  _.each(data.body, function(row) {
    var rowArray = [];
    _.each(row, function(value){
      var $value = $(`<td></td>`);
      $value.text(value);
      rowArray.push($value);
    })
    var $row = $(`<tr></tr>`);
    $row.append(rowArray);
    $table.append($row);
  });
  $csvContainer.append($table);
}

window.App = App;