import{_ as s,c as a,o as p,al as e}from"./chunks/framework.QMC68jD7.js";const m=JSON.parse('{"title":"受控组件","description":"","frontmatter":{},"headers":[],"relativePath":"tech/React/08-了解-受控组件和非受控组件.md","filePath":"tech/React/08-了解-受控组件和非受控组件.md","lastUpdated":1777271852000}'),l={name:"tech/React/08-了解-受控组件和非受控组件.md"};function t(r,n,i,c,b,u){return p(),a("div",null,[...n[0]||(n[0]=[e(`<h1 id="受控组件" tabindex="-1">受控组件 <a class="header-anchor" href="#受控组件" aria-label="Permalink to &quot;受控组件&quot;">​</a></h1><p>表单元素的可变状态通常保存在组件的 state 属性中，并且只能通过使用 <a href="https://react.docschina.org/docs/react-component.html#setstate" target="_blank" rel="noreferrer"><code>setState()</code></a>来更新</p><p>这些值受到 React组件 控制的表单元素称为受控组件</p><p><strong>案例代码</strong> 1: 文本框</p><div class="language-react vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { useState} from &#39;react&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default function App() {</span></span>
<span class="line"><span>  const [username,setUsername] = useState(&#39;&#39;)</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  const handleSetUsername = (e) =&gt; {</span></span>
<span class="line"><span>    setUsername(e.target.value)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  //组件渲染</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>      &lt;h1&gt;表单元素&lt;/h1&gt;</span></span>
<span class="line"><span>      &lt;p&gt;用户名: &lt;input type=&quot;text&quot; value={username} onChange={handleSetUsername} /&gt;&lt;/p&gt;</span></span>
<span class="line"><span>      &lt;p&gt;{username}&lt;/p&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p><strong>案例代码</strong> 2: 下拉菜单</p><div class="language-react vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { useState } from &#39;react&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default function App(){</span></span>
<span class="line"><span>  const [city,setCity] = useState(&#39;bj&#39;)</span></span>
<span class="line"><span>  const handleSetCity = (e) =&gt; {</span></span>
<span class="line"><span>    setCity(e.target.value)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  //组件渲染</span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>      &lt;div&gt;</span></span>
<span class="line"><span>        &lt;h1&gt;表单元素&lt;/h1&gt;</span></span>
<span class="line"><span>        &lt;p&gt;</span></span>
<span class="line"><span>          城市:</span></span>
<span class="line"><span>          &lt;select name=&quot;city&quot; id=&quot;city&quot; value={city} onChange={handleSetCity}&gt;</span></span>
<span class="line"><span>            &lt;option value=&quot;sh&quot;&gt;上海&lt;/option&gt;</span></span>
<span class="line"><span>            &lt;option value=&quot;zz&quot;&gt;郑州&lt;/option&gt;</span></span>
<span class="line"><span>            &lt;option value=&quot;bj&quot;&gt;北京&lt;/option&gt;</span></span>
<span class="line"><span>          &lt;/select&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;/p&gt;</span></span>
<span class="line"><span>      &lt;/div&gt;</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p><strong>案例代码</strong> 3: 文本域</p><div class="language-react vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { useState } from &#39;react&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 父组件</span></span>
<span class="line"><span>export default function App(){</span></span>
<span class="line"><span>  const [comment,setComment] = useState(&#39;bj&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const handleSetComment = (e) =&gt; {</span></span>
<span class="line"><span>    setComment(e.target.value)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  //组件渲染</span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>      &lt;div&gt;</span></span>
<span class="line"><span>        &lt;h1&gt;表单元素&lt;/h1&gt;</span></span>
<span class="line"><span>        &lt;p&gt;</span></span>
<span class="line"><span>          &lt;textarea </span></span>
<span class="line"><span>            name=&quot;comment&quot; </span></span>
<span class="line"><span>            id=&quot;comment&quot; </span></span>
<span class="line"><span>            cols=&quot;30&quot; </span></span>
<span class="line"><span>            rows=&quot;10&quot; </span></span>
<span class="line"><span>            value={comment} </span></span>
<span class="line"><span>            onChange={handleSetComment}</span></span>
<span class="line"><span>          &gt;&lt;/textarea&gt;</span></span>
<span class="line"><span>        &lt;/p&gt;</span></span>
<span class="line"><span>      &lt;/div&gt;</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h1 id="非受控组件" tabindex="-1">非受控组件 <a class="header-anchor" href="#非受控组件" aria-label="Permalink to &quot;非受控组件&quot;">​</a></h1><p>表单数据将交由 DOM 节点来处理，而不是由 React 组件来管理. 这样的表单元素称为非受控组件</p><p><strong>案例</strong></p><div class="language-react vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { useRef } from &#39;react&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default function App() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const inputEl = useRef()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const getUsername = () =&gt; {</span></span>
<span class="line"><span>    let username = inputEl.current.value;</span></span>
<span class="line"><span>    console.log(username);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return (</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>      &lt;h1&gt;表单元素&lt;/h1&gt;</span></span>
<span class="line"><span>      &lt;p&gt;用户名: &lt;input type=&quot;text&quot; ref={inputEl} /&gt;&lt;/p&gt;</span></span>
<span class="line"><span>      &lt;p&gt;&lt;button onClick={getUsername} &gt;获取用户名的数据&lt;/button&gt;&lt;/p&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div>`,13)])])}const d=s(l,[["render",t]]);export{m as __pageData,d as default};
