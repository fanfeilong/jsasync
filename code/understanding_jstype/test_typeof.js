const { check, typedef, typeerror } = require('./typeof');

let err;

[err] = check.int(10);
console.assert(err===typeerror.RESULT_OK);
console.log('check pass:',`check.int(10)`);

[err] = check.int('10');
console.assert(err===typeerror.RESULT_INVALID_PARAM);
console.log('check pass:',`check.int('10')`);

[err] = check.string('10');
console.assert(err===typeerror.RESULT_OK);
console.log('check pass:',`check.string('10')`);

[err] = check.string(10);
console.assert(err===typeerror.RESULT_INVALID_PARAM);
console.log('check pass:',`check.string(10)`);

[err] = check.string({});
console.assert(err===typeerror.RESULT_INVALID_PARAM);
console.log('check pass:',`check.string({})`);

[err] = check.string([]);
console.assert(err===typeerror.RESULT_INVALID_PARAM);
console.log('check pass:',`check.string([])`);

[err] = check.string(null);
console.assert(err===typeerror.RESULT_INVALID_PARAM);
console.log('check pass:',`check.string(null)`);

[err] = check.string_or_null(null);
console.assert(err===typeerror.RESULT_OK);
console.log('check pass:',`check.string_or_null(null)`);

const constantDef = {
    a: 1,
    b: 2
};

[err] = check.object({
    a: 1,
    b: '19',
    c: [1,2],
    d: {
        m: 1,
        n: []
    },
    e: constantDef.a,
},{
    a: typedef.int,
    b: typedef.string,
    c: { array: [typedef.int]},
    d: {
        m: typedef.int,
        n: {array: [typedef.int_or_null]}
    },
    e: {constant: constantDef},
});
console.assert(err===typeerror.RESULT_OK);
console.log('check pass:',`
check.object({
    a: 1,
    b: '19',
    c: [1,2],
    d: {
        m: 1,
        n: []
    },
    e: constantDef.a,
},{
    a: typedef.int,
    b: typedef.string,
    c: { array: [typedef.int]},
    d: {
        m: typedef.int,
        n: {array: [typedef.int_or_null]}
    },
    e: {constant: constantDef},
});
`);
