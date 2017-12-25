<!--
**************************************
*   名称：自定义菜单
*   作用：微信界面自定义菜单
*   作者：耿啸
**************************************
-->
<template>
    <div>
        <p class="title">自定义菜单</p>
        <div class="wechat-edit">
            <div class="wechat-edit-head">睿莱科技</div>
            <div class="wechat-edit-bottom">
                <div class="edit-bottom-keyword"><img src="/static/images/wechat-keyword.png" alt="" /></div>            
                <div class="wechat-edit-menu">
                    <ul class="firstMenu" :style="{width:addWidth + '%'}" @click="addMenu()">
                        <li>{{addMenuName}}</li>
                    </ul>
                    <ul :style="{ width: widthOne + '%','margin-top':topOne + 'px'}">
                        <li class="listOne" v-for = '(item,index) in transverseObj.menuOne' @click="addMenuOne(index)">{{item}}</li>
                    </ul>
                    <ul :style="{ width: widthTwo + '%','margin-top':topTwo + 'px'}">
                        <li class="listTwo" v-for = '(item,index) in transverseObj.menuTwo' @click="addMenuTwo(index)">{{item}}</li>
                    </ul>
                    <ul :style="{ width: widthThree + '%','margin-top':topThree + 'px'}">
                        <li class="listThree" v-for = '(item,index) in transverseObj.menuThree' @click="addMenuThree(index)">{{item}}</li>
                    </ul>
                </div>
            </div>
        </div> 
        <div class="wechat-dialog">
            <div class="wechat-dialog-head">
                <p class="report">查看报告</p>
                <p class="deleat" @click = "deleatMenu()">删除菜单</p>
            </div>
            <div class="menu-list">
                <label class="menu-list-input">菜单名称<input class="change-munu" v-on:keyup = "goBlur()" type="text" v-model="menuName"></label>
                <p class="prompt" style="color : #da2337" v-if="isBeyondText">字数不符合规定</p>
                <p class="prompt" v-if="isBeyond">字数不超过4个汉字或8个字母</p>
                <p class="prompt" v-else>字数不超过8个汉字或16个字母</p>
            </div>
            <div v-if = "isMenuContent">
                <div class="menu-content">
                    <span>菜单内容</span>
                    <el-radio v-model="radio" label="1">发送消息</el-radio>
                    <el-radio v-model="radio" label="2">跳转网页</el-radio>   
                </div>
                <div class="menu-url" v-if="radio==2?true:false">
                    <p class="menu-url-title">订阅者点击该菜单会跳到以下链接</p>
                    <label class="menu-url-input">页面地址<input class="network" type="text" placeholder="https://www.baidu.com" v-model="netData" v-on:change = "goNet()"/></label>
                    <p class="menu-url-btn" v-if='isNetWork'>输入的网站地址格式错误</p>
                </div>
                <div class="menu-message" v-else>
                    <el-upload
                      class="upload-demo"
                      drag
                      :action="UploadUrl()"
                      :limit="1"
                      :before-upload="beforeAvatarUpload"
                      :on-success="successThing"
                      multiple>
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                      <div class="el-upload__tip" slot="tip">只能上传jpg/jpeg/gif/png/bmp文件，且不超过2M</div>
                    </el-upload>
                </div>
                <div class="menuBorder" v-if="havContent">请给菜单添加内容</div> 
            </div>    
        </div>
        <div class="clear"></div>
        <div class="button-list">
<!--             <button class="menu-btn">菜单排序</button> -->
            <button class="preservation-btn" @click="preservation()">保存并发布</button>
<!--             <button class="preview-btn">预览</button> -->
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop';
    import asideNav from '../components/asideNav';
    import Vue from "vue";
    export default {
        data(){
            return{
                radio:'1',
                menuName:'', //菜单名称变量
                transverseArr:[],//控制横向菜单的个数，最对三个，数组内容随意，只需要长度
                transverseObj:{  
                    'menuOne':[],  //第一列子菜单，‘+’，主菜单组成的数组
                    'menuTwo':[],   //第二列子菜单，‘+’，主菜单组成的数组
                    'menuThree':[]  //第三列子菜单，‘+’，主菜单组成的数组
                },
                picName:'',//上传图片的名字
                picIsUplod:false,//图片是否上传成功的状态
                imageUrl: '',
                havContent: false,
                isBeyond:true, //菜单内容的切换
                isBeyondText:false,//提示文字
                isNetWork:false,//网址格式验证
                widthOne:0, //第一列菜单的宽度
                widthTwo:0,  //第二列菜单的宽度
                widthThree:0,   //第三列菜单的宽度
                addWidth:100,   //增加主菜单按钮的宽度
                addMenuName:'+添加菜单',  //增加主菜单按钮的内容
                topOne:-49, //第一列菜单的margin，通过负数来控制保证底部对其
                topTwo:-49, //第二列菜单的margin，通过负数来控制保证底部对其
                topThree:-49,   //第三列菜单的margin，通过负数来控制保证底部对其
                indexOne:0, //第一列菜单li的索引值
                indexTwo:0, //第二列菜单li的索引值
                indexThree:0,   //第三列菜单li的索引值
                whatMenu:1,  //一个中间值，判断点击了哪一列菜单
                postArr:[],
                netData:'',  //输入网址的值
                netDataArrOne:[],  //第一列菜单每个li所包含的信息综合
                netDataArrTwo:[],   //第二列菜单每个li所包含的信息综合
                netDataArrThree:[], //第三列菜单每个li所包含的信息综合
                isMenuContent:true  //控制能否给菜单添加功能
            };
        },
        methods:{
            beforeAvatarUpload(file) {
                this.picName = file.name;
                const isJPEG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isJPG = file.type === 'image/jpg';
                const isGIF = file.type === 'image/gif';
                const isBMP = file.type === 'image/bmp';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPEG&&!isPNG&&!isJPG&&!isGIF&&!isBMP) {
                  this.$message.error('上传图片只能是 jpg/jpeg/gif/png/bmp 格式!');
                }
                if (!isLt2M) {
                  this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPEG && isLt2M && isPNG && isJPG && isGIF && isBMP;
            },
            addMenu(){ //添加主菜单的方法
                if(this.transverseArr.length === 0){ //长度为0时，说明主菜单区域为空，以下依次类推
                    let menuOneObj = {};
                    //通过控制宽度，实现主菜单区域样式的自适应
                    this.widthOne = 50;
                    this.addWidth = 50;
                    this.addMenuName = '+'
                    this.transverseArr.unshift('菜单一');//此处添加内容无意义，只需要该数组的长度
                    this.transverseObj.menuOne = ['+','主菜单']; //当添加一个主菜单时，默认给第一列数组添加两个li
                    //---给第一列的每一个li添加name和type的属性，主菜单type为1，子菜单type为2
                    menuOneObj.name = '主菜单';  
                    menuOneObj.type = '1';
                    this.netDataArrOne.unshift(menuOneObj);
                }else if(this.transverseArr.length === 1){
                    let menuTwoObj = {};
                    this.transverseObj.menuTwo = [];
                    this.transverseObj.menuTwo = ['+','主菜单'];
                    this.widthOne = 33.3;
                    this.widthTwo = 33.3;
                    this.addWidth = 33.3;
                    this.transverseArr.unshift('菜单二');
                    menuTwoObj.name = '主菜单';
                    menuTwoObj.type = '1';
                    this.netDataArrTwo.unshift(menuTwoObj);
                }else if(this.transverseArr.length === 2){
                    let menuThreeObj = {};
                    this.transverseObj.menuThree = [];
                    this.transverseObj.menuThree = ['+','主菜单'];
                    this.addWidth = 0;
                    this.widthThree = 33.3;
                    this.addMenuName = '';
                    this.transverseArr.unshift('菜单三');
                    menuThreeObj.name = '主菜单';
                    menuThreeObj.type = '1';
                    this.netDataArrThree.unshift(menuThreeObj);
                }

            },
            addMenuOne(index){ //给第一列主菜单添加子菜单的方法
                if(index === this.netDataArrOne.length){
                    if(this.netDataArrOne[index-1].url){
                        this.menuName = this.netDataArrOne[index-1].name;
                        this.netData = this.netDataArrOne[index-1].url;
                    }else{
                        this.menuName = this.netDataArrOne[index-1].name;
                    }
                }else{
                    if(this.netDataArrOne[index].url){
                        this.menuName = this.netDataArrOne[index].name;
                        this.netData = this.netDataArrOne[index].url;
                    }
                }
                
                this.havContent = false;
                var aLi = document.getElementsByClassName('listOne');  //获取第一列主菜单所有的li，添加点击边框变色的效果
                var oLi = document.getElementsByTagName('li'); //获取所有的li，为了重置边框的颜色
                for(let i=0,length = oLi.length;i<length;i++){
                    oLi[i].style.borderColor = '#dcdcdc';
                }
                aLi[index].style.borderColor = '#da2337';
                this.whatMenu = 1; //判断点击了哪一列菜单
                var changeInput = document.getElementsByClassName('change-munu')[0]; //获取到菜单名称input，以添加获取焦点事件
                if(this.transverseObj.menuOne[index] !== '+'){  //判断点击的不是添加按钮，而是子菜单，因为+和子菜单同属于一个数组，需要区别开来
                    this.isMenuContent = true; //重置菜单内容，使其显示
                    if(this.transverseObj.menuOne.length > 2&& index == this.transverseObj.menuOne.length-1){
                        this.isMenuContent = false;
                    } //判断当该列菜单数组的长度大于2，即含有子菜单，则点击主菜单按钮隐藏菜单内容功能
                    changeInput.focus();
                    this.indexOne = index;//存储通过循环获取的index，以便所有函数都能调用到点击的li的索引
                    if(index == this.transverseObj.menuOne.length-1){
                        this.isBeyond = true;
                    }else{
                        this.isBeyond = false;
                    }
                }  
                //点击添加按钮添加子菜单
                if(this.transverseObj.menuOne.length < 6&&this.transverseObj.menuOne[index]==='+'){
                    let menuOneObj = {};
                    this.transverseObj.menuOne.unshift('子菜单');
                    this.topOne -= 49; //每添加一个子菜单，则把整个ul向上移动一个li的高度
                    menuOneObj.name = '子菜单';
                    menuOneObj.type = '2'; //给子菜单添加name和type属性
                    this.netDataArrOne.unshift(menuOneObj);
                }else if(this.transverseObj.menuOne.length === 6&&this.transverseObj.menuOne[index]==='+'){
                    //此步作用在于当子菜单为4个时，再点击添加，则添加按钮本身变成第五个子菜单，保证最多只能添加5个子菜单
                    let menuOneObj = {};
                    this.transverseObj.menuOne.splice(4,1,'子菜单');
                    menuOneObj.name = '子菜单';
                    menuOneObj.type = '2';
                    // this.netDataArrOne.unshift(menuOneObj);
                    this.netDataArrOne.splice(4,0,menuOneObj);
                }            
            },   
            addMenuTwo(index){
                if(index === this.netDataArrTwo.length){
                    if(this.netDataArrTwo[index-1].url){
                        this.menuName = this.netDataArrTwo[index-1].name;
                        this.netData = this.netDataArrTwo[index-1].url;
                    }else{
                        this.menuName = this.netDataArrTwo[index-1].name;
                    }
                }else{
                    if(this.netDataArrTwo[index].url){
                        this.menuName = this.netDataArrTwo[index].name;
                        this.netData = this.netDataArrTwo[index].url;
                    }
                }
                this.havContent = false;
                var aLi = document.getElementsByClassName('listTwo');
                var oLi = document.getElementsByTagName('li');
                for(let i=0,length = oLi.length;i<length;i++){
                    oLi[i].style.borderColor = '#dcdcdc';
                }
                aLi[index].style.borderColor = '#da2337';
                this.whatMenu = 2;
                var changeInput = document.getElementsByClassName('change-munu')[0];
                if(this.transverseObj.menuTwo[index] !== '+'){
                    this.isMenuContent = true;
                    if(this.transverseObj.menuTwo.length > 2&& index == this.transverseObj.menuTwo.length-1){
                        this.isMenuContent = false;
                    }
                    changeInput.focus();
                    this.indexTwo = index;
                    if(index == this.transverseObj.menuTwo.length-1){
                        this.isBeyond = true;
                    }else{
                        this.isBeyond = false;
                    }
                }
                if(this.transverseObj.menuTwo.length < 6&&this.transverseObj.menuTwo[index]==='+'){
                    let menuTwoObj = {};
                    this.transverseObj.menuTwo.unshift('子菜单');
                    this.topTwo -= 49;
                    menuTwoObj.name = '子菜单';
                    menuTwoObj.type = '2';
                    this.netDataArrTwo.unshift(menuTwoObj);
                }else if(this.transverseObj.menuTwo.length === 6&&this.transverseObj.menuTwo[index]==='+'){
                    let menuTwoObj = {};
                    this.transverseObj.menuTwo.splice(4,1,'子菜单');
                    menuTwoObj.name = '子菜单';
                    menuTwoObj.type = '2';
                    // this.netDataArrTwo.unshift(menuTwoObj);
                    this.netDataArrTwo.splice(4,0,menuTwoObj)
                }
            },
            addMenuThree(index){
                if(index === this.netDataArrThree.length){
                    if(this.netDataArrThree[index-1].url){
                        this.menuName = this.netDataArrThree[index-1].name;
                        this.netData = this.netDataArrThree[index-1].url;
                    }else{
                        this.menuName = this.netDataArrThree[index-1].name;
                    }
                }else{
                    if(this.netDataArrThree[index].url){
                        this.menuName = this.netDataArrThree[index].name;
                        this.netData = this.netDataArrThree[index].url;
                    }
                }
                this.havContent = false;
                var aLi = document.getElementsByClassName('listThree');
                var oLi = document.getElementsByTagName('li');
                for(let i=0,length = oLi.length;i<length;i++){
                    oLi[i].style.borderColor = '#dcdcdc';
                }
                aLi[index].style.borderColor = '#da2337';
                this.whatMenu = 3;
                var changeInput = document.getElementsByClassName('change-munu')[0];
                if(this.transverseObj.menuThree[index] !== '+'){
                    this.isMenuContent = true;
                    if(this.transverseObj.menuThree.length > 2&& index == this.transverseObj.menuThree.length-1){
                        this.isMenuContent = false;
                    }
                    changeInput.focus();
                    this.indexThree = index;
                    if(index == this.transverseObj.menuThree.length-1){
                        this.isBeyond = true;
                    }else{
                        this.isBeyond = false;
                    }
                }
                if(this.transverseObj.menuThree.length < 6&&this.transverseObj.menuThree[index]==='+'){
                    let menuThreeObj = {};
                    this.transverseObj.menuThree.unshift('子菜单');
                    this.topThree -= 49;
                    menuThreeObj.name = '子菜单';
                    menuThreeObj.type = '2';
                    this.netDataArrThree.unshift(menuThreeObj);
                }else if(this.transverseObj.menuThree.length === 6&&this.transverseObj.menuThree[index]==='+'){
                    let menuThreeObj = {};
                    this.transverseObj.menuThree.splice(4,1,'子菜单');
                    menuThreeObj.name = '子菜单';
                    menuThreeObj.type = '2';
                    // this.netDataArrThree.unshift(menuThreeObj);
                    this.netDataArrThree.splice(4,0,menuThreeObj)
                }
            },
            UploadUrl(){
                return process.env.API_ROOT + '/files/WxImg/';
            },
            goBlur(){ //给每一个菜单绑定菜单名称输入框的值
                this.havContent = false;
                this.menuContent();
                if(this.whatMenu === 1&&this.widthOne !==0){
                    this.transverseObj.menuOne.splice(this.indexOne,1,this.menuName);  //把菜单名称的内容赋值给对应的菜单  
                    if(this.indexOne === this.netDataArrOne.length){ //因为netDataArrOne中是不包含+这一项的，所以该数组会比实际菜单数组的长度小一，当点击主菜单时添加该判断
                        this.netDataArrOne[this.indexOne-1].name = this.menuName;
                    }else{
                        this.netDataArrOne[this.indexOne].name = this.menuName;
                    }
                }else if(this.whatMenu === 2&&this.widthTwo !==0){
                    this.transverseObj.menuTwo.splice(this.indexTwo,1,this.menuName);
                    if(this.indexTwo === this.netDataArrTwo.length){
                        this.netDataArrTwo[this.indexTwo-1].name = this.menuName;
                    }else{
                        this.netDataArrTwo[this.indexTwo].name = this.menuName;
                    }
                }else if(this.whatMenu === 3&&this.widthThree !==0){
                    this.transverseObj.menuThree.splice(this.indexThree,1,this.menuName);  
                    if(this.indexThree === this.netDataArrThree.length){
                        this.netDataArrThree[this.indexThree-1].name = this.menuName;
                    }else{
                        this.netDataArrThree[this.indexThree].name = this.menuName;
                    }
                }    
            },
            deleatMenu(){//删除菜单的方法
                this.havContent = false;
                if(this.whatMenu === 1){
                    if(this.indexOne === this.transverseObj.menuOne.length - 1){  //判断选中删除的是子菜单还是主菜单
                        //此处删除逻辑，当主菜单个数为一个时，直接删除该主菜单即可，若主菜单为2个，若点击删除第一个主菜单，则需要把主菜单2对应的数组赋值给主菜单1的数组，然后删除主菜单2的数组，如果主菜单个数为3时，依次类推，只删除后面的，把后面的赋值给前面的
                        if(this.transverseArr.length ==1){  
                            //删除菜单，对应的每个li所包含的信息综合的数组也要发生变化，删除方法同菜单数组

                            //删除li包含信息的数组
                            this.netDataArrOne.splice(0,this.netDataArrOne.length);
                            //删除菜单数组
                            this.transverseObj.menuOne.splice(0,this.transverseObj.menuOne.length);                           
                            this.transverseArr.pop();                
                            this.addWidth = 100;
                            this.widthOne = 0;
                            this.topOne = -49;
                            this.addMenuName = '+添加菜单'
                        }else if(this.transverseArr.length ==2){
                            //删除li包含信息的数组
                            this.netDataArrOne.splice(0,this.netDataArrOne.length);
                            for(let i=0,length = this.netDataArrTwo.length;i<length;i++){
                                this.netDataArrOne.splice(i,0,this.netDataArrTwo[i]);
                            }
                            this.netDataArrTwo.splice(0,this.netDataArrTwo.length);  
                            //删除菜单数组  
                            this.transverseObj.menuOne.splice(0,this.transverseObj.menuOne.length);
                            for(let i=0;i<this.transverseObj.menuTwo.length;i++){
                                this.transverseObj.menuOne.splice(i,0,this.transverseObj.menuTwo[i])
                            }
                            this.transverseObj.menuTwo.splice(0,this.transverseObj.menuTwo.length);
                            this.transverseArr.pop();
                            this.widthOne = 50;
                            this.addWidth = 50;
                            this.widthTwo = 0;
                            this.topOne = -49*(this.transverseObj.menuOne.length-1);
                            this.topTwo = -49;
                        }else if(this.transverseArr.length ==3){
                            //删除li包含信息的数组
                            this.netDataArrOne.splice(0,this.netDataArrOne.length);
                            for(let i=0,length = this.netDataArrTwo.length;i<length;i++){
                                this.netDataArrOne.splice(i,0,this.netDataArrTwo[i]);
                            }
                            this.netDataArrTwo.splice(0,this.netDataArrTwo.length);
                            for(let i=0,length = this.netDataArrThree.length;i<length;i++){
                                this.netDataArrTwo.splice(i,0,this.netDataArrThree[i]);
                            }
                            this.netDataArrThree.splice(0,this.netDataArrThree.length);
                            //删除菜单数组 
                            this.transverseObj.menuOne.splice(0,this.transverseObj.menuOne.length);
                            for(let i=0;i<this.transverseObj.menuTwo.length;i++){
                                this.transverseObj.menuOne.splice(i,0,this.transverseObj.menuTwo[i])
                            }
                            this.transverseObj.menuTwo.splice(0,this.transverseObj.menuTwo.length);
                            for(let i=0;i<this.transverseObj.menuThree.length;i++){
                                this.transverseObj.menuTwo.splice(i,0,this.transverseObj.menuThree[i])
                            }
                            this.transverseObj.menuThree.splice(0,this.transverseObj.menuThree.length);
                            this.transverseArr.pop();
                            this.widthOne = 33.3;
                            this.addWidth = 33.3;
                            this.widthTwo = 33.3;
                            this.widthThree = 0;
                            this.addMenuName = '+';
                            this.topOne = -49*(this.transverseObj.menuOne.length-1);
                            this.topTwo = -49*(this.transverseObj.menuTwo.length-1);
                            this.topThree = -49;
                        }
                    }else{
                        this.netDataArrOne.splice(this.indexOne,1);
                        this.transverseObj.menuOne.splice(this.indexOne,1);
                        this.topOne += 49;
                    }
                }else if(this.whatMenu === 2){
                    if(this.indexTwo === this.transverseObj.menuTwo.length - 1){
                        if(this.transverseArr.length ==2){
                            this.netDataArrTwo.splice(0,this.netDataArrTwo.length);
                            this.transverseObj.menuTwo.splice(0,this.transverseObj.menuTwo.length);
                            this.transverseArr.pop();
                            this.widthOne = 50;
                            this.addWidth = 50;
                            this.widthTwo = 0;
                            this.topTwo = -49;
                        }else if(this.transverseArr.length ==3){
                            this.netDataArrTwo.splice(0,this.netDataArrTwo.length);
                            for(let i=0,length = this.netDataArrThree.length;i<length;i++){
                                this.netDataArrTwo.splice(i,0,this.netDataArrThree[i]);
                            }
                            this.netDataArrThree.splice(0,this.netDataArrThree.length);


                            this.transverseObj.menuTwo.splice(0,this.transverseObj.menuTwo.length);
                            for(let i=0;i<this.transverseObj.menuThree.length;i++){
                                this.transverseObj.menuTwo.splice(i,0,this.transverseObj.menuThree[i])
                            }
                            this.transverseObj.menuThree.splice(0,this.transverseObj.menuThree.length);
                            this.transverseArr.pop();
                            this.widthOne = 33.3;
                            this.addWidth = 33.3;
                            this.widthTwo = 33.3;
                            this.widthThree = 0;
                            this.addMenuName = '+';
                            this.topTwo = -49*(this.transverseObj.menuTwo.length-1);
                            this.topThree = -49;
                        }
                    }else{
                        this.netDataArrTwo.splice(this.indexTwo,1);
                        this.transverseObj.menuTwo.splice(this.indexTwo,1);
                        this.topTwo += 49;
                    }
                }else if(this.whatMenu === 3){
                    if(this.indexThree === this.transverseObj.menuThree.length - 1){
                        this.netDataArrThree.splice(0,this.netDataArrThree.length);
                        this.transverseObj.menuThree.splice(0,this.transverseObj.menuThree.length);
                        this.transverseArr.pop();
                        this.widthOne = 33.3;
                        this.addWidth = 33.3;
                        this.widthTwo = 33.3;
                        this.widthThree = 0;
                        this.addMenuName = '+';
                        this.topThree = -49;
                    }else{
                        this.netDataArrThree.splice(this.indexThree,1);
                        this.transverseObj.menuThree.splice(this.indexThree,1);
                        this.topThree += 49;
                    }
                    
                }
            },
            preservation(){ //保存提交
                
                var objOne = {};
                var objTwo = {};
                var objThree = {};
                this.postArr = []; //删除菜单时重置数组
                this.havContent = false;
                if(this.netDataArrOne.length === 1){
                    objOne.name = this.netDataArrOne[0].name;
                    if(this.netDataArrOne[0].url){
                        objOne.type = 'view';    
                        objOne.url = this.netDataArrOne[0].url;
                    }else if(this.netDataArrOne[0].media_id){
                        objOne.type = 'media_id';
                        objOne.media_id = this.netDataArrOne[0].media_id;
                    }
                }else if(this.netDataArrOne.length > 1){
                    let subButton = [];
                    for(let i=0,length = this.netDataArrOne.length;i<length;i++){
                        if(this.netDataArrOne[i].type === '1'){
                            objOne.name = this.netDataArrOne[i].name;
                        }else{
                            let sonObj = {};
                            sonObj.name =  this.netDataArrOne[i].name;
                            if(this.netDataArrOne[i].url){   
                               sonObj.type = 'view';
                               sonObj.url = this.netDataArrOne[i].url;
                            }else if(this.netDataArrOne[i].media_id){
                                sonObj.type = 'media_id';
                                sonObj.media_id = this.netDataArrOne[i].media_id;
                            }
                            subButton.push(sonObj);                          
                        }
                    }
                    objOne.sub_button = subButton;
                }  

                if(this.netDataArrTwo.length === 1){
                    objTwo.name = this.netDataArrTwo[0].name;
                    if(this.netDataArrTwo[0].url){
                        objTwo.type = 'view';    
                        objTwo.url = this.netDataArrTwo[0].url;
                    }else if(this.netDataArrTwo[0].media_id){
                        objTwo.type = 'media_id';
                        objTwo.media_id = this.netDataArrTwo[0].media_id;
                    }
                }else if(this.netDataArrTwo.length > 1){
                    let subButton = [];
                    for(let i=0,length = this.netDataArrTwo.length;i<length;i++){
                        if(this.netDataArrTwo[i].type === '1'){
                            objTwo.name = this.netDataArrTwo[i].name;
                        }else{
                            let sonObj = {};
                            sonObj.name =  this.netDataArrTwo[i].name;
                            if(this.netDataArrTwo[i].url){   
                               sonObj.type = 'view';
                               sonObj.url = this.netDataArrTwo[i].url;
                            }else if(this.netDataArrTwo[i].media_id){
                                sonObj.type = 'media_id';
                                sonObj.media_id = this.netDataArrTwo[i].media_id;
                            }
                            subButton.push(sonObj);                          
                        }
                    }
                    objTwo.sub_button = subButton;
                }

                if(this.netDataArrThree.length === 1){
                    objThree.name = this.netDataArrThree[0].name;
                    if(this.netDataArrThree[0].url){
                        objThree.type = 'view';    
                        objThree.url = this.netDataArrThree[0].url;
                    }else if(this.netDataArrThree[0].media_id){
                        objThree.type = 'media_id';
                        objThree.media_id = this.netDataArrThree[0].media_id;
                    }
                }else if(this.netDataArrThree.length > 1){
                    let subButton = [];
                    for(let i=0,length = this.netDataArrThree.length;i<length;i++){
                        if(this.netDataArrThree[i].type === '1'){
                            objThree.name = this.netDataArrThree[i].name;
                        }else{
                            let sonObj = {};
                            sonObj.name =  this.netDataArrThree[i].name;
                            if(this.netDataArrThree[i].url){   
                               sonObj.type = 'view';
                               sonObj.url = this.netDataArrThree[i].url;
                            }else if(this.netDataArrThree[i].media_id){
                                sonObj.type = 'media_id';
                                sonObj.media_id = this.netDataArrThree[i].media_id;
                            }
                            subButton.push(sonObj);                          
                        }
                    }
                    objThree.sub_button = subButton;
                }
                if(objThree.name == null&&objTwo.name != null){
                   this.postArr.push(objOne);
                   this.postArr.push(objTwo); 
                }else if(objThree.name == null&&objTwo.name == null){
                    this.postArr.push(objOne);
                }else{
                    this.postArr.push(objOne);
                    this.postArr.push(objTwo);
                    this.postArr.push(objThree);
                }
                
                var buttonObj = {};
                var oneLi = document.getElementsByClassName('listOne');
                var twoLi = document.getElementsByClassName('listTwo');
                var threeLi = document.getElementsByClassName('listThree');//获取菜单dom,后面验证使用
                var flag = true; //验证的决定值
                buttonObj.button = this.postArr;
                console.log(JSON.stringify(buttonObj));
                if(this.netDataArrOne.length === 1){
                    if(this.netDataArrOne[0].url == null&&this.netDataArrOne[0].media_id == null){
                        flag = false;
                        oneLi[1].click();
                        this.havContent = true;
                    }
                }else if(this.netDataArrOne.length > 1){
                    for(let i=0,length = this.netDataArrOne.length-1;i<length;i++){
                        if(this.netDataArrOne[i].url == null&&this.netDataArrOne[i].media_id == null){
                            flag = false;
                            oneLi[i].click();
                            this.havContent = true;
                        }
                    }
                }
                if(this.netDataArrTwo.length === 1){
                    if(this.netDataArrTwo[0].url == null&&this.netDataArrTwo[0].media_id == null){
                        flag = false;
                        twoLi[1].click();
                        this.havContent = true;
                    }
                }else if(this.netDataArrTwo.length > 1){
                    for(let i=0,length = this.netDataArrTwo.length-1;i<length;i++){
                        if(this.netDataArrTwo[i].url == null&&this.netDataArrTwo[i].media_id == null){
                            flag = false;
                            twoLi[i].click();
                            this.havContent = true;
                        }
                    }
                }
                if(this.netDataArrThree.length === 1){
                    if(this.netDataArrThree[0].url == null&&this.netDataArrThree[0].media_id == null){
                        flag = false;
                        threeLi[1].click();
                        this.havContent = true;
                    }
                }else if(this.netDataArrThree.length > 1){
                    for(let i=0,length = this.netDataArrThree.length-1;i<length;i++){
                        if(this.netDataArrThree[i].url == null&&this.netDataArrThree[i].media_id == null){
                            flag = false;
                            threeLi[i].click();
                            this.havContent = true;
                        }
                    }
                }
                if(flag){
                    this.$http.post('/wx/mp/customMenu',{
                        button:JSON.stringify(buttonObj) 
                    }).then(res => {
                        console.log(res);
                        if(res.data.errcode == 0&&res.data.errmsg == 'ok'){
                            this.$notify({
                                title: '成功',
                                message: '修改菜单成功',
                            });
                        }
                    })
                }                  
            },
            goNet(){//给菜单添加url的方法
                // this.webAddress();
                if(this.whatMenu === 1){
                    if(this.netDataArrOne.length === 1){ //此处判断因为netDataArrOne长度少1
                        this.netDataArrOne[this.indexOne-1]['url'] = this.netData; //给对应的菜单添加url的属性并赋值页面地址的数据
                    }else{
                        this.netDataArrOne[this.indexOne]['url'] = this.netData;
                    }
                    
                }else if(this.whatMenu === 2){
                    if(this.netDataArrTwo.length === 1){
                        this.netDataArrTwo[this.indexTwo-1]['url'] = this.netData;
                    }else{
                        this.netDataArrTwo[this.indexTwo]['url'] = this.netData;
                    }
                    
                }else if(this.whatMenu === 3){
                    if(this.netDataArrThree.length === 1){
                        this.netDataArrThree[this.indexThree-1]['url'] = this.netData;
                    }else{
                        this.netDataArrThree[this.indexThree]['url'] = this.netData;
                    }    
                }    
            },
            successThing(){//给菜单添加图片的方法
                var mediaId
                this.$http.post('/wx/mp/uploadImg',{
                    FileName:this.picName
                }).then(res =>{
                    console.log(res);
                    mediaId = res.data.media_id;
                    if(this.whatMenu === 1){
                        
                        if(this.netDataArrOne.length === 1){ //此处判断因为netDataArrOne长度少1
                            this.netDataArrOne[this.indexOne-1]['media_id'] = mediaId; //给对应的菜单添加url的属性并赋值页面地址的数据
                        }else{

                            this.netDataArrOne[this.indexOne]['media_id'] = mediaId;
                        }
                    }else if(this.whatMenu === 2){
                        if(this.netDataArrTwo.length === 1){
                            this.netDataArrTwo[this.indexTwo-1]['media_id'] = mediaId;
                        }else{
                            this.netDataArrTwo[this.indexTwo]['media_id'] = mediaId;
                        }
                        
                    }else if(this.whatMenu === 3){
                        if(this.netDataArrThree.length === 1){
                            this.netDataArrThree[this.indexThree-1]['media_id'] = mediaId;
                        }else{
                            this.netDataArrThree[this.indexThree]['media_id'] = mediaId;
                        }    
                    }
                })    
            },
            getMenuArr(){//获取菜单
                this.$http.get('/wx/mp/customMenu').then(res => {
                    console.log(res);
                    var resopnse = res.data.menu;
                    for(var i=0,length = resopnse.button.length;i<length;i++){
                        this.transverseArr.push(i);
                        if(i===0){ //给第一列菜单赋值
                            let menuOneObj = {};
                            menuOneObj.name = resopnse.button[0].name;
                            menuOneObj.type = '1';                            
                            this.transverseObj.menuOne = ['+',resopnse.button[0].name];  
                            if(resopnse.button[0].sub_button.length>0){//判断是否有子菜单    
                                for(let i=0,length = resopnse.button[0].sub_button.length;i<length;i++){
                                    let menuOneSonObj = {};
                                    this.transverseObj.menuOne.unshift(resopnse.button[0].sub_button[length-i-1].name);
                                    menuOneSonObj.name = resopnse.button[0].sub_button[i].name;
                                    menuOneSonObj.type = '2';
                                    if(resopnse.button[0].sub_button[i].url){
                                        menuOneSonObj.url = resopnse.button[0].sub_button[i].url;
                                    }else if(resopnse.button[0].sub_button[i].media_id){
                                        menuOneSonObj.media_id = resopnse.button[0].sub_button[i].media_id;
                                    }
                                    
                                    this.netDataArrOne.push(menuOneSonObj);
                                }
                            }else{
                                if(resopnse.button[0].url){
                                    menuOneObj.url = resopnse.button[0].url; 
                                }else if(resopnse.button[0].media_id){
                                    menuOneObj.media_id = resopnse.button[0].media_id;
                                }
                                                               
                            }
                            this.netDataArrOne.push(menuOneObj);
                            this.topOne = -49*(this.transverseObj.menuOne.length-1);
                        }else if(i===1){
                            let menuTwoObj = {};
                            this.transverseObj.menuTwo = ['+',resopnse.button[1].name];
                            menuTwoObj.name = resopnse.button[1].name;
                            menuTwoObj.type = '1';
                            if(resopnse.button[1].sub_button.length>0){
                                for(let i=0,length = resopnse.button[1].sub_button.length;i<length;i++){
                                    let menuTwoSonObj = {};
                                    this.transverseObj.menuTwo.unshift(resopnse.button[1].sub_button[length-i-1].name);
                                    menuTwoSonObj.name = resopnse.button[1].sub_button[i].name;
                                    menuTwoSonObj.type = '2';
                                    if(resopnse.button[1].sub_button[i].url){
                                        menuTwoSonObj.url = resopnse.button[1].sub_button[i].url;
                                    }else if(resopnse.button[1].sub_button[i].media_id){
                                        menuTwoSonObj.media_id = resopnse.button[1].sub_button[i].media_id;
                                    }
                                    this.netDataArrTwo.push(menuTwoSonObj);
                                }
                            }else{
                                if(resopnse.button[1].url){
                                    menuTwoObj.url = resopnse.button[1].url; 
                                }else if(resopnse.button[1].media_id){
                                    menuTwoObj.media_id = resopnse.button[1].media_id; 
                                }
                                
                            }
                            this.netDataArrTwo.push(menuTwoObj);
                            this.topTwo = -49*(this.transverseObj.menuTwo.length-1);
                        }else if(i===2){
                            let menuThreeObj = {};
                            this.transverseObj.menuThree = ['+',resopnse.button[2].name];
                            menuThreeObj.name = resopnse.button[2].name;
                            menuThreeObj.type = '1';
                            if(resopnse.button[2].sub_button.length>0){
                                for(let i=0,length = resopnse.button[2].sub_button.length;i<length;i++){
                                    let menuThreeSonObj = {};
                                    this.transverseObj.menuThree.unshift(resopnse.button[2].sub_button[length-i-1].name);
                                    menuThreeSonObj.name = resopnse.button[2].sub_button[i].name;
                                    menuThreeSonObj.type = '2';
                                    if(resopnse.button[2].sub_button[i].url){
                                        menuThreeSonObj.url = resopnse.button[2].sub_button[i].url;
                                    }else if(resopnse.button[2].sub_button[i].media_id){
                                        menuThreeSonObj.media_id = resopnse.button[2].sub_button[i].media_id;
                                    }
                                    
                                    this.netDataArrThree.push(menuThreeSonObj);
                                }
                            }else{
                                if(resopnse.button[2].url){
                                    menuThreeObj.url = resopnse.button[2].url;
                                }else if(resopnse.button[2].media_id){
                                    menuThreeObj.media_id = resopnse.button[2].media_id;
                                }
                            }
                            this.netDataArrThree.push(menuThreeObj);
                            this.topThree = -49*(this.transverseObj.menuThree.length-1);
                        }
                        if(this.transverseArr.length === 1){ //实现菜单区域的响应式
                            this.widthOne = 50;
                            this.addWidth = 50;
                            this.addMenuName = '+';
                        }else if(this.transverseArr.length === 2){
                            this.widthOne = 33.3;
                            this.addWidth = 33.3;
                            this.widthTwo = 33.3;
                        }else if(this.transverseArr.length === 3){
                            this.widthOne = 33.3;
                            this.addWidth = 0;
                            this.widthTwo = 33.3;
                            this.widthThree = 33.3;
                            this.addMenuName = '';
                        }
                    }
                    console.log(this.netDataArrOne);
                    console.log(this.netDataArrTwo);
                    console.log(this.netDataArrThree);
                })
                
            },
            menuContent(){//菜单内容验证函数
                this.isBeyondText = false;
                var len = 0;//输入的字节长度
                for (var i=0,length = this.menuName.length; i<length; i++) { 
                    var c = this.menuName.charCodeAt(i); 
                   //单字节加1 
                    if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) { 
                        len++; 
                    } 
                    else { 
                        len+=2; 
                    } 
                }
                if(len == 0){
                    this.isBeyondText = true;
                }else if(this.isBeyond == true && len > 8){
                    this.isBeyondText = true;
                }else if(this.isBeyond == false && len > 16){
                    this.isBeyondText = true;
                } 
            },
            // webAddress(){//网页地址验证
            //     var strRegex="^((https|http|ftp|rtsp|mms)?://)"
            //         + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@
            //         + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
            //         + "|" // 允许IP和DOMAIN（域名）
            //         + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
            //         + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
            //         + "[a-z]{2,6})" // first level domain- .com or .museum
            //         + "(:[0-9]{1,4})?" // 端口- :80
            //         + "((/?)|" // a slash isn't required if there is no file name
            //         + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
            //         var re=new RegExp(strRegex);
            //         var flag = re.test(this.netData);
            //         if(flag){
            //             this.isNetWork = false;
            //         }else{
            //             this.isNetWork = true;
            //         }
            // }
        },
        mounted() {
            this.getMenuArr();
        }


    }
</script>
<style type="text/css">
    .avatar-uploader .el-upload {
        border: 1px dashed #dcdcdc;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        margin-top: 30px;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
        padding-top: 70px;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
</style>
<style scoped>
    ul{
        padding:0;
    }
    ul li{
        list-style: none;
    }
    .title{
        font-weight: bold ;
        margin-top: 18px;
    }
    .wechat-edit{
        width:400px;
        height:730px;
        border:1px solid #e8e8ec;
        margin:30px 70px 0 37px;
        position:relative;
        float:left;
    }
    .wechat-edit .wechat-edit-head{
        height:69px;
        width:400px;
        background-color: black;
        background-image: url(/static/images/wechat-head.png);
        background-size: contain;
        background-repeat: no-repeat;
        color:#fff;
        text-align: center;
        line-height: 90px;
    }
    .wechat-edit .wechat-edit-bottom{
        height:50px;
        width:400px;
        position:absolute;
        bottom: 0;
        border-top: 1px solid #e8e8ec;
    }
    .wechat-edit .wechat-edit-bottom .edit-bottom-keyword{
        width:54px;
        height:50px;
        text-align: center;
        border-right: 1px solid #e8e8ec;
        float:left;
    }
    .wechat-edit .wechat-edit-bottom .edit-bottom-keyword img{
        width:33px;
        height:28px;
        margin-top: 10px;

    }
    .wechat-edit .wechat-edit-bottom .wechat-edit-menu{
        width:346px;
        height:auto;
        float:left;
        position:relative;
    }
    
    .wechat-edit .wechat-edit-bottom .wechat-edit-menu ul{
        width:33.3%;
        float:left;
        cursor:pointer;
    }
    .wechat-edit .wechat-edit-bottom .wechat-edit-menu ul li{
        width:100%;
        height:49px;
        text-align: center;
        line-height: 50px;
        border:1px solid #e8e8ec;
        cursor:pointer;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }
    .wechat-edit .wechat-edit-bottom .wechat-edit-menu .firstMenu{
        float:right;
        border:none;
    }
    .wechat-edit .wechat-edit-bottom .wechat-edit-menu .firstMenu li{
        border:none;
    }
    .wechat-edit .wechat-edit-bottom .wechat-edit-menu ul .add-img{
        font-size: 25px;
        line-height: 48px;
    }
    .wechat-dialog{
        width:734px;
        height:730px;
        border:1px solid #e8e8ec;
        float: left;
        margin-top: 30px;
    }
    .wechat-dialog .wechat-dialog-head{
        height:49px;
        border-bottom: 1px solid #e8e8ec;
        line-height: 49px;
    }
    .wechat-dialog .wechat-dialog-head .report{
        float:left;
        margin:0 0 0 30px;
    }
    .wechat-dialog .wechat-dialog-head .deleat{
        float:right;
        margin-right: 30px;
        color:#dc3c4c;
        font-size: 14px;
        cursor: pointer;
    }
    .wechat-dialog .wechat-dialog-head .deleat:hover{
        text-decoration: underline;
    }
    .wechat-dialog .menu-list-input{
        margin:63px 0 0 30px;
    }
    .wechat-dialog .menu-list-input input{
        width:298px;
        height:34px;
        border:1px solid #dcdcdc;
        margin-left: 20px;
        padding:0 10px;
    }
    .wechat-dialog .prompt{
        font-size: 14px;
        color:#888888;
        margin-left: 115px;
        margin-top: 10px;
    }
    .menu-content{
        margin:50px 0 0 30px;
    }
    .menu-content span{
        margin-right: 15px;
    }
    .menu-url{
        width:675px;
        border:1px solid #dcdcdc;
        margin:30px 0 0 30px;
        padding-bottom: 50px;
    }
    .menu-url .menu-url-title{
        height:63px;
        line-height: 63px;
        font-size: 14px;
        color:#888888;
        margin:0 0 0 30px;
    }
    .menu-url .menu-url-input{
        margin-left: 30px;
    }
    .menu-url .menu-url-input input{
        width:298px;
        height:34px;
        border:1px solid #dcdcdc;
        margin-left: 20px;
        padding:0 10px;
    }
    .menu-url .menu-url-btn{
        font-size: 14px;
        color:#da2337;
        margin:5px 0 0 115px;
    }
    .menu-message{
        width:675px;
        border:1px solid #dcdcdc;
        margin:30px 0 0 30px;
        text-align: center;
        padding: 40px 0;
    }
    .button-list{
        margin:50px 0 0 176px;
    }
/*    .button-list .menu-btn{
        border:1px solid #e8e8ec;
        width:118px;
        height:36px;
        background-color: #fff;
        margin-right: 210px;
        cursor:pointer;
        border-radius: 3px;
    }*/
    .button-list .preservation-btn{
        width:148px;
        height:38px;
        background-color: #da2337;
        color:#fff;
        border:none;
        cursor:pointer;
        margin-left: 350px;
        border-radius: 3px;
    }
/*    .button-list .preview-btn{
        width:98px;
        height:36px;
        border:1px solid #e8e8ec;
        background-color: #fff;
        cursor:pointer;
        border-radius: 3px;
    }*/
    .menuBorder{
        margin:10px 0 0 30px;
        color:#da2337;
    }
    .clear{
        clear:both;
    }
</style> 