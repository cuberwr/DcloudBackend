'use strict';
const crypto = require('crypto')
exports.main = async (event, context) => {
	console.log('event : ', event)
	let db = await uniCloud.database().collection('SsLuw36u')

	let chk = {
		name: 0,
		phone: 0,
		mail: 0,
		u_id:''
	}

	const serverKey = 'Q9Bey1Ig3i7TM3tyjQmGyJua3f5jbnRU'
	const appKey = 'fPfWjzELZMwGtxCQTtcINYQmOo4fkVWW'

	if (event.name) {
		chk.nameRes = await db.where({
			name: event.name
		}).get()
		chk.name = chk.nameRes.affectedDocs
		if(chk.name) chk.u_id=chk.nameRes.data[0]._id
	}
	if (event.phone) {
		chk.phoneRes = await db.where({
			phone: event.phone
		}).get()
		chk.phone = chk.phoneRes.affectedDocs
		if(chk.phone) chk.u_id=chk.phoneRes.data[0]._id
	}
	if (event.mail) {
		chk.mailRes = await db.where({
			mail: event.mail
		}).get()
		chk.mail = chk.mailRes.affectedDocs
		if(chk.mail) chk.u_id=chk.mailRes.data[0]._id
	}


	if (!(chk.mail||chk.phone||chk.name)) return {
		success: false,
		msg: 'nousr',
		chk: chk
	}
	else {
		const hash = crypto.createHash('md5')
		let userInfo = {
			cloudKey:'FNKNYjGKJrnWmimYNEftvArGwnRN4caT',
			"token": '',
			u_id:chk.u_id,
			"passwordSec": ""
		}
		userInfo.passwordSec = hash.update(event.pwds + serverKey).digest('hex')
		let res = await uniCloud.callFunction({
			name: 'mail',
			data: {
				cloudKey:'FNKNYjGKJrnWmimYNEftvArGwnRN4caT',
				type: 'setpwdsec',
				data: userInfo,
				mail:event.mail
			}
		})
		console.log(res.result.msg.slice(9, 11))
		if (res.result.msg.slice(9, 11) == 'Ok') return {success:true,msg:'mailok'}
		else return {success:false,msg:res.result.msg}

	}

};
