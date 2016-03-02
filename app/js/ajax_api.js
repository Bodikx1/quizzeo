function APIRequestManager(baseURI, timeout, suffix){
    this.baseURI = baseURI;
    if(suffix)
        this.suffix = suffix;
    else
        this.suffix = '';
    if(timeout)
        this.timeout = timeout;
    else
        this.timeout = 6000;
}

APIRequestManager.prototype.getHeaders = function() {
    return {"X-CodeHero-Token": 'access_0ebba079a0c160d97029b83cd48d03bfca253e00'};
};

APIRequestManager.prototype.get = function(callback, URI, parameters, options) {
    return this.ajax(callback, URI, 'get', options, parameters)
};
APIRequestManager.prototype.patch = function(callback, URI, parameters, options) {
    return this.ajax(callback, URI, 'patch', options, parameters)
};
APIRequestManager.prototype.post = function(callback, URI, parameters, GETparams, options) {
    return this.ajax(callback, URI, 'post', options, parameters, GETparams)
};
APIRequestManager.prototype.delete = function(callback, URI, parameters, GETparams, options) {
    return this.ajax(callback, URI, 'delete', options, parameters, GETparams)
};
APIRequestManager.prototype.put = function(callback, URI, parameters, GETparams, options) {
    if(!parameters) {
        parameters = null;
    }
    return this.ajax(callback, URI, 'put', options, parameters, GETparams)
};

APIRequestManager.prototype.ajax = function(callback, URI, method, options, parameters, GETparams) {
    if(GETparams) {
        GETparams = jQuery.param(GETparams);
        GETparams = "?" + GETparams;
    } else {GETparams = ""}

    var response = {},
        ajaxError,
        HTTPError,

        defaultOptions = {
            url:        this.baseURI + this.suffix + URI + GETparams,
            method:     method,
            async:      true,
            data:       parameters ? JSON.stringify(parameters) : null,
            timeout:    this.timeout,
            contentType: "application/json; charset=utf-8",
            headers: this.getHeaders(),
            success: function (data) {
                response.data = data;
                response.response = response.data.responseText;
                try{
                    response.JSONresponse = JSON.parse(response.response);
                }catch(e){
                    response.JSONresponse = false;
                }
                callback && typeof callback === "function" && callback(response);
            },
            error: function (msg, error, HTTPErr) {
                response.ajaxError = error;
                response.HTTPError = HTTPErr;
                response.response = msg.responseText;
                response.JSONresponse = msg.responseJSON;

                callback && typeof callback === "function" && callback(response);
            }
        };

    // if no custom error handler, global error message handler will be added:
    if(!options || !options.error) {
        options = $.extend(options, {
            error: function (response) {
                if (response.responseJSON
                    && response.responseJSON.status === 'error'
                    && response.responseJSON.msg) {
                    swal("Error...", response.responseJSON.msg, "error");
                } else {
                    swal("Oops...", "Something went wrong!", "error");
                }
            }
        });
    }

    return jQuery.ajax($.extend({}, defaultOptions, options || {}));
};

var mainAPI = new APIRequestManager(window.API_ENDPOINT || "http://prod.ppsi.purprojet.com"); // http://preprod.ppsi.purprojet.com/
var selfAPI = new APIRequestManager(location.protocol+'//'+window.location.hostname+':'+window.location.port+'/', 10000, 'api');
