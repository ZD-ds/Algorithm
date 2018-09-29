

const LARGE_ARRAY_SIZE = 200
//iteratee和comparator没有用到，我们就直接忽略掉这些次要条件
function baseDifference(array, values, iteratee, comparator) {
    let includes = arrayIncludes
    let isCommon = true
    const result = []
    const valuesLength = values.length

    if (!array.length) {
        return result
    }
    //忽略
    if (iteratee) {
        values = map(values, (value) => iteratee(value))
    }
    if (comparator) {
        //忽略
        includes = arrayIncludesWith
        isCommon = false
    } else if (values.length >= LARGE_ARRAY_SIZE) {
        //断言数组的长度大于等于200时执行
        includes = cacheHas
        isCommon = false
        values = new SetCache(values)
    }
    // 标签语法 label : statement，方便以后调用
    outer:
    for (let value of array) {
        //上面的断言都不满足输入的条件，所以不会执行，代码在此for循环执行
        //遍历array，每次输出value
        const computed = iteratee == null ? value : iteratee(value)
        value = (comparator || value !== 0) ? value : 0
        if (isCommon && computed === computed) {
            //函数满足该断言的条件
            let valuesIndex = valuesLength //values的数组长度
            while (valuesIndex--) {
                //递减遍历
                if (values[valuesIndex] === computed) {
                    //执行标签
                    continue outer
                }
            }
            //将满足条件的value插入数组
            result.push(value)
        }
        else if (!includes(values, computed, comparator)) {
            //不满足条件，不执行
            result.push(value)
        }
    }
    //返回结果
    return result
}

function isArrayLikeObject(value) {
    //同时满足2个条件即返回true
    return isObjectLike(value) && isArrayLike(value)
}
function isObjectLike(value) {
    return typeof value == 'object' && value !== null
}
function isArrayLike(value) {
    return value != null && typeof value != 'function' && isLength(value.length)
}
function difference(array, ...values) {
    //只要你传入的array是个数组或者类数组结构，就执行baseDifference函数
    return isArrayLikeObject(array)
        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
        : []
}
export default difference



//创建一个具有唯一array值的数组，每个值不包含在其他给定的数组中。
_.difference([3, 2, 1], [4, 2]);
// => [3, 1]