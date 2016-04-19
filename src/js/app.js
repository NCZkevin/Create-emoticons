new Vue({
  el: "#app",
  data: {
    name : '输入文字',
    selectedfont: '默认',
    optionsfont: [
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
    ],

    selectedcolor: 'red',
    options: [
      { text: 'red', value: 'red' },
      { text: 'blue', value: 'blue' },
      { text: 'orange', value: 'orange' }
    ],

    stat: {
      top: '0',
      left: '5'
    }
    // styleObject: {
    // color: 'red',
    // fontSize: '13px',
    // position: 'absolute',
    // top: '0',
    // left: '5'
    // }
  }
});
