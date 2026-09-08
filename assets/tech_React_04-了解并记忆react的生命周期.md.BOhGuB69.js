import{_ as s,c as a,o as e,al as p}from"./chunks/framework.QMC68jD7.js";const m=JSON.parse('{"title":"react的生命周期函数","description":"","frontmatter":{},"headers":[],"relativePath":"tech/React/04-了解并记忆react的生命周期.md","filePath":"tech/React/04-了解并记忆react的生命周期.md","lastUpdated":1777271852000}'),l={name:"tech/React/04-了解并记忆react的生命周期.md"};function r(t,n,c,o,i,b){return e(),a("div",null,[...n[0]||(n[0]=[p(`<h1 id="react的生命周期函数" tabindex="-1">react的生命周期函数 <a class="header-anchor" href="#react的生命周期函数" aria-label="Permalink to &quot;react的生命周期函数&quot;">​</a></h1><h2 id="_1-react所有的生命周期函数" tabindex="-1">1. react所有的生命周期函数 <a class="header-anchor" href="#_1-react所有的生命周期函数" aria-label="Permalink to &quot;1. react所有的生命周期函数&quot;">​</a></h2><p><a href="https://react.docschina.org/docs/react-component.html" target="_blank" rel="noreferrer">https://react.docschina.org/docs/react-component.html</a></p><h4 id="挂载" tabindex="-1">挂载 <a class="header-anchor" href="#挂载" aria-label="Permalink to &quot;挂载&quot;">​</a></h4><p>当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：</p><ul><li><a href="https://react.docschina.org/docs/react-component.html#constructor" target="_blank" rel="noreferrer"><strong>constructor()</strong></a></li><li><a href="https://react.docschina.org/docs/react-component.html#static-getderivedstatefromprops" target="_blank" rel="noreferrer"><code>static getDerivedStateFromProps()</code></a></li><li><a href="https://react.docschina.org/docs/react-component.html#render" target="_blank" rel="noreferrer"><strong>render()</strong></a></li><li><a href="https://react.docschina.org/docs/react-component.html#componentdidmount" target="_blank" rel="noreferrer">componentDidMount()</a></li></ul><h4 id="更新" tabindex="-1">更新 <a class="header-anchor" href="#更新" aria-label="Permalink to &quot;更新&quot;">​</a></h4><p>当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：</p><ul><li><a href="https://react.docschina.org/docs/react-component.html#static-getderivedstatefromprops" target="_blank" rel="noreferrer"><code>static getDerivedStateFromProps()</code></a></li><li><a href="https://react.docschina.org/docs/react-component.html#shouldcomponentupdate" target="_blank" rel="noreferrer"><code>shouldComponentUpdate()</code></a></li><li><a href="https://react.docschina.org/docs/react-component.html#render" target="_blank" rel="noreferrer"><strong>render()</strong></a></li><li><a href="https://react.docschina.org/docs/react-component.html#getsnapshotbeforeupdate" target="_blank" rel="noreferrer"><code>getSnapshotBeforeUpdate()</code></a></li><li><a href="https://react.docschina.org/docs/react-component.html#componentdidupdate" target="_blank" rel="noreferrer"><strong>componentDidUpdate()</strong></a></li></ul><h4 id="卸载" tabindex="-1">卸载 <a class="header-anchor" href="#卸载" aria-label="Permalink to &quot;卸载&quot;">​</a></h4><p>当组件从 DOM 中移除时会调用如下方法：</p><ul><li><a href="https://react.docschina.org/docs/react-component.html#componentwillunmount" target="_blank" rel="noreferrer"><strong>componentWillUnmount()</strong></a></li></ul><h2 id="_2-常用的生命周期方法" tabindex="-1">2. 常用的生命周期方法 <a class="header-anchor" href="#_2-常用的生命周期方法" aria-label="Permalink to &quot;2. 常用的生命周期方法&quot;">​</a></h2><h3 id="创建阶段" tabindex="-1">创建阶段 <a class="header-anchor" href="#创建阶段" aria-label="Permalink to &quot;创建阶段&quot;">​</a></h3><h4 id="constructor" tabindex="-1">constructor <a class="header-anchor" href="#constructor" aria-label="Permalink to &quot;constructor&quot;">​</a></h4><p>作用： (1) 获取props (2) 初始化state</p><h4 id="render" tabindex="-1">render <a class="header-anchor" href="#render" aria-label="Permalink to &quot;render&quot;">​</a></h4><p>作用：渲染组件到页面中，无法获取页面中的DOM对象</p><h4 id="componentdidmount" tabindex="-1">componentDidMount() <a class="header-anchor" href="#componentdidmount" aria-label="Permalink to &quot;componentDidMount()&quot;">​</a></h4><p>（1） 组件已经挂载到页面中 （2） 可以进行DOM操作，比如：获取到组件内部的DOM对象 （3） 可以发送请求获取数据 （4） 可以通过 setState() 修改状态的值 注意：在这里修改状态会重新渲染</p><h3 id="运行和交互阶段" tabindex="-1">运行和交互阶段 <a class="header-anchor" href="#运行和交互阶段" aria-label="Permalink to &quot;运行和交互阶段&quot;">​</a></h3><h4 id="componentdidupdate-prevprops-prevstate" tabindex="-1">componentDidUpdate(prevProps, prevState) <a class="header-anchor" href="#componentdidupdate-prevprops-prevstate" aria-label="Permalink to &quot;componentDidUpdate(prevProps, prevState)&quot;">​</a></h4><p>作用：组件已经被更新 参数：旧的属性和状态对象</p><h3 id="卸载阶段" tabindex="-1">卸载阶段 <a class="header-anchor" href="#卸载阶段" aria-label="Permalink to &quot;卸载阶段&quot;">​</a></h3><h4 id="componentwillunmount" tabindex="-1">componentWillUnmount() <a class="header-anchor" href="#componentwillunmount" aria-label="Permalink to &quot;componentWillUnmount()&quot;">​</a></h4><p>组件卸载期间，只有一个函数，这个函数也有一个显著的特点：组件一辈子只能执行一次 使用说明 只要组件不再被渲染到页面中，那么这个方法就会被调用（ 渲染到页面中 -&gt; 不再渲染到页面中 ）</p><p>作用：在卸载组件的时候，执行清理工作，比如清除定时器</p><h1 id="讲解用案例代码" tabindex="-1">讲解用案例代码 <a class="header-anchor" href="#讲解用案例代码" aria-label="Permalink to &quot;讲解用案例代码&quot;">​</a></h1><p>子组件</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 子组件</span></span>
<span class="line"><span>class Child extends Component {</span></span>
<span class="line"><span>  //构造方法</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    console.log(&#39;Child-constructor&#39;);</span></span>
<span class="line"><span>    super()</span></span>
<span class="line"><span>    this.state = {</span></span>
<span class="line"><span>      parentMsg: &#39;父组件的数据&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // 组件挂载后</span></span>
<span class="line"><span>  componentDidMount(){</span></span>
<span class="line"><span>    console.log(&#39;Child-componentDidMount&#39;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // 是否应该更新组件</span></span>
<span class="line"><span>  shouldComponentUpdate(){</span></span>
<span class="line"><span>    console.log(&#39;Child-shouldComponentUpdate&#39;);</span></span>
<span class="line"><span>    return true</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // 组件更新后</span></span>
<span class="line"><span>  componentDidUpdate(){</span></span>
<span class="line"><span>    console.log(&#39;Child-componentDidUpdate&#39;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // 组件卸载前</span></span>
<span class="line"><span>  componentWillUnmount(){</span></span>
<span class="line"><span>    console.log(&#39;Child-componentWillUnmount&#39;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  //组件渲染</span></span>
<span class="line"><span>  render() {</span></span>
<span class="line"><span>    console.log(&#39;Child-render&#39;);</span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>      &lt;div&gt;</span></span>
<span class="line"><span>        &lt;p&gt;子组件------------------{this.state.parentMsg}&lt;/p&gt;</span></span>
<span class="line"><span>      &lt;/div&gt;</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><p>父组件</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 父组件</span></span>
<span class="line"><span>class App extends Component {</span></span>
<span class="line"><span>  // 构造方法</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    console.log(&#39;App-constructor&#39;);</span></span>
<span class="line"><span>    super()</span></span>
<span class="line"><span>    this.state = {</span></span>
<span class="line"><span>      parentMsg: &#39;父组件的数据&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // 组件挂载后</span></span>
<span class="line"><span>  componentDidMount(){</span></span>
<span class="line"><span>    console.log(&#39;App-componentDidMount&#39;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // 是否应该更新组件</span></span>
<span class="line"><span>  shouldComponentUpdate(){</span></span>
<span class="line"><span>    console.log(&#39;App-shouldComponentUpdate&#39;);</span></span>
<span class="line"><span>    return true</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // 组件更新后</span></span>
<span class="line"><span>  componentDidUpdate(){</span></span>
<span class="line"><span>    console.log(&#39;App-componentDidUpdate&#39;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // 组件卸载前</span></span>
<span class="line"><span>  componentWillUnmount(){</span></span>
<span class="line"><span>    console.log(&#39;App-componentWillUnmount&#39;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  change = ()=&gt;{</span></span>
<span class="line"><span>    this.setState({</span></span>
<span class="line"><span>      parentMsg: &#39;新的新的&#39;</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  //组件渲染</span></span>
<span class="line"><span>  render() {</span></span>
<span class="line"><span>    console.log(&#39;App-render&#39;);</span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>      &lt;div&gt;</span></span>
<span class="line"><span>          &lt;p&gt;父组件-------------------{this.state.parentMsg}&lt;/p&gt;</span></span>
<span class="line"><span>          &lt;Child msg={this.state.parentMsg}&gt;&lt;/Child&gt;</span></span>
<span class="line"><span>          &lt;p&gt;&lt;button onClick={this.change}&gt;改变父组件的数据&lt;/button&gt;&lt;/p&gt;</span></span>
<span class="line"><span>      &lt;/div&gt;</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br></div></div>`,32)])])}const u=s(l,[["render",r]]);export{m as __pageData,u as default};
