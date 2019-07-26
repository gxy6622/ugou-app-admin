<template>
	<div class="table-wrapper">
		<el-form class="table-header" :inline="true">
			<el-form-item label="商品名称：" size="small">
				<el-input placeholder="请输入商品名称" prefix-icon="el-icon-search" v-model="search.name"></el-input>
			</el-form-item>
			<el-form-item label="商品类别" size="small">
				<el-select v-model="search.mId" class="select-box">
					<el-option label="请选择" :value="0"></el-option>
					<el-option v-for="item in mainList" :key="item.id" :value="item.id" :label="item.name"></el-option>
				</el-select>
				&nbsp; - &nbsp;
				<el-select v-model="search.sId" :disabled="searchSid">
					<el-option label="请选择" :value="0"></el-option>
					<el-option v-for="item in subList" :key="item.id" :value="item.id" :label="item.name"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" size="small" icon="el-icon-search" @click="searchHandler">查询</el-button>
			</el-form-item>
			<!-- 新增商品信息-->
			<el-form-item>
				<el-button type="primary" size="small" icon="el-icon-plus" @click="addProduct2">新增</el-button>
			</el-form-item>
			<!--END-->
		</el-form>
		<el-table :data="list" border class="table-content">
			<el-table-column type="index" width="50" align="center" fixed="left"></el-table-column>
			<el-table-column prop="name" label="商品名称" fixed="left" show-overflow-tooltip align="center"></el-table-column>
			<el-table-column label="优惠/原价(元)" width="120" align="center">
				<template slot-scope="{ row, column, $index }">
					￥<span v-text="row.price"></span>/
					￥<span v-text="row.oldPrice"></span>
				</template>
			</el-table-column>
			<el-table-column label="活动价(元)" width="110" align="center">
				<template slot-scope="{ row, column, $index }">
					￥<span v-text="row.markPrice"></span>
				</template>
			</el-table-column>
			<el-table-column label="商品分类" width="200" align="center">
				<template slot-scope="{ row, column, $index }">
					<span v-text="row.mainCategoryName"></span> - <span v-text="row.subCategoryName"></span>
				</template>
			</el-table-column>
			<el-table-column label="avatar" width="120" align="center" fixed="right">
				<template slot-scope="{ row, column, $index }">
					<el-popover placement="left"
					            :title="`avatar - ${ row.name }`"
					            width="150"
					            trigger="hover">
						<el-image :src="row.avatar"></el-image>
						<el-button slot="reference" icon="el-icon-picture" type="text"></el-button>
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column label="banner" width="120" align="center" fixed="right">
				<template slot-scope="{ row, column, $index }">
					<el-button type="text" @click="beginBannerEdit(row)">
						<i class="el-icon-picture"></i>&nbsp;/&nbsp;<i class="el-icon-edit"></i>
					</el-button>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="150" fixed="right" align="center">
				<template slot-scope="{ row, column, $index }">
					<el-button type="text" size="mini" icon="el-icon-edit">修改</el-button>
					<el-button type="text" size="mini" icon="el-icon-delete">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background
			layout="prev,pager,next,total,sizes"
			:total="pagination.total"
			:page-sizes="[5,8,10,12,15]"
			:page-size="pagination.pageSize"
			:current-page="pagination.currentPage"
			@size-change="pageSize => { pagination.pageSize = pageSize; getData2(1); }"
			@current-change="getData2" class="table-footer">
		</el-pagination>
		<el-dialog title="banner数据维护" :visible="banner.isEdit" width="700px" :before-close="endBannerEdit">
			<el-upload
				:data="{ id: banner.id }"
				:file-list="banner.list"
				list-type="picture-card"
				multiple
				accept=".jpg,.png,.jpeg"
				name="banner"
				action="/product/banner/upload"
				:on-success="bannerUploadSuccessHandler"
				:before-remove="bannerBeforeRemoveHandler">
				<i class="el-icon-plus"></i>
			</el-upload>
		</el-dialog>
		<el-dialog :title="product.isEdit ? '修改商品信息' : '新增商品信息'" :visible="product.isAdd" :before-close="endAddProduct">
			<div slot="footer">
				<el-button @click="product.isAdd = false">取消</el-button>
				<el-button type="primary" @click="submitAddProduct">确定</el-button>
			</div>
			<el-form label-width="130px" :rules="product.rules" ref="product" :model="product.model">
				<el-form-item label="商品名称："  prop="name">
					<el-input class="category-name" v-model="product.model.name"></el-input>
				</el-form-item>
				<div class="price-wrapper">
					<el-form-item label="优惠/原价(元)：" prop="price">
						<el-input class="price-input" v-model="product.model.price"></el-input>   /  <el-input class="price-input" v-model="product.model.oldPrice"></el-input>
					</el-form-item>
					<el-form-item label="活动价：" prop="markPrice">
						<el-input class="price-input" v-model="product.model.markPrice"></el-input>
					</el-form-item>
				</div>
				<el-form-item label="商品分类：">
					<el-select v-model="search.mId">
						<el-option label="请选择" :value="0"></el-option>
						<el-option v-for="item in mainList" :key="item.id" :value="item.id" :label="item.name"></el-option>
					</el-select>
					&nbsp; - &nbsp;
					<el-select v-model="search.sId" :disabled="searchSid">
						<el-option label="请选择" :value="0"></el-option>
						<el-option v-for="item in subList" :key="item.id" :value="item.id" :label="item.name"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="上传图片：">
					<el-upload
						name="avatar"
						accept=".jpg,.png,.jpeg"
						list-type="picture-card"
						:file-list="product.fileList"
						action="/product/uploadAvatar"
						:on-success="avatarUploadSuccessHandler">
						<i class="el-icon-plus"></i>
						<div slot="tip">只能上传jpg/png/jpeg文件，且大小不超过500KB</div>
					</el-upload>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script type="text/ecmascript-6">
	import { mapState, mapActions, mapMutations } from 'vuex';

        export default {
                data() {
                        return {
                                searchSid: false,
				search: { name: '', mId: 0, sId: 0 },
	                        condition: { name: '', mId: 0, sId: 0 },
	                        pagination: { pageSize: 5, total: 0, currentPage: 0 },
	                        banner: { isEdit: false, id: 0, list: [] },
	                        product: {
                                        isAdd: false,                   //弹框
		                        isEdit: false,                  //是不是编辑状态
		                        rules: {
                                                name: [
	                                                { required: true, message: '商品名称不能为空', trigger: 'blur' }
                                                ],
			                        price: [
                                                        { required: true, message: '商品优惠/原价不能为空', trigger: 'blur' }
			                        ],
			                        markPrice: [
                                                        { required: true, message: '商品活动价格不能为空', trigger: 'blur' }
			                        ]
		                        },
		                        model: { cid: 0, name: '', price: '', oldPrice: '', markPrice: '', avatar: '' },
		                        fileList: []
	                        },
                        }
                },
	        computed: {
		        ...mapState('category', [ 'mainList', 'subLists' ]),
		        ...mapState('product', [ 'list' ]),
		        subList() {
		                if(this.search.mId === 0) return [];
		                else return this.subLists[this.search.mId] || [];
		        }
	        },
                watch: {
                        'search.mId': function(newValue, oldValue) {
                                this.search.sId = 0;
                                if(newValue !== 0) {
                                        this.searchSid = true;
                                        this.initSubLists(newValue).then(() => this.searchSid = false);
                                }
                        }
                },
	        methods: {
		        ...mapActions('category', [ 'initMainList', 'initSubLists' ]),
		        ...mapActions('product', [ 'getData', 'removeBanner', 'addProduct' ]),
                        ...mapMutations('product', [ 'uploadBanner' ]),
		        getData2(currentPage) {
		                this.pagination.currentPage = currentPage;
		                this.getData({
			                ...this.condition,
			                begin: (this.pagination.currentPage - 1) * this.pagination.pageSize,
			                pageSize: this.pagination.pageSize
		                }).then(total => {
                                        this.pagination.total = total;
		                });
		        },
		        searchHandler() {
		                this.condition.name = this.search.name;
                                this.condition.mId = this.search.mId;
                                this.condition.sId = this.search.sId;
                                this.getData2(1);
		        },
                        beginBannerEdit(row) {
		                this.banner.id = row.id;        //编辑哪个商品，banner.id就是点击的那个row.id。打开dialog窗口的一瞬间，将点击的那条的row.id传给banner.id
				if(row.bannerImgs) {            //row.bannerImgs为真，表示有数据，才执行，否则不执行（因为数据库构造的数据有限）
					row.bannerImgs.split(',').forEach(item => {
					        this.banner.list.push({
						        name: item.substr(item.lastIndexOf('/') + 1),
						        url: item
					        })
					})
				}
		                this.banner.isEdit = true;
                        },
		        endBannerEdit() {
		                this.banner.id = 0;             //初始化id，表示没有编辑
			        this.banner.list = [];          //初始化清空list
		                this.banner.isEdit = false;             //关闭
		        },
                        bannerUploadSuccessHandler({ status, data }, file, fileList) {          //data: /images/detail/???.jpg
                                if(status === 200) {
                                        this.uploadBanner({ id: this.banner.id, filePath: data });
                                        this.banner.list.push({
                                                name: data.substr(data.lastIndexOf('/') + 1),
                                                url: data,
                                                uid: file.uid
                                        });
                                }
                        },
                        bannerBeforeRemoveHandler(file, fileList) {
		                this.$confirm('确定删除？', '提示', 'warning')
			                .then(() => {
                                                this.removeBanner({ id: this.banner.id, filePath: file.url })
                                                        .then(() => {
                                                                let i = this.banner.list.findIndex(item => item.url ===file.url);
                                                                this.banner.list.splice(i, 1);
                                                        });
			                })
			                .catch(() => {});
				return false;
                        },
		        //新增商品处理
		        addProduct2() {         //弹出弹框
		                this.product.isAdd = true;
		        },
                        endAddProduct() {       //关闭弹框
		                this.product.isAdd = false;
		                this.$refs.product.clearValidate();      //清空验证
	                        this.product.model.name = '';
                                this.product.model.price = '';
                                this.product.model.oldPrice = '';
                                this.product.model.markPrice = '';
                                this.product.model.avatar = '';
                        },
                        submitAddProduct() {
                                if(this.product.isEdit === false) {     //新增
                                        this.$refs.product.validate()
	                                        .then(() => {
                                                        if(this.search.mId === 0 || this.search.sId === 0)  {
                                                                this.$alert('请选择分类', '提示', { type: 'warning' })
                                                        } else if(this.product.model.avatar === '') {
                                                                this.$alert('请选择一张图片', '提示', { type: 'warning' })
                                                        } else {
                                                                this.addProduct({
	                                                                cid: this.search.sId,
	                                                                name: this.product.model.name,
	                                                                price: this.product.model.price,
	                                                                oldPrice: this.product.model.oldPrice,
	                                                                markPrice: this.product.model.markPrice,
	                                                                avatar: this.product.model.avatar
                                                                })
	                                                                .then(() => {
                                                                                this.product.isAdd = false;
                                                                                this.product.model.name = '';
                                                                                this.product.model.price = '';
                                                                                this.product.model.oldPrice = '';
                                                                                this.product.model.markPrice = '';
		                                                                this.product.fileList = [];
                                                                                this.search.mId = 0;
                                                                                this.search.sId = 0;
	                                                                })
                                                        }
	                                        })
                                } else {        //修改
                                        //todo...
                                }

                        },
                        avatarUploadSuccessHandler(response, file, fileList) {
		                if(response.status === 200) {
		                        this.product.model.avatar = response.data;
		                        this.product.fileList = fileList.slice(-1);
		                }
                        },
	        },
	        created() {
                        this.initMainList();
                        this.getData2(1);
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.table-wrapper
		display: flex
		flex-direction: column
		height: 100%
		.table-header
			display: flex
			align-items: center
			height: 52px
			flex-shrink: 0
		.table-content
			flex-grow: 1
		.table-footer
			height: 55px
			text-align: center
			box-sizing: border-box
			flex-shrink: 0
			padding-top: 20px
</style>
<style>
	.el-popover__title {
		overflow: hidden;
		-webkit-line-clamp: 2;
		display: -webkit-box;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
	}
	.table-header {
		white-space: nowrap;
		min-width: 700px;
	}
	.price-input {
		width: 80px;
	}
	.price-wrapper {
		display: flex;
	}
	.el-dialog {
		width: 700px;
	}
	.category-name {
		width: 465px;
	}
</style>