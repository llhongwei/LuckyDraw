<template>
  <div>
    <h2>抽奖配置</h2>
    <div class="operation">
      <el-button size="mini" type="primary" @click="addItem">添加物品</el-button>
      <el-button size="mini" @click="changeSelectionEnable(false)">禁用选中</el-button>
      <el-button size="mini" @click="changeSelectionEnable(true)">启用选中</el-button>
      <span style="float: right">
        <label>
          单次抽奖花费：
        <el-input v-model="costOre" size="mini" style="width: 30%; margin-right: 10px" @input="checkNum"></el-input>
        </label>
        <el-button size="mini" @click="configLotteryCost">更改</el-button>
      </span>
    </div>
    <el-table v-loading="loading" :data="list"
              element-loading-spinner="el-icon-loading"
              element-loading-text="拼命加载中"
              max-height="750"
              width="1060px"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="物品名称" prop="name"></el-table-column>
      <el-table-column align="center" label="缩略图" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.imgUrl" alt="" style="width: 50%">
        </template>
      </el-table-column>
      <el-table-column label="权重" prop="weight" width="60"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.enable" style="margin-right: 10px;"
                     @change="changeItemEnable(scope.row)"></el-switch>
          <el-button
              size="mini"
              @click="editItem(scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="deleteItem(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :destroy-on-close="true" :title="form.dialogTitle" :visible.sync="formDisplay" width="20%">
      <el-form :model="form" label-position="left">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="权重">
          <el-input-number v-model="form.weight" :max="1.00" :min="0.01" :precision="2" :step="0.01"></el-input-number>
        </el-form-item>
        <el-form-item label="图标">
          <el-upload ref="upload" :auto-upload="false" :file-list="imgList" :limit="1" :multiple="false"
                     :on-change="onChange"
                     :on-exceed="onExceed" :show-file-list="false" accept="image/*" action=""
                     list-type="picture-card">
            <img v-if="this.form.img" :src="this.form.img" alt="" class="avatar" height="100%" width="100%">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <p>Tips: 图片如果传错请重置！</p>
        <div class="form-operation">
          <el-button type="primary" @click="form.fun">提交</el-button>
          <el-button type="reset" @click="resetForm">重置</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import InspireCloud from '@byteinspire/js-sdk';
import {
  changeLotteryItemStatus,
  configLotteryCost,
  deleteLotteryItem,
  getDrawList,
  getLuckyItemCount,
  setLotteryItem,
  updateLotteryItem
} from '@/network/api';

export default {
  async created() {
    await this.getDrawList();
    const {data} = await configLotteryCost();
    this.costOre = data.costOre;
  },
  mounted() {
    this.$notify({
      title: '提示',
      type: 'info',
      dangerouslyUseHTMLString: true,
      message: '点击顶部栏&nbsp;<b>抽奖</b>&nbsp;就可以跳回抽奖页啦！'
    })
  },
  data() {
    return {
      list: [],
      multiSelection: [],
      loading: false,
      formDisplay: false,
      imgList: [],
      costOre: '',
      form: {
        dialogTitle: '',
        name: '',
        weight: 0.01,
        img: undefined,
        id: -1,
        fun: () => {
        }
      }
    };
  },
  methods: {
    async getDrawList() {
      const res = await getDrawList();
      if (res.status === 200) {
        this.list = res.data;
      } else {
        this.$message.error('请求错误');
      }
    },
    editItem(item) {
      this.resetForm();
      this.form.id = item.id;
      this.form.name = item.name;
      this.form.weight = item.weight;
      this.form.img = item.imgUrl;
      this.form.dialogTitle = '编辑物品';
      this.formDisplay = true;
      this.form.fun = this.updateItem;
    },
    async updateItem() {
      const imgUrl = await this.uploadImg();
      const {status} = await updateLotteryItem({
        id: this.form.id,
        data: {
          name: this.form.name,
          weight: this.form.weight,
          imgUrl: imgUrl
        }
      });
      if (status === 200) {
        this.loading = true;
        this.formDisplay = false;
        await this.getDrawList();
        this.loading = false;
      } else {
        await this.$alert('错误！请稍后重试！');
      }
    },
    async deleteItem(id) {
      if (id < 8){
        this.$message({
          type: 'error',
          message: '默认物品不能删除！如有需要请禁用！'
        })
        return false;
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await deleteLotteryItem({id: id});
        if (res.status === 200) {
          this.loading = true;
          this.formDisplay = false;
          await this.getDrawList();
          this.loading = false;
        } else {
          await this.$alert('错误！请稍后重试！');
        }
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleSelectionChange(val) {
      this.multiSelection = val;
      console.log(val);
    },
    async changeItemEnable(item) {
      const res = await changeLotteryItemStatus({ids: [item.id], oper: item.enable});
      if (res.status !== 200) {
        console.error('改变状态请求错误');
      }
    },
    async changeSelectionEnable(enable) {
      let ids = [];
      this.multiSelection.forEach(value => {
        const _val = value.id;
        ids.push(_val);
      });
      this.loading = true;
      const res = await changeLotteryItemStatus({ids: ids, oper: enable});
      await this.getDrawList();
      this.loading = false;
      console.log(res);
    },
    async addItem() {
      this.resetForm();
      this.form.dialogTitle = '添加物品';
      const {data} = await getLuckyItemCount();
      this.form.id = data.count;
      this.form.fun = this.submitItem;
      this.formDisplay = true;
    },
    onChange(file) {
      const isIMAGE = file.raw.type.split('/')[0] === 'image';
      if (!isIMAGE) {
        this.$message.error('上传文件只能是图片格式!');
        this.imgList = [];
        return false;
      } else {
        this.imgList[0] = file;
        this.form.img = URL.createObjectURL(file.raw);
      }
    },
    onExceed(files, fileList) {
      this.imgList[0] = fileList[0];
      this.onChange(fileList[0]);
    },
    resetForm() {
      this.imgList = [];
      this.form.img = undefined;
      this.form.weight = 0.01;
      this.form.name = '';
    },
    async uploadImg() {
      const serviceId = 'qc6nzx';   // Service ID
      if (this.imgList[0] === undefined) {
        return this.form.img;
      }
      const img = this.imgList[0];
      const inspireCloud = new InspireCloud({serviceId});
      let imgUrl = '';
      await inspireCloud.file.upload(img.raw.name, img.raw, {token: 'ef5bbf18-d8f2-492d-af50-fe753ead06c1'})
          .then((data) => {
            imgUrl = data.url;
          })
          .catch((error) => {
            console.log(error);
          });
      return imgUrl;
    },
    async submitItem() {
      const isNameBlank = this.form.name === '';
      const isImgBlank = this.imgList[0] === undefined;
      if (isNameBlank) {
        await this.$alert('名称不可以为空!');
        return false;
      }
      if (isImgBlank) {
        await this.$alert('图片不可以为空！');
        return false;
      }
      const imgUrl = await this.uploadImg();
      const item = {
        id: this.form.id,
        name: this.form.name,
        weight: this.form.weight,
        enable: true,
        imgUrl: imgUrl
      };
      const res = await setLotteryItem({item: item});
      if (res.status === 200) {
        this.loading = true;
        this.formDisplay = false;
        await this.getDrawList();
        this.loading = false;
      } else {
        await this.$alert('错误！请稍后重试！');
      }
    },
    checkNum() {
      var reg = /^\d+$/;
      if (!reg.test(this.costOre)) {
        this.$alert('请输入数字');
        return false;
      }
    },
    async configLotteryCost() {
      const {status} = await configLotteryCost({costOre: this.costOre});
      if (status === 200) {
        this.$message({
          type: "success",
          message: "更改成功！"
        });
      } else {
        this.$message({
          type: 'error',
          message: "出错了！请稍后再试！"
        });
      }
    }
  }
};
</script>

<style scoped>
h2 {
  margin: 10px auto 10px;
  text-align: center;
}

.operation {
  width: 1060px;
  margin: 5px auto;
}

.el-table {
  clear: both;
  width: 1060px;
  margin: 5px auto;
}

div.el-dialog__wrapper > div > div.el-dialog__body > form > div > div > div {
  width: 50%;
}

#app > div > div:nth-child(2) > div > div.el-dialog__wrapper > div > div.el-dialog__body > form > div:nth-child(3) > div > div {
  display: inline-block;
}
</style>