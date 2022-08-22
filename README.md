### 疫情实时大数据报告 

测试提交 

### 安装

```sh
npm install
npm run dev
npm run build
```

### 技术栈

✅ vue3.2  
✅ vite  
✅ less  
✅ vant  
✅ axios  
✅ typeScript  
✅ echarts  
✅ pinia  
✅ animate.css

### 接口地址

- 请求方式 : POST / GET
- 接口地址 :
  > https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf

### api字段相关


地区 name  
新增确诊 today.confirm  
累计确诊 total.confirm  
治愈 total.heal  
死亡 total.dead  

### 总数据

1. 本土现有确诊  
   较上日 chindAdd.localConfirmH5  
   store.chinaTotal.localConfirm  
2. 现有确诊  
   较上日 chindAdd.nowConfirm  
   chinaTotal.nowConfirm  
3. 累计确诊  
   较上日 chindAdd.confirm  
   chinaTotal.confirm  
4. 无症状感染者  
   较上日chindAdd.noInfect  
   chinaTotal.noInfect  
5. 境外输入  
   较上日 chindAdd.importedCase  
   chinaTotal.importedCase  
6. 累计死亡  
   较上日 chindAdd.dead  
   chinaTotal.dead  


### 重点难点
1. ts 报错 node 板块的 require 找不到 
   > 解决方法 :  
   > 在 `tsconfig.json` 的 `compilerOptions` 中添加 `"types": ["node"]`
2. require 引入图片在 vite 项目不可用 
   > 解决方法 :  
   > 改用 `new URL('../assets/images/card-block-item/test.png', import.meta.url).href`
