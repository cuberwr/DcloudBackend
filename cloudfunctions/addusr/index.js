exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	if(!event.hasOwnProperty('cloudKey')||event.cloudKey!='FNKNYjGKJrnWmimYNEftvArGwnRN4caT') return {success:false,msg:'ckerror'}
	delete event.cloudKey
	let db=await uniCloud.database().collection('SsLuw36u')
	let res=await db.add(event)
	return {
		success:true,
		u_id:res.id
	}
};
