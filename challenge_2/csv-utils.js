var fs = require('fs');
var path = require('path');
var _ = require('underscore');

var fileDirectory = path.join(__dirname, 'csv');

module.exports.write = function(filename, report, cb) {
  var keys = Object.keys(report);
  var iterables = ['id', 'parentId']; // Fields holding basic data
  var childrenKey; //Field holding nested children
  var header = 'id,parentId,';
  var body = '';
  _.each(keys, function(key) {
    if (typeof report[key] !== 'object') {
      header += `${key},`
      iterables.push(key);
    }
    childrenKey = key;
  });
  
  var idTracker = {
    id: 0
  }

  header = header.slice(0, -1) + '\n'; // Trim off last comma
  body = parseReport(iterables, childrenKey, report, idTracker, null);
  fs.writeFile(`${fileDirectory}/${filename}`, header + body, function(err) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, 'File was successfully written!');
    }
  });
};

module.exports.read = function(filename, cb) {
  fs.readFile(`${fileDirectory}/${filename}`, function(err, results) {
    if (err) {
      cb(err, null);
    } else{
      debugger;
      results = results.toString();
      var format = formatCSV(results);
      cb(null, format);
    }
  })
};

var parseReport = function(iterables, childrenKey, report, idTracker, parentId) {
  var line = "";
  var id = idTracker.id;
  _.each(iterables, function(key) {
    if (key === 'id') {
      line += `${idTracker.id},`;
    } else if (key === 'parentId') {
      line += `${parentId},`;
    } else {
      line += `${report[key]},`;
    }
  })
  line = line.slice(0, -1) + '\n';
  if (report[childrenKey]) {
    _.each(report[childrenKey], function(child) {
      ++idTracker.id;
      line += parseReport(iterables, childrenKey, child, idTracker, id);
    })
  }
  return line;
}

var formatCSV = function(csvString) {
  var csvArray = csvString.split('\n');
  var header = csvArray.shift().split(',');
  
  var body = [];
  var entry = [];
  _.each(csvArray, function(line) {
    line = line.split(',')
    _.each(line, function(value) {
      entry.push(value);
    });
    body.push(entry);
    entry = [];
  });
  return {
    header: header,
    body: body
  }
}