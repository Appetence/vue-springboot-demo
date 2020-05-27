<template>
    <div>
        <div class="container">
          <div class="schart-box">
            <schart class="schart" canvasId="pie" :data="data2" type="pie" :options="options3"></schart>
          </div>
            <div class="schart-box">
                <div class="content-title">柱状图</div>
                <schart class="schart" canvasId="bar" :data="data1" type="bar" :options="options1"></schart>
            </div>
            <div class="schart-box">
            <div class="content-title">折线图</div>
            <schart class="schart" canvasId="line" :data="data1" type="line" :options="options2"></schart>
            </div>

        </div>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    export default {
        name: 'basecharts',
        components: {
            Schart
        },
        data: () => ({
            data1:[
                {name:'2012',value:1141},
                {name:'2013',value:1499},
                {name:'2014',value:2260},
                {name:'2015',value:1170},
                {name:'2016',value:970},
                {name:'2017',value:1450}
            ],
            data2 : [
                {name:'洗车',value:12},
                {name:'教育培训',value:13},
                {name:'医药',value:14},
                {name:'美容美发',value:15}
            ],
            options1: {
                title: '各行业数量占比',
                autoWidth: true,   // 设置宽高自适应
                showValue: false,
                bgColor: '#F9EFCC',
                fillColor: '#00887C',
                contentColor: 'rgba(46,199,201,0.3)',
                yEqual: 7
            },
            options2: {
                title: '各行业数量占比',
                bgColor: '#D5E4EB',
                titleColor: '#00887C',
                fillColor: 'red',
                contentColor: 'rgba(46,199,201,0.3)'
            },
            options3: {
                title: '各行业数量占比',
                bgColor: 'white',
                titleColor: 'black',
                legendColor: 'black',
                radius: 120
            },
            options4: {
                title: '某商店各商品年度销量',
                bgColor: '#829daa',
                titleColor: '#ffffff',
                legendColor: '#ffffff',
                radius: 120,
                innerRadius:80
            }
        })
    }
</script>

<style scoped>
.schart-box{
    display: inline-block;
    margin: 20px;
}
    .schart{
        width: 500px;
        height: 400px;
    }
    .content-title{
        clear: both;
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
.container {
  padding: 30px;
   background: #f0f0f0!important;
   border:0px solid #ddd!important;
  border-radius: 5px;
}

</style>
