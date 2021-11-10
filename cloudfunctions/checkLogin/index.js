'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let where={}
	if(event.name) where={name:event.name}
	if(event.mail) where={mail:event.mail} 
	if(event.phone) where={phone:event.phone} 
	let db=await uniCloud.database().collection('SsLuw36u')
	let userInfo=await db.where(where).get()
	if(!userInfo.affectedDocs) return {success:false,msg:'nousr'}
	let res = await uniCloud.callFunction({
		name: 'mail',
		data: {
			mail:event.mail,
			cloudKey:'FNKNYjGKJrnWmimYNEftvArGwnRN4caT',
			type: 'upLocalToken',
			data: {
				u_id:userInfo.data[0]._id,
				token:event.token,
				cloudKey:'FNKNYjGKJrnWmimYNEftvArGwnRN4caT'
			}
		}
	})
	if (res.result.msg.slice(9, 11) == 'Ok') return {success:true,msg:'mailok',u_id:userInfo.data[0]._id}
	else return {success:false,msg:res.result.msg}
};
