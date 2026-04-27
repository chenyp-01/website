## 数据绑定
- 数据如何在模板中显示： this.state.数据
- 数据如何改变  this.setState({})

``` jsx
class 组件名 extends Component {
    constructor(){
        super()
        //state中的数据是响应式数据，数据改变，会触发视图重新渲染
        this.state = {
            inputValue: '',
            list: []
        }
    }
    //改变数据
    changeData = ()=>{
        console.log('调用函数')
        // react数据要用this.setState来改变
        this.setState({
            inputValue: 'hello'
        })
    }
    render(){
        return (
            <div>
                显示数据：{this.state.inputValue}
                单击按钮改变数据：  <button onClick={this.changeData}>改变数据</button>
            </div>
        )
    }
}
```


## setState的各种用法

### 没有回调	
```jsx
this.state = {
    msg: 'apple'
}

changeData(){
	原因：setState是异步操作
	this.setState({
   		msg: 'lemon' 
   })
   console.log(this.setState.msg) // apple
}
```
### this.setState(对象形式，回调)

```jsx
    console.log('修改数据为lemon');
    this.setState({
        msg: 'lemon'
    },()=>{
        console.log(this.state.msg);
    })
```


