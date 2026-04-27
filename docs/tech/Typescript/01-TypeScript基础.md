# 1. 什么是TypeScript
	TypeScript入门教程： http://ts.xcatliu.com/basics/

-  TypeScript是一种添加了类型系统的 JavaScript，适用于任何规模的项目 
-  TypeScript 是静态类型 
> 动态类型是指在运行时才会进行类型检查
>  静态类型是指编译阶段就能确定每个变量的类型

# 2.安装、编译
## 使用typescript编译 
```
npm install -g typescript
```
## 创建tsconfig.json 
参考： [https://www.jianshu.com/p/c616c4f475cd](https://www.jianshu.com/p/c616c4f475cd)
> 该文件一定保存在项目根目录，是编译ts文件的编译选项

当我们项目下面有一个 tsconfig.json 文件的时候，他就不会在检查其他文件的 ts 文件了，而是直接把 tsconfig.json 所在文件夹来当作根目录，我们可以通过 tsconfig.json 来配置 ts 的编译器行为
```javascript
tsc -h  //查看帮助信息
tsc --init //在根目录生成tsconfig.json
```
## 修改tsconfig.json 
案例: 不允许传入null, 不允许使用any类型
```typescript
// 在我们定义 属性类型 初始值的时候 允许给他赋值为 null
let productName: string = null    // ok

interface Product {
    title: string,
    price: number
}

function printProcutPrice(p: Product) {
    console.log(p.price)
}

printProcutPrice(null)    // ok
```
以上代码原本可以正常编译，但做下面修改后会报错<br />tsconfig.json
```json
{
    "compilerOptions": {
        "strictNullChecks": true,       // 严格检查 null，现在上面的的代码就会报错了
        "noImplicitAny": true           // 不允许使用隐式类型 any
    }
}
```
```json
// 编译后文件所在目录
"outDir": "./dist",
//是否移除注释
"removeComments": true
```
## 执行编译
即使编译出错也会生成js文件   

-  使用ts-node直接编译并执行， 
```
npm i ts-node -g
npm i @types/node -g

//运行
ts-node hello.ts
```
# 3.原始数据类型
```tsx

{
  // 字符串
  let str: string = "5"

  //数值
  let num: number = 6

  //布尔值

  let flag: boolean = true

  // null

  let userInfo: null;

  //undefined

  let data: undefined;  
}
```
# 4. any和unknown类型
## 1.任意值 any类型

-  任意值（Any）用来表示允许赋值为任意类型。 
-  在任意值上访问任何属性都是允许的 
-  变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型 
```tsx
let a: any = 1
a = "b"
console.log(a.a)  //undefined
```
## 2.unknown类型
unknown 类型是 TS3 新增的类型，这个类型与 any 类型类似，可以设置任何的类型值，随后可以更改类型。<br />如果事先不检查类型，使用any类型，调用了不存在的方法，编译时不会报错，代码运行时才会发现错误<br />但是使用unknown 类型不一样，如果不进行类型判断，执行相关操作编译器就会报错<br />test.ts
```typescript
let val: any = 22;
val = "string value";
val = new Array();
val.doesnotexist(33);  //编译不报错，运行时才报错
console.log(val);
```
上述的错误，大家可能不会犯，但是项目大时，参与的人多时，就很难避免这样类似的问题，因此unknown 类型出现了。
```typescript
let val: unknown = 22;
val = "string value";
val = new Array();
val.push(33);   // 编译报错
console.log(val);
```
解决方案: 先判断类型
```typescript
let val: unknown = 22;
val = "string value";
val = new Array();
if (val instanceof Array) {
    val.push(33);
}
console.log(val);
```
虽然有些麻烦，但是相比 any 类型说，更加安全，在代码编译期间，就能帮我们发现由于类型造成的问题，因此在大多的场景，建议使用 unknown 类型替代 any。
# 5. 类型推论
TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论
```tsx
let a = "7"
a = 8 //报错
```
如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 `any` 类型而完全不被类型检查
```tsx
let a;
a = 7
a = 'c'
```
# 6. 联合类型
联合类型（Union Types）表示取值可以为多种类型中的一种。<br />当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法<br />下方代码编译报错：
```tsx
// something.toString() 是共有方法，可以访问 ，不会报错
function getLength(something: string | number): number {
  return something.length; // 报错
}
```
联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型
```tsx
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length); // 5
myFavoriteNumber = 7;
console.log(myFavoriteNumber.length); // 编译时报错
```
# 7. 对象的类型——接口
在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。
## 接口类型
用于对「对象的形状（Shape）」进行描述。

-  赋值的时候，变量的形状必须和接口的形状保持一致 
-  定义的变量比接口少了一些属性是不允许的 
-  多一些属性也是不允许的 
```tsx
{
  interface Cat{
    nickname: string,
    age:number
  }

  let cat : Cat = {
    nickname: 'a',
    age: 7
  }
}
```
## 可选属性 
```tsx
interface Cat{
  nickname: string,
  age:number,
  skin?: string
}
```
## 只读属性
希望对象中的一些字段只能在创建的时候被赋值，那么可以用 `readonly` 定义只读属性：<br />**只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候** 
```tsx
interface Person {
  readonly id: number;
  name: string;
  age?: number;
}

let tom: Person = {
  id: 89757,
  name: 'Tom',
  gender: 'male'
};

tom.id = 9527;
```
# 8. 数组类型
在 TypeScript 中，数组类型有多种定义方式，比较灵活。
##  使用「类型 + 方括号」来表示数组
数组的项中不允许出现其他的类型 
```tsx
let fibonacci: number[] = [1, 1, 2, 3, 5];
```
##  数组泛型 
```
{
   let userList : Array<string> = ['a','b']
}
```
## 用接口表示数组 
```tsx
{
  interface IUser {
    [index:number]: string
  }
  let userList :IUser  = ['a','b']  // userList[0]
}
```
##  any 在数组中的应用
一个比较常见的做法是，用 `any` 表示数组中允许出现任意类型 
```tsx
{
  let num: any[] = [1,'a']
}
```

# 9.函数的类型
一个函数有输入和输出，要在 TypeScript 中对其进行约束
## 1. 函数声明
需要把输入和输出都考虑到，其中函数声明的类型定义较简单
```tsx
{
  // 没有返回值
  function fun1(x: string, y: number): void {
    console.log(x + y)
  }
  fun1('1', 2)

  // 有返回值
  function fun2(x: string, y: number): string {
    return x + y
  }
  fun2('1', 2)
}
```
> 输入多余的（或者少于要求的）参数，是不被允许的

## 2. 函数表达式(简单了解)
```tsx
{
  //myFun1通过类型推断为右边函数的类型
  let myFun1 = function(x: string,y:number):string {
    return x + y
  }

  //手动定义myFun2的函数类型
  let myFun2 : (x: string,y:number) => string = function(x: string,y:number):string {
    return x + y
  }
}
```
> 在 TypeScript 的类型定义中，`=>` 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。

## 3. 用接口定义函数的形状
```tsx
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  return source.search(subString) !== -1;
}
```
## 4. 可选参数
与接口中的可选属性类似，我们用 `?` 表示可选的参数
```tsx
{
  let myFun = function(x: string,y?:number):string{
    return x + y
  }
  myFun('1')
}
```
> 可选参数必须接在必需参数后面

## 5. 参数默认值
```tsx
function buildName(firstName: string, lastName: string = 'Cat') {
  return firstName + ' ' + lastName;
}
```
## 6. 函数重载
我们重复定义了多次函数 `reverse`，前几次都是函数定义，最后一次是函数实现
```tsx
{
  function reverse(x: number): number;
  function reverse(x: string): string;
  function reverse(x: number | string): number | string | void {
    if (typeof x === 'number') {
      return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
      return x.split('').reverse().join('');
    }
  }
}
```
# 10. 类型断言
类型断言（Type Assertion）可以用来手动指定一个值的类型。
```tsx
{
  interface Cat{
    name: string,
    run(): void
  }
  interface Fish{
    name: string,
    swim(): void
  }

  function getName(animal: Cat | Fish){

    //报错，因为只能访问Cat和Fish的共同属性
    if (typeof animal.swim === 'function'){
      return true
    }
  }
}
```
而有时候，我们确实需要在还不确定类型的时候就访问其中一个类型特有的属性或方法<br />此时可以使用类型断言，将 `animal` 断言成 `Fish`
```tsx
interface Cat {
  name: string,
  run(): void
}

interface Fish {
  name: string,
  swim(): void
}

const getAnimalName = function (animal: Cat | Fish): string {
  if (typeof (animal as Cat).run === 'function') {
    // animal.run() //报错
    (animal as Cat).run()
  } else {
    (animal as Fish).swim()
  }
  return animal.name
}

let cat: Cat = {
  name: 'lucy',
  run() {
    console.log('run');
  }
}
let fish: Fish = {
  name: 'nancy',
  swim() {
    console.log('swim');
  }
}

// let catname:string = getAnimalName(cat)
let animalname: string = getAnimalName(fish)
```
# 11. 内置对象
```tsx
// ----------------------------ECMAScript 的内置对象
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;


//-------------------------DOM 和 BOM 的内置对象
// DOM 和 BOM 提供的内置对象有：

// Document、HTMLElement、Event、NodeList 等。

// TypeScript 中会经常用到这些类型：

let body: HTMLElement = document.body;
let div: HTMLElement = document.querySelectorAll('div')[0];
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
});
```
# 12. 类型别名
类型别名用来给一个类型起个新名字
```tsx
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n;
  } else {
    return n();
  }
}
```
# 13. 字符串字面量类型
字符串字面量类型用来约束取值只能是某几个字符串中的一个
```tsx
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
  // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
handleEvent(document.getElementById('world'), 'dblclick'); // 报错，event 不能为 'dblclick'
```
# 14. 元组
数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象
```tsx
let tom: [string, number] = ['Tom', 25];
```
# 15. 枚举
```tsx
{
  enum Direct {Up,Right,Down,Left}
  console.log(Direct.Up); //0
  console.log(Direct[0]); //'Up'
}
```
# 16. 类
## 1. 属性和方法
```tsx
class Animal {
  public name：string;
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    return `My name is ${this.name}`;
  }
}

let a = new Animal('Jack');
console.log(a.sayHi()); // My name is Jack
```
## 2. 静态方法
使用 `static` 修饰符修饰的方法称为静态方法，它们不需要实例化，而是直接通过类来调用
```tsx
class Animal {
  static isAnimal(a) {
    return a instanceof Animal;
  }
}

let a = new Animal('Jack');
Animal.isAnimal(a); // true
a.isAnimal(a); // TypeError: a.isAnimal is not a function
```
## 3. public private 和 protected
### public

-  `public` 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 `public` 的 
```tsx
class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
}

let a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom';
console.log(a.name); // Tom
```
### private

-  `private` 修饰的属性或方法是私有的，不能在声明它的类的外部访问<br />使用 `private` 修饰的属性或方法，在子类中也是不允许访问的 
```tsx
class Animal {
  private name;
  public constructor(name) {
    this.name = name;
  }
  say(){
    console.log(this.name)
  }
}

let a = new Animal('Jack');
console.log(a.name);
a.name = 'Tom';
```
### protected

-  `protected` 修饰的属性或方法是受保护的，它和 `private` 类似，区别是它在子类中也是允许被访问的 
```tsx
class Animal {
  protected name;
  public constructor(name) {
    this.name = name;
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name);
    console.log(this.name);
  }
}
```
# 17. 类与接口
```tsx
interface Alarm {
  alert(): void;
}

class Door {
}

class SecurityDoor extends Door implements Alarm {
  alert() {
    console.log('SecurityDoor alert');
  }
}

class Car implements Alarm {
  alert() {
    console.log('Car alert');
  }
}
```
# 18. 泛型
泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性<br />这段代码编译不会报错，但是一个显而易见的缺陷是，它并没有准确的定义返回值的类型
```tsx
function createArray(length: number, value: any): Array<any> {
  let result: any[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```
我们预期的是，数组中每一项都应该是输入的 `value` 的类型。
```tsx
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

createArray<string>(3, 'x'); // ['x', 'x', 'x']

createArray<number>(3, 'x'); // ['x', 'x', 'x']
```
> 在函数名后添加了 `<T>`，其中 `T` 用来指代任意输入的类型，在后面的输入 `value: T` 和输出 `Array<T>` 中即可使用了。

