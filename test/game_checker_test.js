/**
 * Created by andrewparrish on 5/20/17.
 */

var expect = require('chai').expect;
var exec_file = require("../exec_file.js");
var $ = require('jquery');
var context = exec_file("gamechecker.js", { $: $});