if (!hexo.config.lazyload || !hexo.config.lazyload.enable) {
    return;
}

global.cdnconfig = hexo.config.lazyload.cdn;

if (hexo.config.lazyload.onlypost) {
    hexo.extend.filter.register('after_post_render', processPost);
}
else {
    hexo.extend.filter.register('after_render:html', processSite);
}

function lazyProcess(htmlContent) {
    return htmlContent.replace(/<img(.*?)src="(.*?)"(.*?)>/gi, function (str, p1, p2) {
        // might be duplicate
        if(/loading=/gi.test(str)){
            return str;
        }
        if(/src="data:image(.*?)/gi.test(str)) {
            return str;
        }
        if(/no-lazy/gi.test(str)) {
            return str;
        }
        if (cdnconfig.enabled && p2.indexOf("http") !== 0) {
            var srcreal = cdnconfig.url+p2;
        } else {
            var srcreal = p2;
        }
        return str.replace(p2, srcreal + '" loading="lazy');
    });
}

function processPost(data) {
    data.content = lazyProcess.call(this, data.content);
    return data;
}

function processSite(htmlContent) {
    return lazyProcess.call(this, htmlContent);
}
