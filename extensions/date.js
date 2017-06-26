
module.exports = {
    stringToUkDate: function (dateString) {
        var split = dateString.split('/');
        if (split.length !== 3) {
            throw 'Invalid date input';
        }
        var month = split[1] - 1;
        return new Date(split[2], month, split[0]);
    }
}

