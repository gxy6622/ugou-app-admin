<template>
	<div>
		<el-tree ref="tree" node-key="id"
		         :props="{ isLeaf: 'isLeaf' }" lazy
		         :load="loadData"
			:expand-on-click-node="false">
			<span class="my-tree-node" slot-scope="{ node, data }">
				<span v-text="data.name"></span>
				<span>
					<el-button type="text" size="medium" icon="el-icon-plus" v-if="node.level < 3" @click="beginEdit(node, true)"></el-button>
					<template v-if="node.level > 1">
						<el-button type="text" size="medium" icon="el-icon-edit-outline" @click="beginEdit(node, false)"></el-button>
						<el-button type="text" size="medium" icon="el-icon-delete" @click="removeCategory2(data)"></el-button>
						<el-popover :title="data.name" placement="right" trigger="hover" width="200">
							<el-image :src="data.avatar" fit="contain"></el-image>
							<el-button type="text" size="medium" icon="el-icon-picture-outline" v-if="node.level >2" slot="reference"></el-button>
						</el-popover>
					</template>
				</span>

			</span>
		</el-tree>
		<el-dialog :visible="edit.isEdit" :show-close="false" width="650px">
			<h3 slot="title">商品分类管理 - {{ edit.isAdd ? '新增' : '修改' }}</h3>
			<div slot="footer">
				<el-button @click="edit.isEdit = false">取消</el-button>
				<el-button type="primary" @click="submitEdit">确定</el-button>
			</div>
			<el-form ref="form" label-width="80px" :model="edit.model" :rules="edit.rules" status-icon>
				<el-form-item label="父级分类">
					<el-select v-model="edit.model.fid" :disabled="edit.isAdd || edit.model.fid ===0">
						<el-option label="ROOT" :value="0" disabled></el-option>
						<el-option v-for="item in mainList" :label="item.name"
							:value="item.id"
							:key="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="分类名称" prop="name">
					<el-input v-model="edit.model.name" placeholder="请输入分类名称"></el-input>
				</el-form-item>
				<el-form-item label="分类图片" v-if="edit.model.fid > 0">
					<div class="avatar-wrapper">
						<div class="old-avatar-wrapper" v-show="!edit.isAdd">
							<el-image class="old-avatar" :src="edit.model.oldAvatar"></el-image>
							<p>原图片</p>
						</div>
						<el-upload class="avatar-uploader"
						           action="/category/upload"
						           name="avatar"
						           accept=".jpg,.png"
						           :on-success="uploadSuccess"
						           list-type="picture-card"
						           :file-list="edit.fileList"
						           :on-remove="removeFile">
							<i class="el-icon-plus avatar-uploader-icon"></i>
							<div slot="tip">只能上传jpg/png文件，且大小不超过500KB</div>
						</el-upload>
					</div>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script type="text/ecmascript-6">
	import { Loading } from 'element-ui';
	import { createNamespacedHelpers } from 'vuex';

	let { mapState, mapActions } = createNamespacedHelpers('category');

        export default {
                data() {
                        return {
                                edit: {
                                        //isAvatarShow: true,            //弹框是否显示分类图片
                                        isEdit: false,
	                                isAdd: true,                     //标识是否为新增，true为新增，false为修改
	                                fileList: [],
	                                model: { id: 0, fid: -1, name: '', avatar: '', oldAvatar: '' },
	                                rules: {                                //制定表单元素验证规则
                                                name: [
	                                                { required: true, message: '商品分类名称不能为空', trigger: 'blur' },
	                                                { min: 2, max: 6, message: '商品分类名称长度必须在2-6之间', trigger: 'blur' }
                                                ]
	                                }
                                }
                        }
                },
                computed: {
	                ...mapState([ 'mainList', 'subLists' ])
                },
	        methods: {
		        ...mapActions([ 'initMainList', 'initSubLists', 'removeCategory', 'addCategory', 'updateCategory' ]),
		        loadData(node, resolve) {
			        switch(node.level) {
				        case 0:                                         //如果node.level是0，要根节点
				                return resolve([{ id: 0, name: 'ROOT' }]);
				                break;
				        case 1:                                         //要一级分类数据
					        //通知仓库初始化一级分类数据，initMainList方法返回一个Promi对象
						resolve(this.mainList);
				                break;
				        case 2:                                         //要某个一级分类的二级分类
						this.initSubLists(node.data.id).then(() => {
						        let temp = this.subLists[node.data.id];
						        temp.forEach(item => item.isLeaf = true);       //让二级节点是叶子节点，需要再在模板区配置:props="{ isLeaf: 'isLeaf' }"
							resolve(temp);
						});
					        break;
				        default:
				                resolve([]);
				                break;
			        }
		        },
		        removeCategory2(data) {
                                this.$confirm(`确定删除 '${ data.name }' 分类?`, '提示', { type: 'warning' })
	                                .then(() => {
	                                        //通知仓库删除指定分类数据
	                                        this.removeCategory(data)
	                                                .then(() => this.$refs.tree.remove(data));
                                }).catch(() => {
                                        this.$message({ type: 'info', message: '已取消删除' });
                                });
		        },
		        beginEdit(node, isAdd) {
		                this.edit.fileList = [];
		                if(this.$refs.form) this.$refs.form.clearValidate();            //重置验证输入
				this.edit.isAdd =isAdd;                 //接收当前模式是新增还是修改
			        //准备工作，相当于重置新增还是编辑
				if(isAdd) {                                     //新增
				        this.edit.model.fid = node.data.id;     //当前节点的id值作为fid
				        this.edit.model.name = '';
				        this.edit.model.oldAvatar = '';         //新增不在乎oldAvatar
					this.edit.model.avatar = '';
				} else {                                        //修改
					this.edit.model.id = node.data.id;              //便于将来提交数据时直接将model传到数据库
					this.edit.model.fid = node.parent.data.id;      //当前节点的上一节点的id作为fid
					this.edit.model.name = node.data.name;
					this.edit.model.oldAvatar = node.data.avatar;
					this.edit.model.avatar = node.data.avatar;
				}
				this.edit.isEdit = true;                //模态框弹出
		        },
		        uploadSuccess(response, file, fileList) {
		                if(response.status === 200)
		                        this.edit.model.avatar = response.data;
		                        this.edit.fileList = fileList.slice(-1);        //只显示最后一张，将file-list的其他的都删除
		        },
		        removeFile(file, fileList) {
		                this.edit.fileList = [];
		                if(this.edit.isAdd) this.edit.model.avatar = '';
		                else this.edit.model.avatar = this.edit.model.oldAvatar;
		        },
		        submitEdit() {
		                this.$refs.form.validate()              //表单验证
			                .then(() => {
		                                if(this.edit.isAdd && this.edit.model.avatar === ''&& this.edit.model.fid > 0) {
		                                        this.$alert('必须为分类选择一张图片', '提示', { type: 'warning' });
		                                        return;
		                                }
		                                if(this.edit.isAdd) {   //新增
		                                        this.addCategory(this.edit.model)
			                                        .then(data => {                 //这个data(从仓库return过来的构造好的temp)多了一个从数据库生成并返回来的新的id值，用于向树中插入节点
				                                        if(data.fid !== 0) data.isLeaf = true;
				                                        let parentNode = this.$refs.tree.getNode(data.fid);
									this.$refs.tree.append(data, parentNode);         //node-key
				                                        this.edit.isEdit = false;
			                                        })
		                                } else {                //修改
							this.updateCategory(this.edit.model)
								.then(() => {
							                let { id, fid, name, avatar, oldAvatar } = this.edit.model;
							                let obj = { id, fid, name, avatar: oldAvatar === avatar ? avatar : `/images/category/${ avatar }`};
							                let node = this.$refs.tree.getNode(this.edit.model.id);
							                if(fid === 0) node.data = obj;                  //如果是一级
							                else {                                                          //如果是二级
							                        obj.isLeaf = true;
							                        if(node.parent.data.id === this.edit.model.fid) node.data = obj;                //判断有没有在一级分类之间跳动
							                        else {
							                                this.$refs.tree.remove(node.data);
							                                if(typeof this.subLists[this.edit.model.fid] !== 'undefined') {
							                                        let parentNode = this.$refs.tree.getNode(this.edit.model.fid);
							                                        this.$refs.tree.append(obj, parentNode);
							                                }
							                        }
							                }
							                this.edit.isEdit = false;
								})
		                                }
			                })
			                .catch(() => {});
		        }
	        },
	        created() {
                        this.Loading = Loading.service();               //用Loading遮罩，确保MainList初始化完毕后进行接下来的操作
                        this.initMainList().then(() => this.Loading.close());
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.el-tree
		width: 400px
		.my-tree-node
			flex: 1
			display: flex
			justify-content: space-between
			align-items: center
	.avatar-uploader
		position: relative
		overflow: hidden
		.avatar-uploader-icon
			font-size: 28px
			color: #8c939d
			width: 150px
			height 150px
			line-height 150px
			text-align center
			border-radius: 6px
			cursor: pointer
			&:hover
				border-color #409eff
	.avatar-wrapper
		display flex
		.old-avatar-wrapper
			.old-avatar
				width: 148px
				height: 148px
				border: 1px solid #d9d9d9
				border-radius: 6px
				margin-right 10px
			p
				color: #409eff
				margin-top: -15px
</style>