
import config from './config'
export default {
	//性别显示转换
	formatGender: function(row) {
		return row.Grade == 0 ? '大班' : row.Grade == 1 ? '中班' : '小班';
	},
	formatBirthday: function(row) {
		if(row.CreateTime) {
			var dt = new Date(parseInt(row.CreateTime.slice(6, 19)));
			var year = dt.getFullYear();
			var month = dt.getMonth() + 1;
			var date = dt.getDate();
			var createTime = (year + "-" + month + "-" + date).replace(/\b(\w)\b/g, '0$1');
			return createTime;
		} else {
			return '未知';
		}

	},
	formatRepstr: function(txt) {
		var level1Count = 1;
		var level2Arr = ['a', 'b', 'c', 'd', 'e'];
		var level2Count = 0;
		var result = "";
		var index = 0;
		var temp = 0;
		//处理#标题
		while(true) {
			temp = txt.indexOf("# ", index);
			//没有'# '需要处理
			if(temp == -1) {
				result += txt.slice(index);
				break;
			} else {
				//处理'## '
				if(temp > 0 && txt.slice(temp - 1, temp + 2) == "## ") {
					temp = temp - 1;
					result += txt.slice(index, temp);
					result += level2Arr[level2Count++] + ". ";
					index = temp + 3;
				} else {
					result += txt.slice(index, temp);
					result += level1Count + '. ';
					level1Count++;
					level2Count = 0;
					index = temp + 2;
				}
			}
		}
		//处理**特殊显示
		//"(?<=\{)[^}]*(?=\})"，这个是不包含两边{}
		//"(\{)[^}]*(\})", 这个包含两边{}
		var reg1 = result.match(/(\{)[^}]*(\})/g); //原文中需要特殊处理的字符
		var reg2 = result.match(/(\{)[^}]*(\})/g); //原文中需要替换的字符
		for(var index in reg1) {
			result = result.replace(reg2[index], "<font color='#FF0000'>" + reg1[index] + "</font>")
		}
		return result;
	},
	formatMotorType: function(row) {
		debugger;
		let actionDeve=config.actionDevelopment;	
		let motor = row.MotorType;
		let mun1= motor.substring(0, 2);
		for(let i in actionDeve.lenght) {
			console.log(actionDeve[i]);
		} 
	
	}

}