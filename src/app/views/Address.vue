<template>
	<div class="page-wrapper">
		<div class="wrapper">
			<div class="header">
				<div class="back">
					<span @click="() => $router.go(-1)">
						<img src="../assets/images/category/header/new-back.png" alt="">
					</span>
				</div>
				<div class="ugou">
					<span>收货地址</span>
				</div>
				<div class="menu" @click="isShow = !isShow">
					<img src="../assets/images/category/header/ico-menu.png" alt="">
				</div>
			</div>
			<PopUp v-show="isShow"></PopUp>
		</div>
		<div class="content">
			<ul class="address-wrapper">
				<li v-for="item in list" :key="item.id">
					<div class="address-list">
						<ul>
							<li class="first">
								<span class="name" v-text="item.receiveName"></span>
								<span class="phone" v-text="item.receiveTel"></span>
							</li>
							<li class="second">
								<span class="address"
								      v-text="item.receiveAddress"></span>
							</li>
						</ul>
						<p class="clearfix">
							<span class="default"><img src="../assets/images/cart/icon_checkbox_uncheck.png">设为默认地址</span>
							<span class="edit" @click="editAddress2(item.id)"><img src="../assets/images/address/edit.png" alt="">编辑</span>
							<span class="remove" @click="removeAddress2(item.id)"><img src="../assets/images/address/delete.png" alt="">删除</span>
						</p>
					</div>
				</li>
			</ul>
		</div>
		<div class="update-address" v-show="isActive">
			<div class="wrapper">
				<div class="header">
					<div class="back">
						<router-link to="/address">
							<img src="../assets/images/category/header/new-back.png" alt="">
						</router-link>
					</div>
					<div class="ugou">
						<span>修改收货地址</span>
					</div>
					<div class="menu" @click="isShow = !isShow">
						<img src="../assets/images/category/header/ico-menu.png" alt="">
					</div>
				</div>
				<PopUp v-show="isShow"></PopUp>
			</div>
			<form name="address">
				<input type="hidden" name="mode">
				<label for="">
					<span class="receive-name receive">收货人</span>
					<input type="text" class="name-input" v-model="lists.receiveName">
				</label>
				<label for="">
					<span class="receive-phone receive">联系电话</span>
					<input type="text" class="phone-input" v-model="lists.receiveTel">
				</label>
				<label for="">
					<span class="receive-area receive">所在地区</span>
					<span class="city" @click="toAddress" v-model="city">{{ city }}</span>
					<p class="pwrap">
						<v-distpicker type="mobile" @selected="selected" v-show="addInp" class="area1"></v-distpicker>
					</p>
					<div class="blacks" v-show="mask" @click="closeMask"></div>
				</label>
				<button class="save-address" @click="saveAddress">保存地址</button>
			</form>
		</div>
		<div class="add-wrapper">
			<span class="add-address" @click="addAddress2">新增地址</span>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        import VDistpicker from 'v-distpicker';
        import PopUp from '../components/PopUp.vue';
        import { mapState, mapActions } from 'vuex';

        export default {
                components: {PopUp, VDistpicker},
                data(){
                        return {
                                edit: true,             //表示新增还是编辑，true为新增
                                isShow: false,
                                isActive: false,        //是否弹出新增修改框
                                lists: { receiveName: '', receiveTel: '' },
                                city: '省市区',
	                        addInp: false,          //省市区弹框
	                        mask: false,             //遮罩层关闭
	                        editId: 0
                        }
                },
                computed: {...mapState('address', ['list'])},
                methods: {
                        ...mapActions('address', [ 'getData', 'addAddress', 'removeAddress', 'editAddress' ]),
                        closeMask() {
                                this.addInp = false;
                                this.mask = false;
                        },
	                toAddress() {
                                this.mask = true;
                                this.addInp = true;
	                },
	                selected(data) {
                                this.mask = false;
                                this.addInp = false;
                                this.city = data.province.value + ' ' + data.city.value + ' ' +data.area.value;
	                },
                        getData2(){
                                this.getData();
                        },
                        saveAddress(){
                                if(this.edit === true) {
                                        this.addAddress({
                                                receiveName: this.lists.receiveName,
                                                receiveTel: this.lists.receiveTel,
                                                receiveAddress: this.city
                                        })
	                                        .then(() => this.getData())
                                                .catch(() => {});
                                } else {
                                        this.editAddress({
                                                receiveName: this.lists.receiveName,
                                                receiveTel: this.lists.receiveTel,
                                                receiveAddress: this.city,
                                                id: this.editId
                                        })
                                                .then(() => this.getData())
                                                .catch(() => {});
                                }
                                this.isActive = false;
                        },
                        addAddress2(){
                                this.isActive = true;
                                this.edit = true;
                                this.lists = [];
                                this.city = '省市区';
                        },
	                removeAddress2(id) {
		                if(!confirm('确定删除？')) return;
                                this.removeAddress({ id: id })
	                                .then(() => {
                                                let i = this.list.findIndex(item => item.id === id);
                                                this.list.splice(i, 1);
	                                })
	                },
                        editAddress2(id) {
                                this.edit = false;
                                this.editId = id;
                                console.log(this.editId);
                                this.getData()
                                        .then(data => {
                                                let i = this.list.findIndex(item => item.id === id);
                                                this.lists.receiveName = data[i].receiveName;
                                                this.lists.receiveTel = data[i].receiveTel;
                                                this.city = data[i].receiveAddress;
                                                this.isActive = true;
                                        })
                                        .catch(() => {});

                        },
                },
                created(){
                        this.getData2();
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.header {
		position: relative;
		height: 0.8rem;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		background-color: #f8f8f8;
		border-bottom: 1px solid #ddd;
	}

	.header > div {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.header > .back {
		width: 1rem;
		height: 0.56rem;
		flex-direction: column;
	}

	.header > .back > span {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		text-align: center;
	}

	.header > .back img {
		width: 0.24rem;
		height: 0.44rem;
	}

	.header > .ugou {
		flex-grow: 1;
	}

	.header > .ugou > span {
		font-size: 0.36rem;
		color: #333;
		text-align: center;
	}

	.header > .menu {
		width: 0.8rem;
		height: 0.56rem;
	}

	.header > .menu > img {
		width: 0.4rem;
		height: 0.32rem;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.content > ul.address-wrapper > li {
		padding: 0.1rem 0.2rem;
		border-bottom: 10px solid #eee;
	}

	.content > ul.address-wrapper > li > .address-list {
		margin: 0 0.2rem;
	}

	.content > ul.address-wrapper > li > .address-list > ul {
		border-bottom: 1px dashed #aaa;
	}

	.content > ul.address-wrapper > li > .address-list > ul > li.first {
		padding-bottom: 0.2rem;
		font-size: 0.3rem;
	}

	.content > ul.address-wrapper > li > .address-list > ul > li.second {
		padding-bottom: 0.2rem;
		font-size: 0.24rem;
	}

	.content > ul.address-wrapper > li > .address-list > p {
		margin-top: 0.2rem;
		font-size: 0.24rem;
		text-align: right;
	}

	.content > ul.address-wrapper > li > .address-list > p > span {
		display: inline-block;
		color: #A0A0A0;
	}

	.content > ul.address-wrapper > li > .address-list > p > span > img {
		width: 0.32rem;
		height: 0.32rem;
		margin-right: 0.1rem;
	}

	.content > ul.address-wrapper > li > .address-list > p > span.default {
		float: left;
	}

	.content > ul.address-wrapper > li > .address-list > p > span.edit {
		margin-right: 0.1rem;
	}

	/*------------------*/
	.update-address {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #ddd;
		z-index: 100;
	}

	form {
		display: flex;
		flex-direction: column;
		padding: 0.2rem 0.3rem;
	}

	form label {
		position: relative;
		height: 0.84rem;
		box-sizing: border-box;
		margin-top: 0.24rem;
		padding: 0.08rem 0.24rem 0.08rem 1.2rem;
		background-color: #f5f5f5;
		border-radius: 0.06rem;
	}

	form label > span.receive {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 0.24rem;
		font-size: 0.28rem;
		font-style: normal;
	}
	form label>span.city {
		display: inline-block;
		width: 100%;
		height: 100%;
		padding-left: 0.5rem;
		padding-top: 0.15rem;
	}
	form label > input {
		outline: none;
		border: none;
		height: 0.68rem;
		width: 100%;
		font-size: 0.28rem;
		background-color: #f5f5f5;
		box-sizing: border-box;
		padding-left: 0.5rem;
	}

	button.save-address {
		border: none;
		outline: none;
		width: 100%;
		height: 0.88rem;
		text-align: center;
		line-height: 0.88rem;
		margin-top: 0.24rem;
		font-size: 0.30rem;
		background: #ff0000;
		color: white;
		border-radius: 0.1rem;
	}

	.add-wrapper {
		text-align: center;
		margin-top: 0.3rem;
	}

	span.add-address {
		display: inline-block;
		width: 2.6rem;
		padding: 0.1rem 0;
		border-radius: 0.1rem;
		background: #ff0000;
		color: white;
		text-align: center;
	}

	/*-------------------*/
	.blacks {
		position: fixed;
		width: 100%;
		height: 50%;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, 0.45);
	}
	.pwrap{
		height: 4rem;
		overflow-y: auto;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
	}
	.pwrap>>>.distpicker-address-wrapper{
	                color: #999;
         }
	.pwrap>>>.address-header{
		         position: fixed;
		         bottom: 4rem;
		         width: 100%;
		         background: #000;
		         color:#fff;
         }
	.pwrap>>>.address-header ul li{
		         flex-grow: 1;
		         text-align: center;
         }
	.pwrap>>>.address-header .active{
		         color: #fff;
		         border-bottom:#666 solid 0.1rem;
         }
	.pwrap>>>.address-container .active{
	                color: #000;
         }
	.pwrap>>>.address-container ul li {
		         font-size: 0.25rem;
         }
</style>