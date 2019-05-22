<template>
  <div class="amap-page-container">
    <el-amap :center="center" :zoom="zoom" class="amap-demo" vid="amapDemo">
      <el-amap-circle-marker
        :center="marker.center"
        :events="marker.events"
        :fill-color="marker.fillColor"
        :fill-opacity="marker.fillOpacity"
        :radius="marker.radius"
        v-for="marker in markers"
      ></el-amap-circle-marker>
      <el-amap-text :offset="text.offset" :text="text.text" v-for="(text,index) in markers"></el-amap-text>
    </el-amap>
  </div>
</template>

  <style>
.amap-page-container {
    height: 270px;
    width: 350px;
}
</style>

  <script>
module.exports = {
    data() {
        return {
            zoom: 13,
            center: [117.147568, 36.65707],
            markers: [
                {
                    center: [117.147568, 36.65707],
                    radius: 5,
                    fillOpacity: 2,
                    text: '山东鑫禾金融保理有限公司',
                    offset: [0, -30],
                    fillColor: ' rgb(235, 18, 29)',
                    events: {
                        click: () => {
                            console.log('click');
                        }
                    }
                }
            ],
            text: [
                {
                    text: '纯文本标记',
                    anchor: 'center', // 设置文本标记锚点
                    draggable: true,
                    cursor: 'pointer',
                    angle: 10,
                    style: {
                        padding: '.75px 1.25px',
                        'margin-bottom': '1px',
                        'border-radius': '.25px',
                        'background-color': 'white',
                        width: '15px',
                        'border-width': 0,
                        'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
                        'text-align': 'center',
                        'font-size': '20px',
                        color: 'blue'
                    },
                    position: [117.149153, 36.658423]
                }
            ]
        };
    }
};
</script>