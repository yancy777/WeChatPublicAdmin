export default {	
	formatBirthday: function(row) {
		if(row.CreateTime) {
			if(row.CreateTime) {
				var dt = new Date(parseInt(row.CreateTime.slice(6, 19)));
				var year = dt.getFullYear();
				var month = dt.getMonth() + 1;
				var date = dt.getDate();
				var createTime = (year + "-" + month + "-" + date).replace(/\b(\w)\b/g, '0$1');
				return createTime;
			}
		} else {
			return '未知';
		}

	},
}