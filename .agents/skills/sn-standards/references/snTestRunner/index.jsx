/*! RESOURCE: /scripts/doctype/SetTransactionSource.js */
(function(){
if (!window.transaction_source) {
var attrs = [ "Interface=Web", "Interface-Type=Classic Environment" ];
if ((window.NOW && NOW.isUsingPolaris) || (top.NOW && top.NOW.isPolarisWrapper === "true"))
attrs.push("Interface-Name=Unified Navigation App");
else
attrs.push("Interface-Name=Core UI");
window.transaction_source = attrs.join();
}
if (window.jQuery) {
window.jQuery.ajaxPrefilter(function(options) {
if (!options.crossDomain) {
if (!options.headers)
options.headers = {};
options.headers["X-Transaction-Source"] = window.transaction_source;
}
});
}
})()
;
/*! RESOURCE: /scripts/sn/common/_module.js */
angular.module('sn.common', [
'ngSanitize',
'ngAnimate',
'sn.common.avatar',
'sn.common.controls',
'sn.common.datetime',
'sn.common.glide',
'sn.common.i18n',
'sn.common.link',
'sn.common.mention',
'sn.common.messaging',
'sn.common.notification',
'sn.common.presence',
'sn.common.stream',
'sn.common.ui',
'sn.common.user_profile',
'sn.common.util',
'sn.common.dynamicTranslation'
]);
angular.module('ng.common', [
'sn.common'
]);
;
/*! RESOURCE: /scripts/sn/common/dist/templates.js */
angular.module('sn.common.dist.templates', []);
;
/*! RESOURCE: /scripts/sn/common/datetime/_module.js */
angular.module('sn.common.datetime', [
'sn.common.i18n'
]);
angular.module('sn.timeAgo', [
'sn.common.datetime'
]);
;
/*! RESOURCE: /scripts/sn/common/datetime/directive.snTimeAgo.js */
angular.module('sn.common.datetime').constant('DATE_GRANULARITY', {
DATETIME: 1,
DATE: 2
});
angular.module('sn.common.datetime').factory('timeAgoTimer', function($interval, $rootScope, DATE_GRANULARITY) {
"use strict";
var digestInterval;
return function(displayGranularityType) {
displayGranularityType = typeof displayGranularityType !== 'undefined' ? displayGranularityType : DATE_GRANULARITY.DATETIME;
if (!digestInterval && displayGranularityType == DATE_GRANULARITY.DATETIME)
digestInterval = $interval(function() {
$rootScope.$broadcast('sn.TimeAgo.tick');
}, 30 * 1000);
return Date.now();
};
});
angular.module('sn.common.datetime').factory('timeAgo', function(timeAgoSettings, DATE_GRANULARITY) {
var service = {
settings: timeAgoSettings.get(),
allowFuture: function allowFuture(bool) {
this.settings.allowFuture = bool;
return this;
},
toWords: function toWords(distanceMillis, messageGranularity, verbose) {
messageGranularity = messageGranularity || DATE_GRANULARITY.DATETIME;
var $l = verbose ? service.settings.strings_verbose : service.settings.strings;
var seconds = Math.abs(distanceMillis) / 1000;
var minutes = seconds / 60;
var hours = minutes / 60;
var days = hours / 24;
var years = days / 365;
var ago = $l.ago;
if ((seconds < 45 && messageGranularity == DATE_GRANULARITY.DATETIME)
|| (hours < 24 && messageGranularity == DATE_GRANULARITY.DATE)
|| (!service.settings.allowFuture && distanceMillis < 0))
ago = '%d';
if (service.settings.allowFuture) {
if (distanceMillis < 0) {
ago = $l.fromNow;
}
}
function substitute(stringOrFunction, number) {
var string = angular.isFunction(stringOrFunction) ?
stringOrFunction(number, distanceMillis) : stringOrFunction;
if (!string)
return "";
var value = ($l.numbers && $l.numbers[number]) || number;
return string.replace(/%d/i, value);
}
var wantDate = messageGranularity == DATE_GRANULARITY.DATE;
var wantDateTime = messageGranularity == DATE_GRANULARITY.DATETIME;
var words = distanceMillis <= 0 && wantDateTime && substitute($l.justNow, 0) ||
distanceMillis <= 0 && wantDate && substitute($l.today, 0) ||
seconds < 45 && (distanceMillis >= 0 || !service.settings.allowFuture) && wantDateTime && substitute($l.justNow, Math.round(seconds)) ||
seconds < 45 && wantDateTime && substitute($l.seconds, Math.round(seconds)) ||
seconds < 90 && wantDateTime && substitute($l.minute, 1) ||
minutes < 45 && wantDateTime && substitute($l.minutes, Math.round(minutes)) ||
minutes < 90 && wantDateTime && substitute($l.hour, 1) ||
hours < 24 && wantDateTime && substitute($l.hours, Math.round(hours)) ||
hours < 24 && wantDate && substitute($l.today, 0) ||
hours < 42 && substitute($l.day, 1) ||
days < 30 && substitute($l.days, Math.ceil(days)) ||
days < 45 && substitute($l.month, 1) ||
days < 365 && substitute($l.months, Math.round(days / 30)) ||
years < 1.5 && substitute($l.year, 1) ||
substitute($l.years, Math.round(years));
return substitute(ago, words);
},
parse: function(iso8601) {
if (angular.isNumber(iso8601))
return new Date(parseInt(iso8601, 10));
var s = iso8601.trim();
s = s.replace(/\.\d+/,"");
s = s.replace(/-/,"/").replace(/-/,"/");
s = s.replace(/T/," ").replace(/Z/," UTC");
s = s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2");
return new Date(s);
}
};
return service;
});
angular.module('sn.common.datetime').directive("snTimeAgo", function(timeAgoSettings, $rootScope, timeAgo, timeAgoTimer, DATE_GRANULARITY, dateUtils) {
"use strict";
return {
restrict: "E",
template: '<time data-toggle="tooltip" data-placement="bottom" title="{{ ::titleTime }}" tabindex="0"><span aria-hidden="true">{{timeAgo}}</span><span class="sr-only">{{timeAgoVerbose}}</span></time>',
scope: {
timestamp: "=",
local: "=",
label: "=",
voiceOverLabel: "="
},
link: function(scope) {
timeAgoSettings.ready.then(function() {
timeAgoTimer(DATE_GRANULARITY.DATETIME)
scope.$on('sn.TimeAgo.tick', setTimeAgo);
setTimeAgo();
});
function setTimeAgo() {
scope.timeAgo = [scope.label, timeAgoConverter(scope.timestamp, true, false)].filter(Boolean).join(' ');
scope.timeAgoVerbose = [scope.voiceOverLabel, scope.label, timeAgoConverter(scope.timestamp, true, true)].filter(Boolean).join(' ');
}
function timeAgoConverter(input, noFuture, verbose) {
if (!input)
return;
var allowFuture = !noFuture;
var date = timeAgo.parse(input);
if (scope.local) {
scope.titleTime = input;
return timeAgo.allowFuture(allowFuture).toWords(new Date() - date, 1, verbose);
}
if (Object.prototype.toString.call(date) !== "[object Date]" && Object.prototype.toString.call(date) !== "[object Number]")
return input;
else if (Object.prototype.toString.call(date) == "[object Date]" && isNaN(date.getTime()))
return input;
setTitleTime(date);
var currentDate = new Date();
currentDate = new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), currentDate.getUTCHours(), currentDate.getUTCMinutes(), currentDate.getUTCSeconds() );
var diff = currentDate - date;
return timeAgo.allowFuture(allowFuture).toWords(diff, 1, verbose);
}
function setTitleTime(date) {
var t = date.getTime();
var o = date.getTimezoneOffset();
t -= o * 60 * 1000;
if (typeof g_user_date_time_format !== 'undefined' && g_user_date_time_format.indexOf('z') == -1)
scope.titleTime = dateUtils.formatDate(new Date(t), g_user_date_time_format);
else
scope.titleTime = new Date(t).toLocaleString();
}
}
}
});
angular.module('sn.common.datetime').directive("snTimeAgoStatic", function(timeAgoSettings, $rootScope, timeAgo, timeAgoTimer, DATE_GRANULARITY) {
"use strict";
return {
restrict: "E",
template: '<time title="{{ ::titleTime }}">{{timeAgo}}</time>',
scope: {
timestamp: "@",
local: "@"
},
link: function(scope) {
timeAgoSettings.ready.then(function() {
timeAgoTimer(DATE_GRANULARITY.DATETIME)
scope.$on('sn.TimeAgo.tick', setTimeAgo);
setTimeAgo();
});
function setTimeAgo() {
scope.timeAgo = timeAgoConverter(scope.timestamp, true);
}
function timeAgoConverter(input, noFuture) {
if (!input)
return;
var allowFuture = !noFuture;
var date = timeAgo.parse(input);
if (scope.local) {
scope.titleTime = input;
return timeAgo.allowFuture(allowFuture).toWords(new Date() - date);
}
if (Object.prototype.toString.call(date) !== "[object Date]" && Object.prototype.toString.call(date) !== "[object Number]")
return input;
else if (Object.prototype.toString.call(date) == "[object Date]" && isNaN(date.getTime()))
return input;
setTitleTime(date);
var currentDate = new Date();
currentDate = new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), currentDate.getUTCHours(), currentDate.getUTCMinutes(), currentDate.getUTCSeconds() );
var diff = currentDate - date;
return timeAgo.allowFuture(allowFuture).toWords(diff);
}
function setTitleTime(date) {
var t = date.getTime();
var o = date.getTimezoneOffset();
t -= o * 60 * 1000;
scope.titleTime = new Date(t).toLocaleString();
}
}
}
});
;
/*! RESOURCE: /scripts/sn/common/datetime/directive.snDayAgo.js */
angular.module('sn.common.datetime').directive("snDayAgo", function(timeAgoSettings, $rootScope, timeAgo, timeAgoTimer, DATE_GRANULARITY) {
"use strict";
return {
restrict: "E",
template: '<time>{{dayAgo}}</time>',
scope: {
date: "=",
label: "="
},
link: function(scope) {
timeAgoSettings.ready.then(function() {
setDayAgo();
});
function setDayAgo() {
scope.dayAgo = [scope.label, dayAgoConverter(scope.date, "noFuture")].filter(Boolean).join(' ');
}

function dayAgoConverter(input, option) {
if (!input) return;
var allowFuture = !((option === 'noFuture') || (option === 'no_future'));
var date = timeAgo.parse(input);
if ( Object.prototype.toString.call(date) !== "[object Date]" )
return input;
else if ( isNaN(date.getTime()) )
return input;

var diff = timeAgoTimer(DATE_GRANULARITY.DATE) - date;
return timeAgo.allowFuture(allowFuture).toWords(diff, DATE_GRANULARITY.DATE);
}
}
}
});
;
/*! RESOURCE: /scripts/sn/common/datetime/snTimeAgoSettings.js */
angular.module('sn.common.datetime').provider('snTimeAgoSettings', function() {
"use strict";
var INIT_NEVER = 'never';
var INIT_AUTO = 'auto';
var INIT_MANUAL = 'manual';
var _initMethod = INIT_AUTO;
this.setInitializationMethod = function(init) {
switch (init) {
default:
init = INIT_AUTO;
case INIT_NEVER:
case INIT_AUTO:
case INIT_MANUAL:
_initMethod = init;
break;
}
};
this.$get = function(i18n, $q) {
var settings = {
allowFuture: true,
dateOnly: false,
strings: {}
};
var _initialized = false;
var ready = $q.defer();
function initialize() {
if (_initMethod === INIT_NEVER) {
return $q.reject();
}
if (!_initialized) {
_initialized = true;
i18n.getMessages(['%d ago', '%d from now', 'just now',
'%d minutes_verbose', 'about %d hours_verbose', '%d days_verbose', '%d months_verbose', '%d years_verbose',
'less than a minute', 'about a minute', '%d minutes', 'about an hour', 'about %d hours', 'today', 'a day', '%d days',
'about a month', '%d months', 'about a year', 'about a year', '%d years'], function (msgs) {
settings.strings = {
ago: msgs['%d ago'],
fromNow: msgs['%d from now'],
justNow: msgs["just now"],
seconds: msgs["less than a minute"],
minute: msgs["about a minute"],
minutes: msgs["%d minutes"],
hour: msgs["about an hour"],
hours: msgs["about %d hours"],
day: msgs["a day"],
days: msgs["%d days"],
month: msgs["about a month"],
months: msgs["%d months"],
year: msgs["about a year"],
years: msgs["%d years"],
today: msgs["today"],
wordSeparator: msgs["timeago_number_separator"],
numbers: []
};
settings.strings_verbose = Object.assign({}, settings.strings, {
minutes: msgs["%d minutes_verbose"],
hours: msgs["about %d hours_verbose"],
days: msgs["%d days_verbose"],
months: msgs["%d months_verbose"],
years: msgs["%d years_verbose"]
});
ready.resolve();
});
}
return ready.promise;
}
if (_initMethod === INIT_AUTO) {
initialize();
}
return {
initialize: initialize,
ready: ready.promise,
get: function get() {
return settings;
},
set: function set(translated) {
settings = angular.extend(settings, translated);
}
};
};
}).factory('timeAgoSettings', function(snTimeAgoSettings) {
return snTimeAgoSettings;
});
;
;
/*! RESOURCE: /scripts/sn/common/datetime/js_includes_datetime.js */
/*! RESOURCE: /scripts/sn/common/glide/_module.js */
angular.module('sn.common.glide', [
'sn.common.util'
]);
;
/*! RESOURCE: /scripts/sn/common/glide/factory.glideUrlBuilder.js */
angular.module('sn.common.glide').factory('glideUrlBuilder', ['$window', function($window) {
"use strict";
function GlideUrl(contextPath){
var objDef = {
contextPath: '',
params: {},
encodedString: '',
encode: true,
setFromCurrent: function() {
this.setFromString($window.location.href);
},
setFromString:function(href) {
var pos = href.indexOf('?');
if (pos < 0) {
this.contextPath = href;
return;
}
this.contextPath = href.slice(0, pos);
var hashes = href.slice(pos + 1).split('&');
var i = hashes.length;
while (i--) {
var pos = hashes[i].indexOf('=');
this.params[hashes[i].substring(0, pos)] = hashes[i].substring(++pos);
}
},
setContextPath: function(c) {
this.contextPath = c;
},
getParam: function(p) {
return this.params[p];
},
getParams: function() {
return this.params;
},
addParam: function(name, value) {
this.params[name] = value;
return this;
},
addToken: function() {
if (typeof g_ck != 'undefined' && g_ck != "")
this.addParam('sysparm_ck', g_ck);
return this;
},
deleteParam: function(name) {
delete this.params[name];
},
addEncodedString: function(s) {
if (!s)
return;
if (s.substr(0, 1) != "&")
this.encodedString += "&";
this.encodedString += s;
return this;
},
getQueryString: function(additionalParams) {
var qs = this._getParamsForURL(this.params);
qs += this._getParamsForURL(additionalParams);
qs += this.encodedString;
if (qs.length == 0)
return "";
return qs.substring(1);
},
_getParamsForURL: function(params) {
if (!params)
return '';
var url = '';
for (var n in params) {
var p = params[n] || '';
url += '&' + n + '=' + (this.encode ? encodeURIComponent(p + '') : p);
}
return url;
},
getURL: function(additionalParams) {
var url = this.contextPath;
var qs = this.getQueryString(additionalParams);
if (qs)
url += "?" + qs;
return url;
},
setEncode: function(b) {
this.encode = b;
},
toString: function() { return 'GlideURL'; }
}
return objDef;
}
return {
newGlideUrl: function(contextPath) {
var glideUrl = new GlideUrl();
glideUrl.setFromString(contextPath ? contextPath : '');
return glideUrl;
},
refresh: function(){
$window.location.replace( $window.location.href );
},
getCancelableLink: function(link) {
if ($window.NOW && $window.NOW.g_cancelPreviousTransaction) {
var nextChar = link.indexOf('?') > -1 ? '&' : '?';
link += nextChar + "sysparm_cancelable=true";
}
return link;
}
};
}]);
;
/*! RESOURCE: /scripts/sn/common/glide/service.queryFilter.js */
angular.module('sn.common.glide').factory('queryFilter', function() {
"use strict";
return {
create : function() {
var that = {};
that.conditions = [];
function newCondition(field, operator, value, label, displayValue, type){
var condition = {
field: field,
operator: operator,
value: value,
displayValue: displayValue,
label: label,
left: null,
right: null,
type: null,
setValue: function(value, displayValue){
this.value = value;
this.displayValue = displayValue ? displayValue : value;
}
};
if (type)
condition.type = type;
return condition;
}
function addCondition(condition) {
that.conditions.push(condition);
return condition;
}
function removeCondition(condition) {
for (var i = that.conditions.length-1; i >= 0; i--) {
if (that.conditions[i] === condition)
that.conditions.splice(i, 1);
}
}
function getConditionsByField(conditions, field){
var conditionsToReturn = [];
for(var condition in conditions){
if (conditions.hasOwnProperty(condition)){
if (conditions[condition].field == field)
conditionsToReturn.push(conditions[condition]);
}
}
return conditionsToReturn;
}
function encodeCondition(condition){
var output = "";
if (condition.hasOwnProperty("left") && condition.left){
output += encodeCondition(condition.left);
}
if (condition.hasOwnProperty("right") && condition.right){
var right = encodeCondition(condition.right);
if (right.length > 0){
output += "^" + condition.type + right;
}
}
if (condition.field){
output += condition.field;
output += condition.operator;
if (condition.value !== null && typeof condition.value !== "undefined")
output += condition.value;
}
return output;
}
function createEncodedQuery() {
var eq = "";
var ca = that.conditions;
for (var i = 0; i < ca.length; i++) {
var condition = ca[i];
if (eq.length)
eq += '^';
eq += encodeCondition(condition);
}
eq += "^EQ";
return eq;
}
that.addCondition = addCondition;
that.newCondition = newCondition;
that.createEncodedQuery = createEncodedQuery;
that.getConditionsByField = getConditionsByField;
that.removeCondition = removeCondition;
return that;
}
};
});
;
/*! RESOURCE: /scripts/sn/common/glide/service.filterExpressionParser.js */
angular.module('sn.common.glide').factory('filterExpressionParser', function() {
'use strict';
var operatorExpressions = [{
wildcardExp: '(.*)',
operator: 'STARTSWITH',
toExpression: function(filter) {
return filter;
}
},{
wildcardExp: '^\\*(.*)',
operator: 'LIKE',
toExpression: function(filter) {
return (filter === '*' ? filter : '*' + filter);
}
},{
wildcardExp: '^\\.(.*)',
operator: 'LIKE',
toExpression: function(filter) {
return '.' + filter;
}
},{
wildcardExp: '^%(.*)',
operator: 'ENDSWITH',
toExpression: function(filter) {
return (filter === '%' ? filter : '%' + filter);
}
},{
wildcardExp: '(.*)%',
operator: 'LIKE',
toExpression: function(filter) {
return filter + '%';
}
},{
wildcardExp: '^=(.*)',
operator: '=',
toExpression: function(filter) {
return (filter === '=' ? filter : '=' + filter);
}
},{
wildcardExp: '^!\\*(.*)',
operator: 'NOT LIKE',
toExpression: function(filter) {
return (filter === '!*' || filter === '!' ? filter : '!*' + filter);
}
},{
wildcardExp: '^!=(.*)',
operator: '!=',
toExpression: function(filter) {
return (filter === '!=' || filter === '!' ? filter : '!=' + filter);
}
}, {
wildcardExp: '^\\*\\*$',
operator: 'ANYTHING',
toExpression: function() {
return "ANYTHING";
}
}];
return {
getOperatorExpressionForOperator: function(operator) {
for (var i = 0; i < operatorExpressions.length; i++) {
var item = operatorExpressions[i];
if (item.operator === operator)
return item;
}
throw {
name: 'OperatorNotSupported',
message: 'The operator ' + operator + ' is not in the list of operatorExpressions.'
};
},
parse: function(val, defaultOperator) {
var parsedValue = {
filterText: val,
operator: defaultOperator || 'STARTSWITH'
};
for (var i = 1; i < operatorExpressions.length; i++) {
var operatorItem = operatorExpressions[i];
var match = val.match(operatorItem.wildcardExp);
if (match && match[1] !== '') {
parsedValue.operator = operatorItem.operator;
parsedValue.filterText = match[1];
}
}
return parsedValue;
}
};
});
;
/*! RESOURCE: /scripts/sn/common/glide/service.userPreferences.js */
angular.module('sn.common.glide').factory("userPreferences", function ($http, $q, unwrappedHTTPPromise, urlTools) {
"use strict";
var preferencesCache = {};
function getPreference(preferenceName) {
if (preferenceName in preferencesCache)
return preferencesCache[preferenceName];
var targetURL = urlTools.getURL('user_preference', {
"sysparm_pref_name": preferenceName,
"sysparm_action": "get"
}),
deferred = $q.defer();
$http.get(targetURL).success(function (response) {
deferred.resolve(response.sysparm_pref_value);
}).error(function (data, status) {
deferred.reject("Error getting preference " + preferenceName + ": " + status);
});
preferencesCache[preferenceName] = deferred.promise;
return deferred.promise;
}
function setPreference(preferenceName, preferenceValue) {
var preferenceValueString = "" + preferenceValue;
var parmsObj = {
"sysparm_pref_name": preferenceName,
"sysparm_action": "set"
};
var useGet = preferenceValueString.length <= 1024;
if (useGet)
parmsObj["sysparm_pref_value"] = preferenceValueString;
var targetURL = urlTools.getURL('user_preference', parmsObj);

var httpPromise = useGet ? $http.get(targetURL) : $http.post(targetURL, {'sysparm_pref_value': preferenceValueString});
addToCache(preferenceName, preferenceValue);
return unwrappedHTTPPromise(httpPromise);
}
function addToCache(preferenceName, preferenceValue){
preferencesCache[preferenceName] = $q.when(preferenceValue);
}
var userPreferences = {
getPreference: getPreference,
setPreference: setPreference,
addToCache: addToCache
};
return userPreferences;
});
;
/*! RESOURCE: /scripts/sn/common/glide/service.nowStream.js */
angular.module('sn.common.glide').constant('nowStreamTimerInterval', 5000);
angular.module('sn.common.glide').factory('nowStream', function($q, amb, $timeout, urlTools, nowStreamTimerInterval, snResource, snCustomEvent, $log) {
'use strict';
var POLLING_OFF = window.NOW.activity && !(window.NOW.activity.polling && window.NOW.activity.isV0);
var EDIT_ENABLED = window.NOW.activity && !(window.NOW.activity.editTimeLimit === '0');
var HISTORY_UPDATE_AMB_CHANNEL = '/history/update';
var V1_EMAIL_CHANNEL = '/activity/ui16';
var V0_EMAIL_CHANNEL = '/activity/email';
var EDIT_CHANNEL = '/activity/ui16/edit';
amb.connect();
var Stream = function() {
this.initialize.apply(this, arguments);
};
Stream.prototype = {
initialize: function(table, query, sys_id, processor, interval, source, includeAttachments) {
this.table = table;
this.query = query;
this.sysparmQuery = null;
this.sys_id = sys_id;
this.processor = processor;
this.lastTimestamp = 0;
this.inflightRequest = null;
this.requestImmediateUpdate = false;
this.interval = interval;
this.source = source;
this.includeAttachments = includeAttachments;
this.stopped = true;
this.isLoggedIn = true;
this.ambChannel = null;
this.editChannel = null;
var meta_connect = '/meta/connect';
var connectToEmailAmb = window.NOW.activity ? window.NOW.activity.useEmailAmb : false;
var channelName;
if (!POLLING_OFF)
channelName = HISTORY_UPDATE_AMB_CHANNEL + '/' + this.table + '/' + this.sys_id;
else if (connectToEmailAmb)
channelName = (window.NOW.activity.isV0 ? V0_EMAIL_CHANNEL : V1_EMAIL_CHANNEL) + '/' + this.sys_id;
else
channelName = null;
if (channelName)
this.ambChannel = amb.getChannel(channelName).subscribe(POLLING_OFF ? this.fetchStreamForAmb.bind(this) : this.tap.bind(this));
this.metaConnect = amb.getChannel(meta_connect).subscribe(this.evaluateLoggedIn.bind(this));
var editChannelName;
if (EDIT_ENABLED) {
var connectToEditAmbWithTable = window.NOW.activity ? window.NOW.activity.useEditAmbWithTable : false;
if (this.sys_id && !connectToEditAmbWithTable)
editChannelName = EDIT_CHANNEL + '/' + this.sys_id;
if (connectToEditAmbWithTable) {
if (this.table)
editChannelName = EDIT_CHANNEL + '/' + this.table;
else if (window.NOW.activity.editAmbTable)
editChannelName = EDIT_CHANNEL + '/' + window.NOW.activity.editAmbTable;
}
this.editChannel = amb.getChannel(editChannelName).subscribe(this.getEditMessageAndMakeEdit.bind(this));
}
},
evaluateLoggedIn: function(message) {
var msg = message.ext || {};
this.ambConnected = message.successful;
var SESSION_STATUS = "glide.session.status";
var SESSION_TIMEOUT = "glide.session.time.remaining.in.seconds";
var SESSION_LOGGED_IN = "session.logged.in";
var SESSION_LOGGED_OUT = "session.logged.out";
var SESSION_INVALIDATED = "session.invalidated";
if (msg[SESSION_STATUS] === SESSION_LOGGED_IN) {
if (msg[SESSION_TIMEOUT] && parseInt(msg[SESSION_TIMEOUT]) > 0)
this.isLoggedIn = true;
}
else if (msg[SESSION_STATUS] === SESSION_INVALIDATED || msg[SESSION_STATUS] === SESSION_LOGGED_OUT)
this.isLoggedIn = false;
},
parseEditMessage: function(jsonString) {
if (!jsonString || typeof jsonString !== 'string')
return null;
try {
var parsed = JSON.parse(jsonString);
var result = {
new: parsed.new || '',
type: parsed.type || '',
containsCode: parsed.containsCode === 'true',
historyLineIds: []
};
if (parsed.historyLineIds && typeof parsed.historyLineIds === 'string') {
try {
result.historyLineIds = JSON.parse(parsed.historyLineIds);
} catch (e) {
console.error('History line ids is not a JSON string:', e);
result.historyLineIds = [parsed.historyLineIds];
}
}
return result;
} catch (error) {
console.error('Error parsing edit message data', error);
return null;
}
},
getEditMessageAndMakeEdit: function(message) {
var parsedJson = this.parseEditMessage(message.data.data);
if (!parsedJson)
return;
var editType = parsedJson.type;
var newValue = parsedJson.new;
var containsCode = parsedJson.containsCode;
var historyLineIds = parsedJson.historyLineIds;
var selector = historyLineIds.map(function(id) {
return '#activity_' + id;
}).join(', ');
var textDivElements = document.querySelectorAll(selector);
if (textDivElements.length === 0)
return;
if (editType === 'edited') {
for (var i = 0; i < textDivElements.length; i++) {
if(this.handleEdit(textDivElements[i], containsCode, newValue)) {
snCustomEvent.fire('sn.stream.entries_edited',
this.getHistoryLineId(textDivElements[i].id), newValue, containsCode);
}
}
}
if (editType === 'deleted') {
for (var i = 0; i < textDivElements.length; i++) {
var liElement = textDivElements[i].closest('li.h-card');
if (liElement) {
var historyLineId = this.getHistoryLineId(textDivElements[i].id);
var widgetDivElements = liElement.querySelectorAll('div.sn-widget');
if (widgetDivElements.length === 1 || widgetDivElements.length === 0) {
liElement.remove();
}
else {
textDivElements[i].remove();
}
snCustomEvent.fire('sn.stream.entries_deleted', historyLineId);
}
}
}
},
getHistoryLineId: function(id) {
var prefix = 'activity_';
if (id.startsWith(prefix)) {
return id.substring(prefix.length);
}
return id;
},
handleEdit: function(textDivElement, containsCode, newValue, historyLineId) {
var spanElement = textDivElement.querySelector('span.sn-widget-textblock-body');
if (!spanElement)
return false;
if (containsCode) {
var targetElement = spanElement.querySelector('sn-html-content-wrapper');
if (!targetElement)
targetElement = spanElement;
var shadowRootElement = targetElement.shadowRoot;
if (shadowRootElement) {
var divElement = shadowRootElement.querySelector('div');
if (divElement) {
divElement.innerHTML = newValue;
return true;
}
}
this.encapsulate(targetElement, newValue, historyLineId);
targetElement.innerHTML = '';
return true;
}
spanElement.innerHTML = newValue;
return true;
},
createDefaultCssLink: function() {
var link = document.createElement("link");
link.href = "styles/activity_encapsulated.css";
link.rel = "stylesheet";
link.type = "text/css";
return link;
},
createBaseElement: function() {
var base = document.createElement("base");
base.setAttribute("target", "_blank");
return base;
},
encapsulate: function(root, content, uniqueId) {
var defaultCssLink = this.createDefaultCssLink();
var style = document.createElement('style');
style.innerHTML = ':host img {max-width: 100%; height: auto; overflow: hidden;}';
if (document.head.createShadowRoot || document.head.attachShadow) {
var shadow = root.shadowRoot || (document.head.attachShadow ?
root.attachShadow({mode: 'open'}) :
root.createShadowRoot());
var contentDiv = document.createElement('div');
contentDiv.innerHTML = content;
if (window.NOW && window.NOW.isUsingPolaris) contentDiv.classList.add('-polaris');
shadow.innerHTML = contentDiv.outerHTML;
shadow.appendChild(defaultCssLink);
shadow.appendChild(style);
} else {
var iframeId = "activity-iframe-" + uniqueId;
var existingIframe = document.getElementById(iframeId);
if (existingIframe) {
existingIframe.contentDocument.write(content);
existingIframe.contentWindow.document.head.appendChild(defaultCssLink);
existingIframe.setAttribute("height", existingIframe.contentWindow.document.body.scrollHeight + 'px');
}
else {
var rootEl = typeof $j !== 'undefined' ? $j(root) : null;
var iframe = document.createElement("iframe");
iframe.setAttribute("id", iframeId);
iframe.setAttribute("style", "border:none;display:block;width:100%");
iframe.setAttribute("class", "html-content");
iframe.setAttribute("scrolling", "no");
iframe.setAttribute("height", "0");
iframe.setAttribute("sandbox", "allow-same-origin");
root.appendChild(iframe);
var doc = iframe.contentWindow.document;
doc.open();
doc.write(content);
doc.close();
iframe.contentWindow.document.head.appendChild(defaultCssLink);
iframe.contentWindow.document.head.appendChild(this.createBaseElement());
iframe.height = doc.body.scrollHeight + 'px';
if (rootEl && rootEl.closest) {
var parentTab = rootEl.closest(".tabs2_section");
var parentSectionId = parentTab.attr ? parentTab.attr("data-section-id") : null;
var setIFrameHeightFn = function(tab) {
if (typeof $j !== 'undefined') {
var openedTab = $j(".tabs2_section." + tab);
if (openedTab.length > 0 && openedTab.attr("data-section-id") === parentSectionId) {
iframe.contentWindow.document.head.appendChild(defaultCssLink);
iframe.height = doc.body.scrollHeight + 'px';
if (typeof CustomEvent !== 'undefined' && CustomEvent.un) {
CustomEvent.un("tab.activated", setIFrameHeightFn);
}
}
}
};
if (typeof CustomEvent !== 'undefined' && CustomEvent.observe) {
CustomEvent.observe("tab.activated", setIFrameHeightFn);
}
}
}
}
},
fetchStreamForAmb: function(message) {
this._executeRequest().then(this._successCallback.bind(this));
},
fetchStream: function(callback, preRequestCallback) {
this.callback = callback;
this.preRequestCallback = preRequestCallback;
this._executeRequest().then(this._successCallback.bind(this));
},
setQuery: function(sysparmQuery) {
this.sysparmQuery = sysparmQuery;
},
poll: function(callback, preRequestCallback) {
if (POLLING_OFF)
return;
this.callback = callback;
this.preRequestCallback = preRequestCallback;
this._stopPolling();
this._startPolling();
},
tap: function() {
if (POLLING_OFF)
return;
if (!this.inflightRequest) {
this._stopPolling();
this._startPolling();
}
else
this.requestImmediateUpdate = true;
},
insert: function(field, text) {
this.insertForEntry(field, text, this.table, this.sys_id);
},
insertForEntry: function(field, text, table, sys_id) {
return this.insertEntries([{
field: field,
text: text
}], table, sys_id);
},
expandMentions: function (entryText, mentionIDMap) {
var text = entryText;
Object.getOwnPropertyNames(mentionIDMap).forEach(function(element) {
var atMention = element.replace(/[.*+\-?^()|[\]\\]/g, '\\$&');
var search = new RegExp("@\\[" + atMention + "\\]", "gi");
var sysId = mentionIDMap[element];
text = text.replace(search, "@[" + sysId + ":" + element + "]");
});
return text;
},
addCarriageReturns: function(entryText) {
return entryText.replace(/\r*\n/g, '\r\n');
},
insertEntries: function(entries, table, sys_id, mentionIDMap) {
mentionIDMap = mentionIDMap || {};
var sanitizedEntries = [];
for (var i = 0; i < entries.length; i++) {
var entryText = entries[i].text;
if (entryText && entryText.endsWith('\n'))
entryText = entryText.substring(0, entryText.length - 1);
if (!entryText)
continue;
entries[i].text = this.addCarriageReturns(this.expandMentions(entryText, mentionIDMap));
sanitizedEntries.push(entries[i]);
}
if (sanitizedEntries.length === 0)
return;
this._isInserting = true;
var url = this._getInsertURL(table, sys_id);
var that = this;
return snResource().post(url, {
entries: sanitizedEntries
}).then(this._successCallback.bind(this), function() {
$log.warn('Error submitting entries', sanitizedEntries);
}).then(function() {
that._isInserting = false;
});
},
cancel: function() {
this._stopPolling();
if (this.ambChannel)
this.ambChannel.unsubscribe();
if (this.editChannel)
this.editChannel.unsubscribe();
},
_startPolling : function() {
var interval = this._getInterval();
var that = this;
var successCallback = this._successCallback.bind(this);
that.stopped = false;
function runPoll() {
if (that._isInserting) {
establishNextRequest();
return;
}
if (that.lastPollFailed) {
that.stopNextRequest = !that.ambConnected || !that.isLoggedIn;
establishNextRequest();
}
if (!that.inflightRequest && !that.stopNextRequest) {
that.inflightRequest = that._executeRequest();
that.inflightRequest.then(successCallback);
that.inflightRequest.finally(function() {
that.inflightRequest = null;
if (that.requestImmediateUpdate) {
that.requestImmediateUpdate = false;
establishNextRequest(0);
}
else {
establishNextRequest();
}
});
}
}
function establishNextRequest(intervalOverride) {
if (that.stopped)
return;
intervalOverride = (parseFloat(intervalOverride) >= 0) ? intervalOverride : interval;
$timeout.cancel(that.timer);
that.timer = $timeout(runPoll, intervalOverride);
}
runPoll();
},
_stopPolling : function() {
if (this.timer)
$timeout.cancel(this.timer);
this.stopped = true;
},
_executeRequest: function() {
var url = this._getURL();
if (this.preRequestCallback) {
this.preRequestCallback();
}
return snResource().get(url);
},
_getURL: function() {
var params = {
table: this.table,
action: this._getAction(),
sysparm_silent_request: true,
sysparm_auto_request: true,
sysparm_timestamp: this.lastTimestamp,
include_attachments: this.includeAttachments
};
if (this.sys_id) {
params['sys_id'] = this.sys_id;
} else if (this.sysparmQuery) {
params['sysparm_query'] = this.sysparmQuery;
}
var url = urlTools.getURL(this.processor, params);
if (!this.sys_id) {
url += "&p=" + this.query;
}
if (this.processor === "list_history")
url = url.replace("angular", "list_history")
return url;
},
_getInsertURL: function(table, sys_id) {
return urlTools.getURL(this.processor, {
action: 'insert',
table: table,
sys_id: sys_id,
sysparm_timestamp: this.timestamp || 0,
sysparm_source: this.source
});
},
_successCallback: function(answer) {
var response = answer.data;
if (response.entries && response.entries.length) {
response.entries = this._filterOld(response.entries);
if (response.entries.length > 0) {
this.lastEntry = angular.copy(response.entries[0]);
this.lastTimestamp = response.sys_timestamp || response.entries[0].sys_timestamp;
}
}
this.lastPollFailed = (response.entries && response.entries.length) == undefined;
this.callback.call(null, response);
},
_filterOld: function(entries) {
for (var i = 0; i < entries.length; i++) {
if (entries[i].sys_timestamp === this.lastTimestamp) {
if (this.lastEntry) {
if (!angular.equals(this._makeComparable(entries[i]), this._makeComparable(this.lastEntry)))
continue;
if (entries[i].attachment)
snCustomEvent.fire('sn.stream.attachment_state_updated', entries[i]);
}
}
if (entries[i].sys_timestamp <= this.lastTimestamp)
return entries.slice(0, i);
}
return entries;
},
_makeComparable: function(entry) {
if (entry.attachment)
return entry.attachment.sys_id;
var copy = angular.copy(entry);
delete copy.short_description;
delete copy.display_value;
if (copy.entries?.journal) {
for (var i = 0; i < copy.entries.journal.length; i++) {
var sysId = copy.entries.journal[i].sys_id;
copy.entries.journal[i] = { sys_id: sysId };
}
}
return copy;
},
_getAction: function() {
return this.sys_id ? 'get_new_entries' : 'get_set_entries';
},
_getInterval: function() {
if (this.interval)
return this.interval;
else if (window.NOW && NOW.stream_poll_interval)
return NOW.stream_poll_interval * 1000;
else
return nowStreamTimerInterval;
}
};
return {
create: function(table, query, sys_id, processor, interval, source) {
return new Stream(table, query, sys_id, processor, interval, source);
}
};
});
;
/*! RESOURCE: /scripts/sn/common/glide/service.nowServer.js */
angular.module('sn.common.glide').factory('nowServer', function($http, $q, userPreferences, angularProcessorUrl, urlTools) {
return {
getBaseURL: function () {
return angularProcessorUrl;
},
getPartial: function(scope, partial, parms, callback) {
var url = this.getPartialURL(partial, parms);
if (url === scope.url) {
callback.call();
return;
}
var fn = scope.$on('$includeContentLoaded', function() {
fn.call();
callback.call();
});
scope.url = url;
},
replaceView: function($location, newView) {
var p = $location.path();
var a = p.split("/");
a[1] = newView;
p = a.join("/");
return p;
},
getPartialURL: urlTools.getPartialURL,
getURL: urlTools.getURL,
urlFor : urlTools.urlFor,
getPropertyURL: urlTools.getPropertyURL,
setPreference: userPreferences.setPreference,
getPreference: userPreferences.getPreference
}
});
;
;
/*! RESOURCE: /scripts/sn/common/glide/js_includes_glide.js */
/*! RESOURCE: /scripts/glide-amb-client-bundle.min.js */
!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=12)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=function(e){return e&&e.__esModule?e:{default:e}}(n(1));var o=function(e){function t(t){window.console&&console.log(e+" "+t)}return{debug:function(e){"debug"===i.default.logLevel&&t("[DEBUG] "+e)},addInfoMessage:function(e){t("[INFO] "+e)},addErrorMessage:function(e){t("[ERROR] "+e)},addWarnMessage:function(e){t("[WARN] "+e)}}};t.default=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.WEBSOCKET_TYPE_NAME=t.TOKEN_MANAGEMENT_EXTENSION=void 0;t.WEBSOCKET_TYPE_NAME="websocket";t.TOKEN_MANAGEMENT_EXTENSION="tokenManagementExtension";var i={servletPath:"amb",logLevel:"info",loginWindow:"true",wsConnectTimeout:1e4,overlayStyle:"",pruneFailedTransports:"true",subscribeCommandsFlow:{enable:!1,maxInflight:1,maxWait:1e4,retries:3,retryDelay:{min:2e3,max:3e5,increaseFactor:2}},redeliveryDisconnectTimeoutInMins:10,requestHeaderToClearStickySessionCookie:!0,batchLogging:{enabled:!1,channels:[],startTime:null}};t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.WS_CONNECTION_NODE_ID=t.TRANSACTION_ALREADY_SUBMITTED=t.REQUEST_SUCCESS=t.REQUEST_ACCEPTED=t.PUBLISH_FAILURE=t.NODEID_COOKIE_KEY=t.MSG_SHARD=t.MSG_NUM=t.MISSING_REQUEST_DATA=t.MISSING_INTERACTION_ID=t.META_HANDSHAKE=t.MESSAGE_REDELIVERY_OPTIONS=t.GLIDE_REMEMBER_ME=t.GLIDE_AMB_HUP_SIGNAL_RECONNECT_IN_SEC=t.GLIDE_AMB_HANDSHAKE_LIMIT_ENABLED=t.CHANNEL_READY_TO_DELIVER=t.CHANNEL_NOT_READY_TO_DELIVER=t.CANCEL_TRANSACTION_CHANNEL=t.CANCEL_TRANSACTION_ACTION=void 0;t.MSG_NUM="msg_num";t.MSG_SHARD="msg_shard";t.MESSAGE_REDELIVERY_OPTIONS="msg_redelivery_options";t.CHANNEL_READY_TO_DELIVER="Channel set to deliver messages now: ";t.CHANNEL_NOT_READY_TO_DELIVER="Channel set to not deliver messages until re-subscription & re-delivery of missed messages is over: ";t.META_HANDSHAKE="/meta/handshake";t.WS_CONNECTION_NODE_ID="glide.amb.wsConnectionNodeId";t.NODEID_COOKIE_KEY="glide_node_id_for_js";t.GLIDE_REMEMBER_ME="glide.remember.me";t.GLIDE_AMB_HUP_SIGNAL_RECONNECT_IN_SEC="glide.amb.hup.signal.reconnect.in.sec";t.GLIDE_AMB_HANDSHAKE_LIMIT_ENABLED="glide.amb.client.websocket_handshake_limit_enabled";t.CANCEL_TRANSACTION_CHANNEL="/service/transaction/cancel";t.CANCEL_TRANSACTION_ACTION="cancelTransaction";t.REQUEST_SUCCESS="200::Success";t.REQUEST_ACCEPTED="202::Request accepted";t.MISSING_REQUEST_DATA="400::Missing request data";t.MISSING_INTERACTION_ID="400::Missing nowUiInteractionId id";t.TRANSACTION_ALREADY_SUBMITTED="409::Transaction with nowUiInteraction has already been submitted for cancel";t.PUBLISH_FAILURE="503::Unable to publish message"},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=function(e){return e&&e.__esModule?e:{default:e}}(n(0));var o=function(e,t,n){var o,r,s=new i.default("amb.ChannelListener"),a=e;return{getCallback:function(){return r},getSubscriptionCallback:function(){return n},getID:function(){return o},setNewChannel:function(e){a.unsubscribe(this),a=e,this.subscribe(r)},subscribe:function(e){return r=e,o=a.subscribe(this),this},resubscribe:function(){return this.subscribe(r)},unsubscribe:function(){return a.unsubscribe(this),s.debug("Unsubscribed from channel: "+a.getName()),this},publish:function(e,t){a.publish(e,t)},publishAsync:function(e,t){a.publishAsync(e,t)},getName:function(){return a.getName()}}};t.default=o},function(e,t,n){"use strict";function i(e){"@babel/helpers - typeof";return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.isUndefined=t.isObject=t.isNull=t.isNil=t.isEmptyObject=void 0;var o=function(e){return void 0===e};t.isUndefined=o;var r=function(e){return null===e};t.isNull=r;t.isNil=function(e){return r(e)||o(e)};var s=function(e){return null!=e&&"object"===i(e)};t.isObject=s;t.isEmptyObject=function(e){return s(e)&&0===Object.keys(e).length}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=function(e){var t=[],n=0;return{subscribe:function(e,i){var o=n++;return t.push({event:e,callback:i,id:o}),o},unsubscribe:function(e){for(var n=0;n<t.length;n++)e===t[n].id&&t.splice(n,1)},publish:function(e,t){for(var n=this._getSubscriptions(e),i=0;i<n.length;i++)n[i].callback.apply(null,t)},getEvents:function(){return e},_getSubscriptions:function(e){for(var n=[],i=0;i<t.length;i++)t[i].event===e&&n.push(t[i]);return n}}};t.default=i},function(e,t,n){"use strict";function i(e){"@babel/helpers - typeof";return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=p(n(5)),r=p(n(0)),s=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!==i(e)&&"function"!=typeof e)return{default:e};var n=b(t);if(n&&n.has(e))return n.get(e);var o={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if("default"!==s&&Object.prototype.hasOwnProperty.call(e,s)){var a=r?Object.getOwnPropertyDescriptor(e,s):null;a&&(a.get||a.set)?Object.defineProperty(o,s,a):o[s]=e[s]}o.default=e,n&&n.set(e,o);return o}(n(1)),a=p(n(7)),u=p(n(8)),c=p(n(24)),l=n(4),d=p(n(25)),f=p(n(26)),g=p(n(27)),h=n(2);function b(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(b=function(e){return e?n:t})(e)}function p(e){return e&&e.__esModule?e:{default:e}}var m=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:new c.default,i=!1,b=!1,p=null,m=new o.default({CONNECTION_INITIALIZED:"connection.initialized",CONNECTION_OPENED:"connection.opened",CONNECTION_CLOSED:"connection.closed",CONNECTION_BROKEN:"connection.broken",SESSION_LOGGED_IN:"session.logged.in",SESSION_LOGGED_OUT:"session.logged.out",SESSION_INVALIDATED:"session.invalidated",SESSION_REESTABLISHED:"session.reestablished"}),v={SESSION_LOGGED_IN:"session.logged.in",SESSION_LOGGED_OUT:"session.logged.out",SESSION_INVALIDATED:"session.invalidated"},_="closed",y={},T={},C=new r.default("amb.ServerConnection");!function(){e.addListener("/meta/handshake",this,te),e.addListener("/meta/connect",this,ge),e.addListener("/meta/subscribe",this,ce),e.addListener("/meta/unsubscribe",this,re)}();var S=v.SESSION_INVALIDATED,E=null,w="true"===s.default.loginWindow,N=null,I={UNKNOWN_CLIENT:"402::Unknown client",UNKNOWN_SESSION:"402::session_unknown",NODE_MISMATCH:"websocket_http_node_mismatch",RECONNECT_REMEMBER_ME:"reconnect_remember_me_http_activity",HUP_SIGNAL:"reconnect_on_hup_signal"},O=!1,x={},M=!1,k=new a.default(e,x),A=!1,L="glide.amb.session.logout.overlay.style",R="glide.amb.redelivery.disconnect.timeout.in.mins",D="glide.amb.clear_node_affinity_cookie",B="glide.session.status",U="session.touch.http",P="amb.ServerConnection.reestablish.session",G="set.header.request.sent",F="request.reconnection",j=e.getExtension(s.TOKEN_MANAGEMENT_EXTENSION),q=null,H=new g.default(e),W=null,z=!0,V=null,Q=null,Y=null,K=null,X=null,J=t,$=[],Z=3e5,ee=3;function te(t){!function(t){if(he()){var n=new Date;$.push(n);for(var i=n-Z;$.length>0&&$[0]<i;)$.shift();var o=ne(t,h.GLIDE_AMB_HANDSHAKE_LIMIT_ENABLED);o&&$.length>=ee&&(C.addInfoMessage("Transport type will switch to long-polling in next connection error"),e.websocketEnabled=!1)}}(t),re(t),void 0!==ne(t,h.WS_CONNECTION_NODE_ID)&&(p=ne(t,h.WS_CONNECTION_NODE_ID),C.debug("Node Id from handshake callback initially set to "+p));var n=ne(t,L);n&&(s.default.overlayStyle=n);var i=ne(t,R);i&&(s.default.redeliveryDisconnectTimeoutInMins=i),void 0!==ne(t,D)&&(s.default.requestHeaderToClearStickySessionCookie=!0===ne(t,D)),S=ne(t,B),function(e){if(e.ext){var t=e.ext.subscribeCommandsFlow;if(t){var n=s.default.subscribeCommandsFlow;if(s.default.subscribeCommandsFlow.enable=function(e,t){var n=t;return(0,l.isNil)(e)||(n=!!e),n}(t.enable,n.enable),s.default.subscribeCommandsFlow.enable){s.default.subscribeCommandsFlow.retries=le(t.retries,n.retries),s.default.subscribeCommandsFlow.maxInflight=le(t.maxInflight,n.maxInflight),s.default.subscribeCommandsFlow.maxWait=le(t.maxWait,n.maxWait);var i=t.retryDelay;if(i){var o=s.default.subscribeCommandsFlow.retryDelay;s.default.subscribeCommandsFlow.retryDelay.min=le(i.min,o.min),s.default.subscribeCommandsFlow.retryDelay.max=le(i.max,o.max),s.default.subscribeCommandsFlow.retryDelay.increaseFactor=le(i.increaseFactor,o.increaseFactor)}}!function(){if(s.default.subscribeCommandsFlow.enable){C.addInfoMessage("_initializeSubscriptionCommandSender: SubscriptionCommandSender is enabled"),null!=j&&j.updateTokenCount(s.default.subscribeCommandsFlow.maxInflight),q&&q.stop();var e=window.location.protocol+"//"+window.location.host;q=new f.default(new d.default(1e4),j,J!==e)}}()}}}(t),setTimeout(function(){t.successful&&be()},0)}function ne(e,t){if((0,l.isObject)(e.ext))return e.ext[t]}function ie(t,n){if(t in y)return y[t];var i=new u.default(e,t,A,n);return y[t]=i,i}function oe(e){T[e]=y[e],delete y[e]}function re(t){if(t.ext){!1===t.ext["glide.amb.active"]&&x.disconnect();var n=ne(t,"glide.amb.client.log.level");n&&(s.default.logLevel=n,e.setLogLevel(s.default.logLevel)),s.default.pruneFailedTransports="false"!==ne(t,"glide.amb.pruneFailedTransports");var i=ne(t,"glide.amb.client.batch.logging.enabled");void 0!==i&&(s.default.batchLogging.enabled=!1!==i);var o=ne(t,"glide.amb.client.batch.logging.startTime");void 0!==o&&(s.default.batchLogging.startTime=o||null);var r=ne(t,"glide.amb.client.batch.logging.channels");void 0!==r&&(s.default.batchLogging.channels=r?r.split(",").map(function(e){return e.trim()}):[])}}function se(){null!==ae()&&(clearInterval(Q),Q=null,V=null,M=!0,N=I.RECONNECT_REMEMBER_ME,x.connect())}function ae(){if(void 0!==document.cookie)for(var e=document.cookie.split(";"),t=0;t<e.length;t++){var n=e[t].trim();if(n.startsWith("".concat(h.NODEID_COOKIE_KEY,"=")))return n.substring(h.NODEID_COOKIE_KEY.length+1)}return null}function ue(t){p=null,b=!0,e.disconnect(function(){C.addInfoMessage("Disconnected WS C