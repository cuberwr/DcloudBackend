'use strict';
const crypto = require('crypto')
exports.main = async (event, context) => {
	console.log('event : ', event)
	let db = await uniCloud.database().collection('SsLuw36u')

	let chk = {
		name: 0,
		phone: 0,
		mail: 0
	}

	const serverKey = 'Q9Bey1Ig3i7TM3tyjQmGyJua3f5jbnRU'
	const appKey = 'fPfWjzELZMwGtxCQTtcINYQmOo4fkVWW'

	if (event.name) {
		chk.name = await db.where({
			name: event.name
		}).get()
		chk.name = chk.name.affectedDocs
	}
	if (event.phone) {
		chk.phone = await db.where({
			phone: event.phone
		}).get()
		chk.phone = chk.phone.affectedDocs
	}
	if (event.mail) {
		chk.mail = await db.where({
			mail: event.mail
		}).get()
		chk.mail = chk.mail.affectedDocs
	}


	if (chk.name || chk.mail || chk.phone) return {
		success: false,
		msg: 'haveusr',
		chk: chk
	}
	else {
		const hash = crypto.createHash('md5')
		let userInfo = {
			"name": event.name,
			"token": '',
			"tokenDate": Date.now(),
			"passwordSec": "",
			"mail": event.mail,
			"phone": event.phone,
			"root": {"&~path":['/']}
		}
		userInfo.passwordSec = hash.update(event.pwds + serverKey).digest('hex')
		let res = await uniCloud.callFunction({
			name: 'mail',
			data: {
				cloudKey:'FNKNYjGKJrnWmimYNEftvArGwnRN4caT',
				type: 'addusr',
				data: userInfo,
				mail:event.mail
			}
		})
		console.log(res.result.msg.slice(9, 11))
		if (res.result.msg.slice(9, 11) == 'Ok') return {success:true,msg:'mailok'}
		else return {success:false,msg:res.result.msg}

	}

};
