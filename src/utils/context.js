export default {
	get UserId() {
		return window.localStorage.UserId;
	},
	set UserId(userId) {
		window.localStorage.UserId = userId;
	},
	get ServiceUnitId() {
		return window.localStorage.ServiceUnitId;
	},
	set ServiceUnitId(serviceUnitId) {
		window.localStorage.ServiceUnitId = serviceUnitId;
	},
	set CooperatedId(cooperatedId) {
		window.localStorage.CooperatedId = cooperatedId
	},
	get CooperatedId() {
		return window.localStorage.CooperatedId;
	},
	set LoginName(loginName) {
		window.localStorage.LoginName = loginName;
	},
	get LoginName() {
		return window.localStorage.LoginName;
	},
	set Id(id) {
		window.localStorage.Id = id;
	},
	get Id() {
		return window.localStorage.Id;
	},
	set UnitName(unitName) {
		window.localStorage.UnitName = unitName;
	},
	get UnitName() {
		return window.localStorage.UnitName;
	},
	clear: function() {
		window.localStorage.clear();
	}
}