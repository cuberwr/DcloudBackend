exports.main = async (event, context) => {
	let db = await uniCloud.database().collection('SsLuw36u').doc(event.u_id)
	let userInfo = await db.get()
	if(!userInfo.affectedDocs) return({success:false,msg:'nouid'})
	if (userInfo.data[0].token != event.token) return {
            success: false,
            msg: 'tokenerror'
        }
	async function del(path, file) {
		return new Promise(async resolve => {
			let fileSys = userInfo.data[0]
			delete fileSys._id
			let pathArr = path.split('/')
			let key = ''
			for (let i = 0; i < pathArr.length; i++) {
				key += '.' + pathArr[i]
			}
			async function delFile(file) {
				return new Promise(async resolve=>{
					console.log('delfile')
					let idsdoc = await uniCloud.database().collection('HhpaCpog').doc(file._id)
					ids = await idsdoc.get()
					ids=ids.data[0]
					console.log(ids)
					if (ids.owner == event.u_id) {
						let delRes = await uniCloud.deleteFile({
							fileList: ids.parts
						})
						let delIdsRed = await idsdoc.remove()
						resolve([
							delIdsRed,delRes
						])
					}
				})
			}
			async function depthDel(node) {
				console.log('depthdel', node)
				for (e in node) {
					if (e.hasOwnProperty('&~type') && e['&~type'] == 'floder') depthDel(e)
					else if (e.hasOwnProperty('&~type') && e['&~type'] == 'file') await delFile(e)
				}
			}
			if (file) {
				await delFile(file)
				console.log(`delete fileSys.root${key+'.'+file.name.replace(/\./g, '&~')}`)
				eval(`delete fileSys.root${key+'["'+file.name.replace(/\./g, '&~')+'"]'}`)
			} else {
				depthDel(fileSys.root[key])
				eval(`delete fileSys.root${key}`)
			}
			resolve(fileSys)
		})
	}
	let fs = await del(event.path, event.file)
	let res = await db.set(fs)
	console.log(fs)
	return {success:true}
};
