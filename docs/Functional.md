# 函数式组件

> 没有管理任何状态，也没有监听任何传递给它的状态，也没有生命周期方法，它只是一个接受一些 prop 的函数。简单来说是 一个无状态和无实例的组件

## 代码部分

- 普通组件

```javascript
<template>
  <div class="cell">
    <div v-if="value" class="on"></div>
    <section v-else class="off"></section>
  </div>
</template>

<script>
export default {
  props: ['value'],
}
</script>
```

- 函数式组件

```javascript
<template functional>
  <div class="cell">
    <div v-if="props.value" class="on"></div>
    <section v-else class="off"></section>
  </div>
</template>
```

## 两者对比的性能

在父组件各渲染优化前后的组件 800 个，并在每一帧内部通过修改数据来触发组件的更新，开启 Chrome 的 Performance 面板记录它们的性能。

- 普通组件：

![优化后](/images/Functional/普通组件1.png)

- 函数式组件：

![优化前](/images/Functional/函数式组件1.png)

对比这两张图我们可以看到优化前执行 script 的时间要多于优化后的，而我们知道 JS 引擎是单线程的运行机制，JS 线程会阻塞 UI 线程，所以当脚本执行时间过长，就会阻塞渲染，导致页面卡顿。而优化后的 script 执行时间短，所以它的性能更好。

## 原因分析

普通组件：

![优化后](/images/Functional/普通组件2.png)

函数式组件：

![优化前](/images/Functional/函数式组件2.png)

通过上述两个图的分析，函数式组件在 patch 的时候，比普通函数少执行了几个方法，这个是因为什么呢 ?

- 函数式组件和普通的对象类型的组件不同，它不会被看作成一个真正的组件

- 函数式组件没有状态、响应式数据、生命周期钩子函数这些东西。

- 在 patch 过程中，如果遇到一个节点是组件 vnode，会递归执行子组件的初始化过程；而函数式组件的 render 生成的是普通的 vnode，不会有递归子组件的过程，因此渲染开销会低很多。
