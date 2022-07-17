

exports.objSum = (data, field) => {
    return sumValues = data.map(item => item[`${field}`]).reduce((prev, next) => prev + next);
};

exports.phoneNumber = (number) => {
    const regexPhoneNumber = /^[0-9]{10}$/
    if (number.match(regexPhoneNumber)) {
        return true;
    } else {
        return false;
    }

}