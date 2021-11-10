exports.main = async (event, context) => {
	console.log('event : ', event)
	let db=await uniCloud.database().collection('SsLuw36u').doc(event.u_id)
	let userInfo=await db.get()
	if(!userInfo.affectedDocs) return({success:false,msg:'nouid'})
	if(userInfo.data[0].token!=event.token) return {
            success: false,
            msg: 'tokenerror'
        }
	async function creat(path,file) {
		return new Promise(resolve=>{
			let fileSys = userInfo.data[0]
			delete fileSys._id
			let pathArr = path.split('/')
			let node = fileSys.root
			if(path) for (let i = 0; i < pathArr.length; i++) {
			    if (node.hasOwnProperty(pathArr[i])) {
			        node = node[pathArr[i]]
			    } else {
			        node[pathArr[i]] = {
			            '&~type': 'floder',
			            '&~path': pathArr.slice(0, i + 1).unshift('/'),
						'&~name': pathArr[i]
			        }
			        node = node[pathArr[i]]
			    }
			}else{
				pathArr=[]
			}
			if (file) {
				pathArr.unshift('/')
				file['&~path']=pathArr
				file['&~type']='file'
				file.owner=event.u_id
				node[file.name.replace(/\./g, '&~')] = file
			}
			resolve(fileSys)
		})
	}
	let fs=await creat(event.path,event.file)
	let res=await db.update(fs)
	return {success:true}
};
