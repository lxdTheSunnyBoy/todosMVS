;(function () {

	const todos = [
		{
			id: 0,
			title: '前端',
			done: true
		},
		{
			id: 1,
			title: 'java',
			done: false
		},
		{
			id: 2,
			title: '数据库',
			done: true
		},
		{
			id: 3,
			title: 'UI',
			done: false
		}
	]

	 new Vue({
		el: '#todoapp',
		data: {
			todos,
			inputText: '',
			currentEdit: null,
			backTitle: ''
		},
		methods: {
			addTodo (e) {
				// console.log(num)
				// console.log('enter了')
				// console.log(e.keyCode)  13

				// 拿到文本框数据
				const {inputText,todos} = this

				// 非空校验
				if(inputText.trim().length === 0) {
					return
				}

				// 获取唯一的id
				// 在做删除操作人的时候，都删除后，会报错
				//当数组删除完最后一向就没有了，没有最后，结果就是undefined.id

				//解决：先问一下有没有最后一个

				//把最后一个用变量存起来
				const lastItem = todos[todos.length-1]
				// 有的情况就不是undefined 就+1，没有的情况=1
				const id = lastItem ? lastItem.id + 1 : 1

				// 添加到数组中
				todos.push({
					id,
					title: inputText,
					done: false
				})
				// 清空文本框
				this.inputText = ''
				
			},
			
			removeTodo (index) {
				// console.log(123)
				this.todos.splice(index,1)
			},

			// 获得编辑样式
			getEditing (item) {
				// console.log('双击666')
				// 将currentEdit赋值为当前双击任务项
				this.currentEdit = item
				// 为了处理esc取消边的，所以这里获得了编辑状态的时候先备份我们的被编辑的任务的title
				this.backTitle = item.title
			},

			// 回车或者失去焦点保存编辑
			saveEdit (item,index) {
				//判断被编辑的问本是否为空
				// 如果为空，则直接删除
				// 如果不为空，则保存编辑，去除编辑样式

				// if(this.currentEdit.title.trim().length)
				if(item.title.trim().length === 0) {
					// 执行删除操作
					this.todos.splice(index,1)
				} else {

					this.currentEdit = null 
				}
			},

			// esc取消编辑
			cancelEdit () {
				// console.log('取消')

				// 这里一旦去除样式，则会导致blur的事件触发
				// blur 事件函数 saveEdit中要访问 this.currentEdit.title
				//所以就报错了，因为this.currentEdit 已经被这里设置为null了
				// null.title 就报错了

				this.currentEdit.title = this.backTitle
				this.currentEdit = null
			}
			
		}
	})

})();
