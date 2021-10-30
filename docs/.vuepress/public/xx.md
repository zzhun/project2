## 参数 r

### env

- type: `String`
- required: `true`

环境变量

| 参数   | 说明     |
| ------ | -------- |
| `dev`  | 测试环境 |
| `test` | 测试环境 |
| `prod` | 生产环境 |

### editorConfig

- type:`Object`
- required:`false`
- default: `默认以下配置,详情请查看百度编辑器配置`

```javascript
    editorConfig: {
        toolbars: [
            [
            'fullscreen', 'forecolor', 'bold', 'italic', 'underline',  'backcolor',
            'removeformat', 'formatmatch', 'pasteplain', 'insertorderedlist',
            'insertunorderedlist', 'selectall',  'cleardoc', 'link', 'unlink',
                'insertimage', 'undo', 'redo'
            ]
        ],
        //focus时自动清空初始化时的内容
        autoClearinitialContent: false,
        //关闭字数统计
        wordCount: true,
        //关闭elementPath
        elementPathEnabled: false,
        //默认的编辑区域高度
        initialFrameHeight: 300,
        // 百度编辑器初始化内容
        //  baiduUeditorPlaceHolder:"",
        // 百度编辑器实例化错误
        error: function() {
        }
    }
```

### wrapperAttrs

- type:`Object`
- required:`false`

最外部容器属性，不传则默认带部分原简单定位的样式

```javascript
    //配置如下
     wrapperAttrs: {
        class: 'className1 className2',  //字符串,class用空格分隔
        //style: 'color:red;font-size:12px'   //可传字符串，字符串用;分割
        style:{
            'color':'red',
            'font-size':'12px'
        }            //可传对象
    },

```

### buttons

- type:`Array`
- required:`true`

生成右下角按钮，默认显示方形按钮

```javascript
[
  // 有两种默认功能样式
  {
    type: "Feedback", //可以直接生成问题反馈按钮，点击打开问题反馈的页面
  },
  {
    type: "Principal", //可以直接生成各线负责人按钮，
  },

  //自定义
  {
    title: "", //设置鼠标移上去显示的title
    style: "", //样式可传字符串或对象
    link: "", //设置跳转链接，如果定义了这个属性，则不会执行onClick事件
    onClick({ openFeedpage, feedpageIframeUrl }) {
      // openFeedpage type:Function，直接执行 等于window.open(feedpageIframeUrl)
      // feedpageIframeUrl 生成的问题反馈链接
      openFeedpage();
      // feedpageIframeUrl = feedpageUrl + '?iframe=1'
      // 内部通过该参数判断通过 window.parent 或 window.opener 查找 __feedback
      // 用户其他自定义的打开 iframe 的方法
      // otherOpenIframeMethod(feedpageUrl)
    },
  },
];
```

### extFields

- type:`Array`
- required:`false`

生成页面上的扩展字段控件,只有 4 种类型可选，

```javascript
[
  // 如果设置value时需要延时的话，可以通过下面value()函数执行done事件加入，下面分别代表 所属系统、菜单路径、浏览器、当前登录人，如果不传则不会生成该字段
  {
    label: "所属系统",
    name: "system",
    // tooltip: '',
    // value: 'PMC服装生产系统',
    value(done) {
      setTimeout(function () {
        done("PMC服装生产系统");
      });
    },
  },
  {
    name: "menu",
    // options:  [
    //   {
    //     value: '选项1',
    //     label: '黄金糕'
    //   },
    //   {
    //     value: '选项2',
    //     label: '双皮奶'
    //   },
    //   {
    //     value: '选项3',
    //     label: '蚵仔煎'
    //   },
    //   {
    //     value: '选项4',
    //     label: '龙须面'
    //   },
    //   {
    //     value: '选项5',
    //     label: '北京烤鸭'
    //   }
    // ],
    options(done) {
      setTimeout(function () {
        done([
          {
            value: "报表-业务报表",
            label: "报表-业务报表",
          },
          {
            value: "订单-订单付款查询",
            label: "订单-订单付款查询",
          },
          {
            value: "系统管理-系统管理",
            label: "系统管理-系统管理",
          },
          {
            value: "仓储-返修管理",
            label: "仓储-返修管理",
          },
          {
            value: "仓储-转仓处理",
            label: "仓储-转仓处理",
          },
        ]);
      });
    },
  },
  "browser",
  "currentUser",
];
```

### message

- type:`Object`
- required:`false`

提示方式，为了与外部 UI 框架相结合, 实现自定义提示，如 oa 系统可调用 window.top.scbui.message 实现顶层 message 提示，可不传，一般用 iframe 内嵌页面的时候使用，默认内置 element-ui 的 message 提示

```javascript
    {
        success: function(error) {
            console.log(error)
        },
        //  info: function(error) {},
        //  error: function(error) {},
        //  warning: function(error) {}}
    }
```

### beforeSubmit

- type: `Function`
- required: `false`

提交前进行数据处理

```javascript
 beforeSubmit: function(data) {
     //对数据进行操作
   return data
 },

```

### succeeCallBack

- type: `Function`
- required: `false`

成功提交问题反馈后的回调事件，会有默认的两个参数，sendRobotMessage：发送机器人的事件，data：提交问题反馈成功后的 result

```javascript
 succeeCallBack:function(sendRobotMessage, data){
  sendRobotMessage({
    common_id:"robot_public",
    common_item_id:"002",
    json:JSON.stringify(data.data.Bug)
  })
 }
```

### close

- type: `Function`
- required:`false`

用于传入 iframe 关闭的方法

## 2323
