const products = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1516906571665-49af58989c4e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=300&q=80',
    name: 'MacBook Pro',
    onStock: false,
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    name: 'iPhone',
    onStock: false,
  },
];
const App = {
  data() {
    return {
      products: [],
      temp: {
        name: '',
        imageUrl: '',
      },
      // 視窗開關
      isNew: false,
    };
  },
  methods: {
    editItem(item1) {
      // 深層複製 使用 JSON轉為字串後再轉回物件格式
      this.temp = JSON.parse(JSON.stringify(item1));
    },
    delItem(item1) {
      // 使用 forEach 來取得 索引位置
      this.products.forEach((item, i) => {
        // 判斷 點擊的物件 ID 是否與 索引位置的ID一致
        if (item.id === item1.id) {
          // 刪除功能
          this.products.splice(i, 1);
        }
      });
    },
    confirmEdit() {
      if (!this.temp.id) {
        // 將兩者有差異的部分補足 增加 ID 以及 onStock
        this.temp.id = new Date().getTime(); // unix timestamp 時間格式
        this.temp.onStock = false;
        // 把 this.temp 的資料 新增到 this.products 的陣列中 使用 push
        this.products.push(this.temp);
      } else {
        this.products.forEach((item, i) => {
          // 判斷是否兩者唯一值(id)相同
          if (item.id === this.temp.id) {
            // 將 this.temp 內的資料寫入 data 內的 products [索引]
            this.products[i] = this.temp;
          }
        });
      }
      // 清空 this.temp
      this.temp = {};
      // 觸發關閉 editBox
      this.isNew = false;
    },
    closeEditBox() {
      // 清空 this.temp
      this.temp = {};
      // 觸發關閉 editBox
      this.isNew = false;
    },
    addItem() {
      // 開啟 editBox
      this.isNew = true;
      // 帶入空值
      this.temp = {
        name: '',
        imageUrl: '',
      };
    },
  },
  created() {
    // 將後端資料 products 帶入 data 內的 products 陣列 方便處理往後資料
    this.products = products;
  },
};

Vue.createApp(App).mount('#app');
