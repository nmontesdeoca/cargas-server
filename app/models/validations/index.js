/*
{PATH} is replaced with the invalid document path
{VALUE} is replaced with the invalid value
{TYPE} is replaced with the validator type such as "regexp", "min", or "user defined"
{MIN} is replaced with the declared min value for the Number.min validator
{MAX} is replaced with the declared max value for the Number.max validator
*/

exports.empty = function (obj) {
    return obj;
};

exports.email = /\b[a-zA-Z0-9._%+-\.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/;