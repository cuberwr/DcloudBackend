'use strict';
exports.main = async (event, context) => {
	console.log('event : ', event)
	let db=await uniCloud.database().collection('SsLuw36u').doc(event.u_id)
	let userInfo=await db.get()
	if(!userInfo.affectedDocs) return({success:false,msg:'nouid'})
	if(userInfo.data[0].token!=event.token) return {
            success: false,
            msg: 'tokenerror'
        }
	let res=await uniCloud.database().collection('HhpaCpog').add({
		parts:event.parts,
		md5:event.md5,
		owner:userInfo.data[0]._id
	})
	return {success:true,id:res.id}
};
