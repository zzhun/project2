# v-if 和 v-show

## 介绍

这两个都是vue用来做条件渲染的，那有什么区别呢，vue官网上对两者的解释：

- v-if

v-if 指令用于条件性地渲染一块内容。

- v-show

v-show 只是简单地切换元素的 CSS property display。

那这两者会有什么性能上的区别呢？

## 性能分析

- v-if组件

```javascript
<template functional>
  <div class="cell">
    <div v-if="props.value" class="on">
      <Heavy :n="10000"/>
    </div>
    <section v-else class="off">
      <Heavy :n="10000"/>
    </section>
  </div>
</template>
```
- v-show组件

```javascript
<template functional>
  <div class="cell">
    <div v-show="props.value" class="on">
      <Heavy :n="10000"/>
    </div>
    <section v-show="!props.value" class="off">
      <Heavy :n="10000"/>
    </section>
  </div>
</template>
```

在父组件各渲染这两种的组件 200 个，得到如下结果：

- v-if

![v-if](/images/v-if和v-show/v-if.png)

- v-show：

![v-show](/images/v-if和v-show/v-show.png)

通过上面两张图，v-show的script 的时间要明显少于v-if的，因此性能体验更好

## 原因分析

当条件 props.value 的值变化的时候，会触发对应的组件更新

- 对于 v-if 渲染的节点，由于新旧节点 vnode 不一致，在核心 diff 算法比对过程中，会移除旧的 vnode 节点，创建新的 vnode 节点，那么就会创建新的 Heavy 组件，又会经历 Heavy 组件自身初始化、渲染 vnode、patch 等过程。使用 v-if 每次更新组件都会创建新的 Heavy 子组件，当更新的组件多了，自然就会造成性能压力。

- 对于 v-show 渲染的节点，由于新旧 vnode 一致，它们只需要一直 patchVnode 即可，在 patchVnode 过程中，内部会对执行 v-show 指令对应的钩子函数 update，根据 v-show 指令绑定的值来设置它作用的 DOM 元素的 style.display 的值控制显隐

相比于 v-if 不断删除和创建函数新的 DOM，v-show 仅仅是在更新现有 DOM 的显隐值，所以 v-show 的开销要比 v-if 小的多，当其内部 DOM 结构越复杂，性能的差异就会越大。

## 使用场景

那是不是v-show性能好，就一直使用v-show呢？

答案：并不是一直使用v-show就好

v-show 相比于 v-if 的性能优势是在组件的更新阶段，如果仅仅是在初始化阶段，v-if 性能还要高于 v-show。

原因是在于它仅仅会渲染一个分支，而 v-show 把两个分支都渲染了，通过 style.display 来控制对应 DOM 的显隐。

在使用 v-show 的时候，所有分支内部的组件都会渲染，对应的生命周期钩子函数都会执行，而使用 v-if 的时候，没有命中的分支内部的组件是不会渲染的，对应的生命周期钩子函数都不会执行。

- vue官网也对其进行了对比

![区别](/images/v-if和v-show/区别.png)

