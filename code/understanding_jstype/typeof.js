const ErrorCode = {
    RESULT_OK: 0,
    RESULT_INVALID_PARAM: 1,
};

function isInt(value) {
    var x;
    return isNaN(value) ? !1 : (x = parseFloat(value), (0 | x) === x);
}

class TypeArray{
    static is(v, t){
        if(!Array.isArray(t)){
            return [ErrorCode.RESULT_INVALID_PARAM];
        }

        const e = t[0];

        // array of object
        if(typeof e==='object'){
            for(const i of v){
                if(Type.object(i, e)[0]===0){
                    return [ErrorCode.RESULT_INVALID_PARAM];
                }
            }
            return [ErrorCode.RESULT_OK];
        }

        // array of primitive
        switch(e){
            case TypeDefine.string: return TypeArray.string(v);
            case TypeDefine.number: return TypeArray.number(v);
            case TypeDefine.int: return TypeArray.int(v);
            case TypeDefine.boolean: return TypeArray.boolean(v);
            case TypeDefine.date: return TypeArray.date(v);

            case TypeDefine.string_or_null: return TypeArray.string_or_null(v);
            case TypeDefine.number_or_null: return TypeArray.number_or_null(v);
            case TypeDefine.int_or_null: return TypeArray.int_or_null(v);
            case TypeDefine.boolean_or_null: return TypeArray.boolean_or_null(v);
            case TypeDefine.date_or_null: return TypeArray.date_or_null(v);

            default: return [ErrorCode.RESULT_INVALID_PARAM];
        }
    }

    static string(v){
        if(!Array.isArray(v)){
            console.error(`${v} is not array, input type is ${typeof v}`);
            return [ErrorCode.RESULT_INVALID_PARAM];
        }
        for(const i of v){
            if(Type.string(i)[0]!==0){
                return [ErrorCode.RESULT_INVALID_PARAM];
            }
        }
        return [ErrorCode.RESULT_OK];
    }

    static string_or_null(v){
        if(v==null){
            return [ErrorCode.RESULT_OK];
        }
        return TypeArray.string(v);
    }
    
    static boolean(v){
        if(!Array.isArray(v)){
            console.error(`${v} is not array, input type is ${typeof v}`);
            return [ErrorCode.RESULT_INVALID_PARAM];
        }
        for(const i of v){
            if(Type.boolean(i)[0]!==0){
                return [ErrorCode.RESULT_INVALID_PARAM];
            }
        }
        return [ErrorCode.RESULT_OK];
    }

    static boolean_or_null(v){
        if(v==null){
            return [ErrorCode.RESULT_OK];
        }
        return TypeArray.boolean(v);
    }

    static number(v){
        if(!Array.isArray(v)){
            console.error(`${v} is not array, input type is ${typeof v}`);
            return [ErrorCode.RESULT_INVALID_PARAM];
        }
        for(const i of v){
            if(Type.number(i)[0]!==0){
                return [ErrorCode.RESULT_INVALID_PARAM];
            }
        }
        return [ErrorCode.RESULT_OK];
    }

    static number_or_null(v){
        if(v==null){
            return [ErrorCode.RESULT_OK];
        }
        return TypeArray.number(v);
    }

    static int(v){
        if(!Array.isArray(v)){
            console.error(`${v} is not array, input type is ${typeof v}`);
            return [ErrorCode.RESULT_INVALID_PARAM];
        }
        for(const i of v){
            if(Type.int(i)[0]!==0){
                return [ErrorCode.RESULT_INVALID_PARAM];
            }
        }
        return [ErrorCode.RESULT_OK];
    }

    static int_or_null(v){
        if(v==null){
            return [ErrorCode.RESULT_OK];
        }
        return TypeArray.int(v);
    }

    static constant(v, c){
        if(!Array.isArray(v)){
            console.error(`${v} is not array, input type is ${typeof v}`);
            return [ErrorCode.RESULT_INVALID_PARAM];
        }
        for(const i of v){
            if(Type.constant(i, c)[0]!==0){
                return [ErrorCode.RESULT_INVALID_PARAM];
            }
        }
        return [ErrorCode.RESULT_OK];
    }

    static object(v, t){
    	if(t.length===0){
            return [ErrorCode.RESULT_INVALID_PARAM];
        }

    	if(t.length>=2 && t[1]==='o'){
    		if(v==null){
    			return [ErrorCode.RESULT_OK];
    		}
    	}

        if(!Array.isArray(v)){
            console.error(`${v} is not array, input type is ${typeof v}`);
            return [ErrorCode.RESULT_INVALID_PARAM];
        }

        const e = t[0];
        for(const i of v){
            if(Type.object(i, e)[0]!==0){
                return [ErrorCode.RESULT_INVALID_PARAM];
            }
        }
        return [ErrorCode.RESULT_OK];
    }
}

class Type{
    static string(v){
        if(typeof v==='string'){
            return [ErrorCode.RESULT_OK];
        }else{
            console.error(`${v} is not string, input type is ${typeof v}`);
            return [ErrorCode.RESULT_INVALID_PARAM];
        }
    }

    static string_or_null(v){
        if(v==null){
            return [ErrorCode.RESULT_OK];
        }
        return Type.string(v);
    }
    
    static boolean(v){
        if(typeof v==='boolean'){
            return [ErrorCode.RESULT_OK];
        }else{
            console.error(`${v} is not boolean, input type is ${typeof v}`);
            return [ErrorCode.RESULT_INVALID_PARAM];
        }
    }

    static boolean_or_null(v){
        if(v==null){
            return [ErrorCode.RESULT_OK];
        }
        return Type.boolean(v);
    }

    static number(v){
        if(typeof v==='number'){
            return [ErrorCode.RESULT_OK];
        }else{
            console.error(`${v} is not number, input type is ${typeof v}`);
            return [ErrorCode.RESULT_INVALID_PARAM];
        }
    }

    static number_or_null(v){
        if(v==null){
            return [ErrorCode.RESULT_OK];
        }
        return Type.number(v);
    }

    static int(v){
        if(typeof v==='number'){
            if(isInt(v)){
                return [ErrorCode.RESULT_OK];
            }else{
                console.error(`${v} is not a valid int`);
                return [ErrorCode.RESULT_INVALID_PARAM];
            }
        }else{
            console.error(`${v} is not int, input type is ${typeof v}`);
            return [ErrorCode.RESULT_INVALID_PARAM];
        }
    }

    static int_or_null(v){
        if(v==null){
            return [ErrorCode.RESULT_OK];
        }
        return Type.number(v);
    }

    static constant(v, c){
        if(typeof v==='number'){
            if(isInt(v)){
                for(const key in c){
                    const value = c[key];
                    if(value===v){
                        return [ErrorCode.RESULT_OK];
                    }
                }
            }
        }

        console.error(`${v} is not in constant, input type is ${typeof v}, constants:${JSON.stringify(c)}`);
        return [ErrorCode.RESULT_INVALID_PARAM];
    }

    static date(d){
        if (Object.prototype.toString.call(d) === "[object Date]") {
            // it is a date
            if (isNaN(d.getTime())) {  // d.valueOf() could also work
              // date is not valid
              return [ErrorCode.RESULT_INVALID_PARAM];
            } else {
              // date is valid
              return [ErrorCode.RESULT_OK];
            }
          } else {
            // not a date
            console.error(`${d} is not date, input type is ${typeof v}`);
            return [ErrorCode.RESULT_INVALID_PARAM];
          }
    }

    static date_or_null(d){
        if(d==null){
            return [ErrorCode.RESULT_OK];
        }
        return Type.date(d);
    }

    static is(v, t){
        if(typeof t==='object'){

            if(t.nullable){
                if(v==null){
                    return [ErrorCode.RESULT_OK];
                }
            }

            // object/array
            if(t.array){
                return TypeArray.is(v, t.array);
            }

            // object/constant
            if(t.constant){
                return Type.constant(v, t.constant, t.nullable);
            }
            
            // object
            return Type.object(v,t);
        }

        // primitive
        switch(t){
            case TypeDefine.string: return Type.string(v);
            case TypeDefine.number: return Type.number(v);
            case TypeDefine.int: return Type.int(v);
            case TypeDefine.boolean: return Type.boolean(v);
            case TypeDefine.date: return Type.date(v);

            case TypeDefine.string_or_null: return Type.string_or_null(v);
            case TypeDefine.number_or_null: return Type.number_or_null(v);
            case TypeDefine.int_or_null: return Type.int_or_null(v);
            case TypeDefine.boolean_or_null: return Type.boolean_or_null(v);
            case TypeDefine.date_or_null: return Type.date_or_null(v);

            default: return [ErrorCode.RESULT_INVALID_PARAM];
        }
    }

    static object(v, t){

        if( typeof t!=='object'){
            return [ErrorCode.RESULT_INVALID_PARAM];
        }

        // object is nullable
        if(v==null){
            if(t.nullable){
                return [ErrorCode.RESULT_OK];
            }else{
                return [ErrorCode.RESULT_INVALID_PARAM];
            }
        }
        
        for(const k in t){
            const i = v[k];
            const e = t[k];
            if(Type.is(i, e)[0]!==0){
                return [ErrorCode.RESULT_INVALID_PARAM];
            }
        }

        return [ErrorCode.RESULT_OK];
    }

    static get array(){
        return TypeArray;
    }
}

const TypeDefine = {
    string: 0,
    number: 1,
    int: 2,
    boolean: 3,
    date: 4,

    constant: 5,
    array: 6,

    string_or_null: 10,
    number_or_null: 11,
    int_or_null: 12,
    boolean_or_null: 13,
    date_or_null: 14,
};

module.exports = {
    check: Type,
    typedef: TypeDefine,
    typeerror: ErrorCode,
};