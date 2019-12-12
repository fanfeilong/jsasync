

## examples to understanding javascript `async`.

* [understanding_async_01](https://github.com/fanfeilong/jsasync/blob/master/code/understanding_async/understanding_async_01.js)
* [understanding_async_02](https://github.com/fanfeilong/jsasync/blob/master/code/understanding_async/understanding_async_02.js)
* [understanding_async_03](https://github.com/fanfeilong/jsasync/blob/master/code/understanding_async/understanding_async_03.js)
* [understanding_async_04](https://github.com/fanfeilong/jsasync/blob/master/code/understanding_async/understanding_async_04.js)
* [understanding_async_05](https://github.com/fanfeilong/jsasync/blob/master/code/understanding_async/understanding_async_05.js)
* [understanding_async_06](https://github.com/fanfeilong/jsasync/blob/master/code/understanding_async/understanding_async_06.js)
* [understanding_async_07](https://github.com/fanfeilong/jsasync/blob/master/code/understanding_async/understanding_async_07.js)
* [understanding_async_08](https://github.com/fanfeilong/jsasync/blob/master/code/understanding_async/understanding_async_08.js)
* [understanding_async_09](https://github.com/fanfeilong/jsasync/blob/master/code/understanding_async/understanding_async_09.js)
* [understanding_async_10](https://github.com/fanfeilong/jsasync/blob/master/code/understanding_async/understanding_async_10.js)
* [understanding_async_11](https://github.com/fanfeilong/jsasync/blob/master/code/understanding_async/understanding_async_11.js)
* [understanding_async_12](https://github.com/fanfeilong/jsasync/blob/master/code/understanding_async/understanding_async_12.js)
* [understanding_async_13](https://github.com/fanfeilong/jsasync/blob/master/code/understanding_async/understanding_async_13.js)
* [understanding_async_14](https://github.com/fanfeilong/jsasync/blob/master/code/understanding_async/understanding_async_14.js)


## examples to understanding javascript type
* [typeof](https://github.com/fanfeilong/jsasync/blob/master/code/understanding_jstype/typeof.js)
* [test_typeof](https://github.com/fanfeilong/jsasync/blob/master/code/understanding_jstype/test_typeof.js)

useable:
```javascript
check.int(1); 

check.array.int([1,2,3])

check.object({ 
   a: '10',
   b: [10],
   c: 1,
   d: { a:1 },
   e: null,
   f: null,
   g: null,
}, {
   a:typedef.int,
   b: {array:[typedef.int]}, 
   c: {constant: {a:1,b:2}}, 
   d: {
       a: typedef.int
   },
   e: typedef.int_or_null, 
   f: {array:[int], nullable:true},
   g: {nullable:true, a:typedef.int, b:typedef.string}
});
```

## references
* [json-schema](https://json-schema.org/learn/getting-started-step-by-step.html)
