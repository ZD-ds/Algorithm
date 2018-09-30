function dropWhile(array, predicate) {
    return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3), true)
        : [];
}
//这个函数和dropRightWhile大致相同，唯一不同是baseWhile没有第四个参数表示从右边遍历
