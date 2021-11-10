'use strict';
const crypto = require('crypto')
exports.main = async (event, context) => {
	console.log('event : ', event)
	if (!(event.name || event.mail || event.phone)) return {
		success: false,
		msg: 'noid'
	}
	if (!event.pwds) return {
		success: false,
		msg: 'nopwd'
	}

	function S4() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}

	function newToken() {
		return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
	}
	let where = {}
	if (event.name) where = {
		name: event.name
	}
	if (event.mail) where = {
		mail: event.mail
	}
	if (event.phone) where = {
		phone: event.phone
	}
	let db = await uniCloud.database().collection('SsLuw36u')
	let userInfo = await db.where(where).get()
	const serverKey = 'Q9Bey1Ig3i7TM3tyjQmGyJua3f5jbnRU'
	const hash = crypto.createHash('md5')
	let passwordSec = hash.update(event.pwds + serverKey).digest('hex')
	if (!userInfo.affectedDocs) return {
		success: false,
		msg: 'nousr'
	}
	else if (userInfo.data[0].passwordSec != passwordSec) return {
		success: false,
		msg: 'passerror'
	}
	else {
		let token = newToken()
		let res = await db.doc(userInfo.data[0]._id).update({
			token: token
		})
		return {
			success: true,
			token: token,
			root: userInfo.data[0].root,
			u_id: userInfo.data[0]._id
		}
	}
};
