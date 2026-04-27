# 1.keyof 操作符
ts内置工具类型，<br />通过 keyof 操作符可以获取对象中的所有键类型组成的**联合类型**<br />demo1<br />获取对象中的所有键类型组成的**联合类型**
```typescript
interface ICat {
    name: string,
    age: number
}
// keyof 后面是类型，而不是一个值
// 等价于： type keys = "name" | "age"
type keys = keyof ICat

let a1: keys = 'a' //报错
let a2: keys = 'name' //不报错
let a3: keys = 'age' //不报错
```
demo2<br />获取对象类型所有属性的类型
```typescript
type Person = {
    id: number;
    name: string;
    isCh: boolean;
};

// 等价于 type P1 = 'id' | 'name' | 'age'
type P1 = keyof Person; 

// 等价于 type P2 = number | string | boolean
// 由 type P2 = Person['id'] | Person["name] | Person["isCh"] 推导而来
type P2 = Person[keyof Person];  

let p1: P2 = undefined  //报错
let p2: P2 = 1  //不报错
let p3: P2 = 'aa'  //不报错
```
demo3<br />下面代码报错
```typescript
type Info = {
    name: string
    age: number
}

function getVal(obj: Info, key: any) {
    // 报错, 因为如果key是obj不存在的属性，则返回undefined
    // 应该约束入参key是obj存在的属性
    return obj[key] 
}
```
解决方案：
```typescript
type Info = {
  name:string
  age:number
}

function getVal(obj:Info, key:keyof Info) {
  return obj[key]
}
```
demo4
```typescript
type A = keyof any
// 等价于以下只能用于索引的类型
// type A = string | number | symbol
```
# 2.typeof 操作符
ts内置工具类型<br />TS中的typeof有新的用途，那就是获取一个变量的类型并且能够用它声明新的变量<br />demo1
```typescript
let a = '123'
// 获取a的类型为string, 
//下面的代码等价于: type NewType = string;
type NewType = typeof a;
let b: NewType = 3 //报错,因为b定义为字符串类型
```
demo2
```typescript
// 需求： 需要一个和cat结构相同的新类型
let cat = {
    name: 'ha',
    age: 16
}

// 方案一: 用interface手动定义
interface ICat1 {
    name: string,
    age: number
}


// 方案二: 用type手动定义
type ICat2 = {
    name: string,
    age: number
}

let c1: ICat2 = {
    name: 'aa',
    age: 45
}

//方案三： 用typeof基于已有对象cat实现
// 鼠标放在ICat3上可以查看类型
type ICat3 = typeof cat
let c2: ICat3 = {
    name: 'aa',
    age: 45
}
```
demo3
```typescript
// Colors在定义时没有加as const
const Colors = {
    Red: '#FF0000',
    White: '#FFFFFF'
}
Colors.Red = 'aaa' // Red的值可以更改
// Colors = {} //报错，因为Colors的地址不能更改

// 等价于 type Color = { Red: string, White: string}
type Color = typeof Colors

//不报错
let a: Color = {
    Red: 'red',
    White: '000'
}
```
demo4
```typescript
// Colors在定义时加as const, 帮助ts进行类型推导
const Colors = {
    Red: '#FF0000',
    White: '#FFFFFF'
} as const

// Colors.Red = 'aaa' // 报错,Red的值也是常数，不能修改
// Colors = {} //报错，因为Colors的地址不能更改

// 等价于 type Color = { readonly Red: '#FF0000', readonly White: '#FFFFFF'}
type Color = typeof Colors

//报错
let a1: Color = {
    Red: 'red',
    White: '000'
}
//不报错
let a2: Color = {
    Red: '#FF0000',
    White: '#FFFFFF'
}
```
# 3.extends关键字
extends关键字在TS编程中出现的频率挺高的，而且不同场景下代表的含义不一样，特此总结一下：

- 继承/拓展
- 泛型约束
- 条件类型（三元表达式类型）
## 表示继承/拓展的含义
demo1<br />继承父类的方法和属性
```typescript
  class Animal {
      //定义kind属性类型
      kind: string
      constructor(kind: string) {
          this.kind = kind;
      }
      sayHello() {
          console.log(`Hello, I am a ${this.kind}!`);
      }
  }

  class Dog extends Animal {
      constructor(kind: string) {
          super(kind)
      }
      bark() {
          console.log('wang wang')
      }
  }

  const dog = new Dog('dog');
  console.log(dog.kind); //  => 'dog'
  dog.sayHello(); // => Hello, I am a dog!
```
demo2:<br />继承某个类型
```typescript
interface Animal {
    kind: string;
}

// Dog类型继承Animal类型的定义
interface Dog extends Animal {
    bark(): void;
}
// Dog => { name: string; bark(): void }


let d1: Dog = {
    kind: 'animal',
    bark: 12  //报错,bark是方法
}
89
}

//不报错
let d3: Dog = {
    bark(){}, 
    kind: 'animal'
}
```
## 泛型约束
demo1
```typescript
//表示入参和返回值都必须是P类型，而P必须是number、string、boolean中的一种
// 用来缩窄泛型的类型
function fun<P extends number | string | boolean>(param: P): P {
    return param;
}

fun('string'); // ok

fun(1); // ok

fun(true); // ok

fun(null); // ts(2345) 'null' 不能赋予类型 'number | string | boolean'
```
demo2
```typescript
interface ICat1 {
    age: number
}
interface ICat2 {
    cname: string,
    age: number
}

// T是继承自{cname:string}的类型，也就是要包含cname定义
// 入参entities是T类型的数组
// 函数返回值是字符串数组
function getCnames<T extends { cname: string }>(entities: T[]): string[] {
    return entities.map(entity => entity.cname)
}

let list = [{
    cname: 'ha',
    age: 123
}]
// getCnames<ICat1>(list)  //报错，因为ICat1中没有cname属性

getCnames<ICat2>(list)  //不报错

getCnames(list)  //不报错，因为会自动推导T是{cname: string, age: number}
```
demo3
```typescript
interface Store<State extends { id: number; name: string }> {
    state: State
}

// A1 即为 { state: 类型 }， 但类型不确定，泛型传入什么类型，state就应该定义为这种类型
type A1 = Store<{ id: number; name: string; }>; // 不报错

type A2 = Store<{ id: number; name: string; age: number; }>; // 不报错

type A3 = Store<{ id: string; name: number; }>; // 报错，因为name为string

type A4 = Store<{ id: number; }>; // 报错，因为少了name属性


//报错
let a1: A1 = {
    state: {
        id: '11',
        name: 'ha'
    }
}

//报错
let a2: A1 = {
    state: {
        id: 1,
        name: 'ha',
        age: 12
    }
}

//不报错
let a3: A1 = {
    state: {
        id: 1,
        name: 'ha',
    }
}

```
## 条件类型
```typescript
type Human = {
    name: string;
}
type Duck = {
    name: string;
}
type Bool = Duck extends Human ? 'yes' : 'no'; // Bool => 'yes'

let a0: Bool = 1 //报错, 因为a1只能赋值'yes'

```
```typescript
// 示例2
interface A1 {
  name: string
}

interface A2 {
  name: string
  age: number
}
// A的类型为string
type A = A2 extends A1 ? string : number

const a: A = 'this is string'
```
```typescript
type A1 = 'x' extends 'x' ? string : number; // string

let a1 : A1 = 3  // 报错，因为a2是string类型
```
```typescript
type A2 = 'x' | 'y' extends 'x' ? string : number; // number
let a2: A2 = '12' //报错
```
```typescript
type P<T> = T extends 'x' ? string : number;

let a3: P<'x'> = 123  //报错,因为当T='x'时， T extends 'x'为真，则 P<'x'>即为string类型
let a4: P<'y'> = 'aa' //报错，应该赋值number类型
```
# 4.声明promise类型
```typescript
// Promise<string> 表示 Promise 对象的返回值类型为 string。可以根据实际需求修改类型参数。
type MyPromise = Promise<string>;

//不报错
let myPromise1: MyPromise = new Promise((resolve, reject) => {
    // promise body
    resolve('123')
});

//报错，因为返回值应该为string
let myPromise2: MyPromise = new Promise((resolve, reject) => {
    // promise body
    resolve(1)
});

//报错，因为返回值应该为strind
let myPromise3: MyPromise = new Promise((resolve, reject) => {
    // promise body
    resolve({
        code: 1
    })
});
```
# 5.Record工具类型
Record是 ts 中的一个高级类型，它可以用来构造一个具有给定类型T的一组属性K的类型。它的定义如下：
```typescript
// 源码
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```
这里，K是一个可以被赋值给keyof any的类型，也就是说，它可以是一个字符串、数字、符号或者联合类型。T是任意类型。[P in K]: T表示将K中的每个属性名映射到类型T上，从而得到一个新的类型。<br />demo1
```typescript
{
  // 将一个枚举类型的值映射到另一个类型上
  enum Color {
    Red,
    Green,
    Blue,
  }

  /**
   * 等价于
    type ColorInfo = {
      0:{
        name: string,
        hex: string
      },
      1: {
        name: string,
        hex: string
      },
      2: {
        name: string,
        hex: string
      }
    }
   */

  // 第一个参数Color提供类型中的键名，第二个参数提供类型中值的类型
  type ColorInfo = Record<Color, { name: string; hex: string }>;

  const colors: ColorInfo = {
    [Color.Red]: { name: "red", hex: "#ff0000" },
    [Color.Green]: { name: "green", hex: "#00ff00" },
    [Color.Blue]: { name: "blue", hex: "#0000ff" },
  };
}
```
demo2
```typescript
{
  // 将一个联合类型的值映射到另一个类型上
  type Animal = "dog" | "cat" | "fish";

  /**
   等价于
   type AnimalInfo = {
    dog: {
        name: string;
        age: number;
    };
    cat: {
        name: string;
        age: number;
    };
    fish: {
        name: string;
        age: number;
    };
}
   */
  type AnimalInfo = Record<Animal, { name: string; age: number }>;

  const animals: AnimalInfo = {
    dog: { name: "dogName", age: 2 },
    cat: { name: "catName", age: 3 },
    fish: { name: "fishName", age: 5 },
  };
}
```
demo3
```typescript
{
  // 将一个对象类型的属性映射到另一个类型上
  interface Person {
    id: number;
    name: string;
  }

  /**
   等价于：
   type PersonInfo = {
      id: string;
      name: string;
  }
   */
  type PersonInfo = Record<keyof Person, string>;

  const person: PersonInfo = {
    id: "001",
    name: "Alice",
  };
}
```
# 6.Partial工具类型
作用：生成一个新类型，该类型与 T 拥有相同的属性，但是所有属性皆为可选项
```typescript
//源码
type Partial<T> = {   
  [P in keyof T]?: T[P]; 
};
```
demo
```typescript
{
  interface Foo {
    name: string;
    age: number;
  }

  /**
  相当于
  type Bar = {
    name?: string
    age?: number
  }
 */
  type Bar = Partial<Foo>;

  let bar: Bar = {
    name: 'qq'
  }
}
```
# 7.Required工具类型
作用：生成一个新类型，该类型与 T 拥有相同的属性，但是所有属性皆为必选项
```typescript
//源码
//-?: 通过 -? 把所有属性变成 必需的
type Require<T> = {
    [P in keyof <T>]-?: T[P]
}
```
demo
```typescript
{
  interface Foo {
      name: string
      age?: number
  }
  /**
  相当于
  type Bar = {
      name: string
      age: number
  }
   */
  type Bar = Required<Foo>

  let bar: Bar = {
    name:'qq',
    age: 12
  }
}
```
# 8.Readonly工具类型
作用：生成一个新类型，T 中的 K 属性是只读的，K 属性是不可修改的。
```typescript
//源码
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```
demo
```typescript
{
  interface Foo {
    name: string;
    age: number;
  }
  /*
  相当于
type Bar = {
    readonly name: string
    readonly age: number
}
*/
  type Bar = Readonly<Foo>;

  let bar: Bar = {
    name: 'qq',
    age: 123
  }
  bar.name = 'xx' // 报错
}

```
# 9.Pick工具类型
作用：生成一个新类型，映射类型 ; 只得到指定属性的定义
```typescript
//源码
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```
demo
```typescript
{
  interface Foo {
    name: string;
    age?: number;
    gender: string;
  }
  /**
  相当于
  type Bar = {
    age?: number;
    gender: string;
  };
  */

  // 第一个参数为提供类型的对象，第二个为要获取的属性定义，属性必须是第一个对象中存在的
  type Bar = Pick<Foo, "age" | "gender">;

  const todo: Bar = {
    age: 3,
    gender: '男'
  };
  console.log(todo);
}
```
# 10.Exclud工具类型
作用：从T中剔除可以赋值给U的类型
```typescript
// 源码
type Exclude<T, U> = T extends U ? never : T
```
demo
```typescript
{
  type A = number | string | boolean;
  type B = number | boolean;

  // 当 T 是联合类型时，则会循环 T 类型即： (T1 extends U ? never : T1) ｜ (T2 extends U ? never : T2) | …
  // A中number可以赋给B, 因为B也有，同理,boolean也可以，但string不行，因为B没有string
  // 相当于 type Foo = string
  type Foo = Exclude<A, B>;
}
```
# 11.Extract工具类型
提取T中可以赋值给U的类型
```typescript
// 源码
type Extract<T, U> = T extends U ? T : never
```
demo
```typescript
// 当 T 是联合类型时，则会循环 T 类型即： (T1 extends U ? T1 : never ) ｜ (T2 extends U ? T2 : never ) | …
type TExtract1 = Extract<"a" | "b", "a" | "c">
// 等同于
//   type TExtract1 = "a"

type TExtract2 = Extract<number | string | boolean, string>
// 等同于
//   type TExtract2 = string

type TExtract3 = Extract<number | string | boolean, object>
// 等同于
//   type TExtract3 = never
```
# 12.Omit工具类型
    获取 T 中不包含 K 属性的 新类型
```typescript
///源码
keyof any 等同于 string | number | symbol ，也就是说 K 只能是这三种类型
keyof T 获取 T 的所有属性
Exclude 从T中剔除可以赋值给U的类型
Pick 从 T 类型中选取部分 K 类型，并返回新的类型，这里 T 常用于对象类型
说明：先通过 Exclued 获取 T 中不包含 K 属性的新类型， 再通过 Pick 获取 T 中包含 K 属性的新类型

type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
```
demo
```typescript
interface IPeople {
      name: string,
      age?: number,
      sex: string,
  }

type TOmit = Omit<IPeople, 'name' | 'sex' | 'color'>

// 等同于
//   type TOmit = {
//     age?: number | undefined;
//   }
```
# 13.never类型
nerver类型表示一个不存在的状态
```typescript
//不存在值的空数组
let a: never[] = []
  a[0] = 1 //报错
console.log(a.length);

//一个总是抛出异常的函数
function handleErr(): never {
    throw new Error('异常')
}
handleErr()
```
