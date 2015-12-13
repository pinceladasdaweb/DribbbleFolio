/*jslint browser: true*/
/*global define, module, exports*/
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.DribbbleFolio = factory();
    }
}(this, function () {
    "use strict";

    if (!(Function.prototype.hasOwnProperty('bind'))) {
        Function.prototype.bind = function () {
            var fn = this, context = arguments[0], args = Array.prototype.slice.call(arguments, 1);
            return function () {
                return fn.apply(context, args.concat(Array.prototype.slice.call(arguments)));
            };
        };
    }

    var DribbbleFolio = function (options) {
        if (!this || !(this instanceof DribbbleFolio)) {
            return new DribbbleFolio(options);
        }

        if (!options) {
            options = {};
        }

        if (!options.username) {
            throw 'Please, provide a username!';
        }

        this.username  = options.username;
        this.counter   = options.counter;
        this.container = document.querySelector('#shots');
        this.endpoint  = './request.php';

        this.fetch();
    };

    DribbbleFolio.prototype = {
        fetch: function () {
            var endpoint = this.endpoint + '?',
                data     = {
                    username: this.username,
                    counter: this.counter
                };

            this.loading();

            this.getJSON(endpoint + this.param(data), this.attach.bind(this), this.failure.bind(this));
        },
        param: function (obj) {
            var encodedString = '',
                prop;

            for (prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    if (encodedString.length > 0) {
                        encodedString += '&';
                    }
                    encodedString += encodeURI(prop + '=' + obj[prop]);
                }
            }

            return encodedString;
        },
        getJSON: function (path, success, fail) {
            var xhttp = new XMLHttpRequest();

            xhttp.open('GET', path, true);
            xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhttp.setRequestHeader('Content-type', 'application/json');
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if ((this.status >= 200 && this.status < 300) || this.status === 304) {
                        var response = JSON.parse(this.responseText);

                        success.call(this, response);
                    } else {
                        fail.call(this, this.responseText);
                    }
                }
            };
            xhttp.send();
            xhttp = null;
        },
        supportsSvg: function() {
            return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");
        },
        create: function (name, props) {
            var el = document.createElement(name), p;
            for (p in props) {
                if (props.hasOwnProperty(p)) {
                    el[p] = props[p];
                }
            }
            return el;
        },
        loading: function () {
            if (!this.supportsSvg()) {
                var loading = document.querySelector('.loading');
                loading.setAttribute("src" , './assets/css/img/loading.gif');
            }
        },
        shot: function (data) {
            var projectUrl   = data.html_url,
                projectName  = document.createTextNode(data.title),
                projectTitle = data.title,
                projectImg   = data.images.hidpi,
                elements     = document.createDocumentFragment(),
                col, grid, overlay, link, linkHover, h2, img;

            col       = this.create('div', {className: 'col-sm-6 col-md-4 col-lg-4'});
            grid      = this.create('div', {className: 'grid-list'});
            overlay   = this.create('div', {className: 'overlay'});
            link      = this.create('a', {href: projectUrl, target: '_blank'});
            linkHover = this.create('a', {href: projectUrl, target: '_blank'});
            h2        = this.create('h2');
            img       = this.create('img', {className: 'img-responsive', src: projectImg});

            col.appendChild(grid);
            grid.appendChild(link);
            grid.appendChild(overlay);
            link.appendChild(img);
            h2.appendChild(projectName);
            linkHover.appendChild(h2);
            overlay.appendChild(linkHover);

            elements.appendChild(col);
            this.container.appendChild(elements.cloneNode(true));
        },
        shots: function (data) {
            var loading = document.querySelector('.loading'), i, len;
            this.container.removeChild(loading);

            for (i = 0, len = data.length; i < len; i += 1) {
                this.shot(data[i]);
            }
        },
        attach: function (data) {
            if (data.status === '404' || data.message === 'Bad credentials.') {
                this.failure();
            } else {
                this.shots(data);
            }
        },
        failure: function (data) {
            var loading  = document.querySelector('.loading'),
                elements = document.createDocumentFragment(),
                error    = document.createTextNode('An error ocurred. Try again later.'),
                p        = this.create('p', {className: 'alert alert-danger response-error'});

            p.appendChild(error);
            elements.appendChild(p);

            this.container.removeChild(loading);
            this.container.appendChild(elements);
        }
    };

    return DribbbleFolio;
}));