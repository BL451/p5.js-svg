define(function(require) {
    var p5 = require('p5');
    require('p5.svg');
    var assert = require('chai').assert;

    describe('IO', function() {
        describe('IO/saveSVG', function() {
            new p5(function(p) {
                p.setup = function() {
                    p.createSVG(100, 100);
                    p.background(255);
                    p.stroke(0, 0, 0);
                    p.line(0, 0, 100, 100);

                    var testDownload = function(filename, ext, fn, done) {
                        var _downloadFile = p.downloadFile;
                        p.downloadFile = function(dataURL, _filename, _ext) {
                            try {
                                assert.notEqual(dataURL.indexOf('image/octet-stream'), -1);
                                assert.equal(_filename, filename);
                                assert.equal(_ext, ext);
                                p.downloadFile = _downloadFile;
                                done();
                            } catch(e) {
                                done(e);
                            }
                        };
                        fn();
                    };

                    it('should save untitled.svg', function(done) {
                        testDownload('untitled', 'svg', function() {
                            p.saveSVG();
                        }, done);
                    });
                    it('should save hello.svg', function(done) {
                        testDownload('hello', 'svg', function() {
                            p.saveSVG('hello.svg');
                        }, done);
                    });
                    it('should save hello.jpg', function(done) {
                        testDownload('hello', 'jpg', function() {
                            p.saveSVG('hello', 'jpg');
                        }, done);
                    });
                    it('should save hello.jpeg', function(done) {
                        testDownload('hello', 'jpeg', function() {
                            p.saveSVG('hello.jpeg');
                        }, done);
                    });
                    it('should save hello.png', function(done) {
                        testDownload('hello', 'png', function() {
                            p.saveSVG('hello.png');
                        }, done);
                    });
                };
            });
        });
    });
});