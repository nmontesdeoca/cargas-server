require('ejs').filters.date = function (date) {
    return date ?
        date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() :
        '';
};
