'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let res = {}
	let doc = uniCloud.database().collection('cJ7oXhZc').doc(event.queryStringParameters.id)
	let data = await doc.get()
	data = data.data[0]
	data.data.cloudKey='FNKNYjGKJrnWmimYNEftvArGwnRN4caT'
	res =await uniCloud.callFunction({
		name: data.type,
		data:data.data
	})
	if(res.result.success){
		await doc.remove()
		switch(data.type){
			case 'addusr':return{success:true,msg:'阁下的账号已完成注册，可以使用了'}
			case 'upLocalToken':return{success:true,msg:'登录完成'}
			case 'setpwdsec':return{success:true,msg:'密码已修改，以后请使用新密码登录'}
			case 'bind':return{success:true,msg:'绑定成功'}
		}
	}else return {success:false,msg:res.result.msg}

};
