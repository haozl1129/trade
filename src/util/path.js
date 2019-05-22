import urls from '@/config/url_enum.js';

module.exports = {
    onPath(path, isBefore = true) {
        if (isBefore) {
            this.$router.push({
                path: '/' + path
            });
        } else {
            window.top.location.href = location.origin + '/' + urls[path];
        }
    }
};
