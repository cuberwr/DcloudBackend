exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	if(!event.hasOwnProperty('cloudKey')||event.cloudKey!='FNKNYjGKJrnWmimYNEftvArGwnRN4caT') return {success:false,msg:'ckerror'}
	delete event.cloudKey
	let db=await uniCloud.database().collection('SsLuw36u').doc(event.u_id)
	delete event.u_id
	let res=await db.update(event)
	//返回数据给客户端
	return {success:true,msg:res}
};
