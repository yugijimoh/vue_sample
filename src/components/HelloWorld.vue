<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <div>
      <button @click="sayHello">Say Hello</button>
      <button @click="loadCsv">GET Csv</button>
      <button @click="loadNeo4j">load Neo4j</button>
      <div>
        <span>{{ serverResponse }} </span>
        <chart ref="chart1" :options="myoption" :auto-resize="true"></chart>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      serverResponse: 'resp',
      datatable: [],
      myoption: {}
    }
  },
  methods: {
    sayHello() {
      var that = this
      const path = 'http://127.0.0.1:5000/getMsg'
      axios.get(path).then(function (response) {
        var msg = response.data.msg
        that.serverResponse = msg
        alert('Success ' + response.status + ', ' + response.data + ', ' + msg)
      }).catch(function (error) {
        alert('Error ' + error)
      })
    },
    loadCsv() {
      var that = this
      // 对应 Python 提供的接口，这里的地址填写下面服务器运行的地址，本地则为127.0.0.1，外网则为 your_ip_address
      const path = 'http://127.0.0.1:5000/loadCsv'
      axios.get(path).then(function (response) {
        // 这里服务器返回的 response 为一个 json object，可通过如下方法需要转成 json 字符串
        // 可以直接通过 response.data 取key-value
        // 坑一：这里不能直接使用 this 指针，不然找不到对象
        var msg = response.data.data
        // 坑二：这里直接按类型解析，若再通过 JSON.stringify(msg) 转，会得到带双引号的字串
        that.datatable = JSON.stringify(msg)
        console.log(that.datatable)
        //  alert('Success ' + response.status + ', ' + response.data + ', ' + msg)
      }).catch(function (error) {
        alert('Error ' + error)
      })
    },
    loadNeo4j() {
      const path = 'http://127.0.0.1:5000/graph'
      axios.get(path).then(function (response) {
        var graph = response.data.elements
        console.log(graph)
        graph.nodes.forEach(function (node) {
          node.symbolSize = 5
        })
        this.myoption = {
          title: {
            text: 'Les Miserables',
            subtext: 'Default layout',
            top: 'bottom',
            left: 'right'
          },
          tooltip: {},
          // legend: [{
          // selectedMode: 'single',
          // data: graph.categories.map(function (a) {
          //  return a.name
          // })
          // }],
          series: [
            {
              name: 'Les Miserables',
              type: 'graph',
              layout: 'force',
              data: graph.nodes,
              links: graph.edges,
              categories: graph.categories,
              roam: true,
              label: {
                position: 'right'
              },
              force: {
                repulsion: 100
              }
            }
          ]
        }

        // myChart.setOption(option);
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
