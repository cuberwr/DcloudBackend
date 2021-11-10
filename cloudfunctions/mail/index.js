'use strict';
var nodemailer = require('nodemailer');
exports.main = async (event, context) => {
	console.log('event : ', event)
	if(!event.hasOwnProperty('cloudKey')||event.cloudKey!='FNKNYjGKJrnWmimYNEftvArGwnRN4caT') return {success:false,msg:'ckerror'}
	var transporter = nodemailer.createTransport({
	    "host": "smtpdm.aliyun.com",
	    "port": 465,
	    "secureConnection": true, // use SSL, the port is 465
	    "auth": {
	        "user": 'account@geekwr.cn', 
	        "pass": '1234qwerASDF'        
	    }
	});
	
	let id=await uniCloud.database().collection('cJ7oXhZc').add({type:event.type,data:event.data})
	id=id.id
	console.log(id)
	let link=`http://sign.geekwr.cn/?${id}`
	var mailOptions = {
		subject:'GEECLOUD邮箱验证',
	    from: '"GEECLOUD用户系统" <account@geekwr.cn>', // sender address mailfrom must be same with the user
	    to: event.mail, // list of receivers
	    html: `
		<h3>【GEECLOUD】</h3>
		<br>
		<a href="${link}"><h3>点击验证阁下的邮箱</h3></a>
		<br>
		<br>
		如果点击后无法跳转，请复制以下链接至浏览器打开
		<br>
		${link}
		`
	};
	let success=true
	async function send(){
		return new Promise(resolve=>{
			transporter.sendMail(mailOptions, function(error, info){
			    if(error){
					success=false
			        resolve(error);
			    }
				resolve(info.response)
			});
		})
	}
	
	let res= await send()
	console.log(res)

	return {success:success,msg:res}
};
