exports.main = async (event, context) => {
	const fs = require('fs');
	const path = require('path');
	/* 	let res = await uniCloud.callFunction({
			name: 'addFile',
			data: {
				u_id: '610e1a0e3a9af40001446000',
				token: '97d063a4-c2cd-9855-327b-e82c9459b43a',
				parts: [
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-462e1313-11b7-49af-8b37-5474a33ed785/995028bc-166b-4064-96ba-5bb2a99b4b73.jpg']
			}
		})
		console.log(res)

		let res1 = await uniCloud.callFunction({
			name: 'creat',
			data: {
				u_id: '610e1a0e3a9af40001446000',
				token: '97d063a4-c2cd-9855-327b-e82c9459b43a',
				path: 'test/test1',
				file: {
					size: '12345',
					name: 'test.jpg',
					_id: res.result.id
				}
			}
		})
		console.log(res1) */
	/* 		let res2 = await uniCloud.callFunction({
				name: 'del',
				data: {
					u_id: '610e1a0e3a9af40001446000',
					token: '97d063a4-c2cd-9855-327b-e82c9459b43a',
					path: 'test/test1',
					file:{
						size:'12345',
						name:'test.jpg',
						_id:'610e75682a138e00016e04d3'
					}
				}
			})
			console.log(res2) */
	/* 	let res3 = await uniCloud.callFunction({
					name: 'fs',
					data: {
						u_id: '610e1a0e3a9af40001446000',
						token: '97d063a4-c2cd-9855-327b-e82c9459b43a'
					}
				})
				console.log(res3) */
/* 
	console.log(process.execPath)
	console.log(__dirname)
	console.log(process.cwd()) */

/* 	let aaa = fs.readFileSync('/tmp/function/__index.js')
	let result = await uniCloud.uploadFile({
		cloudPath: "code-index.js",
		fileContent: `/code/index.js`
	});
	console.log(aaa)
	return result */



	/*
	 * To walk a directory and generate the tree object
	 * 
	 * @param dest {string} the directory to start with.
	 * @param cb {function} the callback function, cb(err, dirObj)
	 * 
	 */


	/* 
		 console.log(uniCloud.callFunction)
		//转成绝对路径  
		pathParams = '/usr/'
		  
		//层级标识  
		let index = 0;  
		  
		async function dirTree(pathParams){//深度搜索  
		  
		if(!fs.statSync(pathParams).isFile()){//是否是一个文件  “.isDirectory()是不是一个文夹”  
		console.log(markT(index),getName(pathParams))  
		let dirLis = fs.readdirSync(pathParams);  
		index++;//进入下一级  
		for(let i=0; i<dirLis.length; i++){  
		dirTree(path.join(pathParams,dirLis[i]));  
		}  
		index--;//返回上一级  
		}else{  
		console.log(markT(index),getName(pathParams))  
		}  
		}  
		  
		//生成等比的文件间隔符  
		function markT(index){  
		if(index === 0){  
		return '你要读取的文件夹：'  
		}  
		let str = '';  
		for(let i=0; i<index; i++){  
		str += ' |---'  
		}  
		return str;  
		}  
		  
		//返回目录名，或者文件名  
		function getName(pathParams){  
		return path.parse(pathParams).base;  
		}  
		//指定生成目录树  
		dirTree(pathParams);  */
		return {success:true,msg:'dev ok',event:event}
}
