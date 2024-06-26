<template>
  <div>
    <table>
      <!-- <tr v-for="item in tableData" :key="item.$index">
        <td v-for="i in item" :key="i.$index" :rowspan="i.rowSpan" :colspan="i.colSpan"> {{i.colSpan || i.rowSpan ? i.name : i}} </td>
      </tr> -->
      <!-- <tr v-for="item in allData" :key="item.$index"> -->
      <tr v-for="item in useBackFontData" :key="item.$index">
        <th
          v-for="i in item"
          :key="i.$index"
          :rowspan="i.rowSpan"
          :colspan="i.colSpan"
          :class="i.class"
        >
          {{ i.name !== undefined ? i.name : i }}
        </th>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "CombineColRowHtml",
  data() {
    return {
      tableData: [
        [{ name: "A", colSpan: 2 }, "shift", "1", "2"],
        [{ name: "Config", colSpan: 2 }, { name: "", rowSpan: 2 }, "1", "2"],
        [{ name: "input Date", colSpan: 2 }, "1", "2"],
        [{ name: "A", colSpan: 2 }, "1012", "1", "2"],
        ["C", "D", "1012", "1", "2"],
      ],
    };
  },
  methods: {},
  computed: {
    allData() {
      let temp = [
        [
          { name: "A", colSpan: 1, rowSpan: 1 },
          { name: "A", colSpan: 1, rowSpan: 1 },
        ],
        [
          { name: "B", colSpan: 1, rowSpan: 1 },
          { name: "B", colSpan: 1, rowSpan: 1 },
        ],
        [
          { name: "C", colSpan: 1, rowSpan: 1 },
          { name: "C", colSpan: 1, rowSpan: 1 },
        ],
        [
          { name: "H", colSpan: 1, rowSpan: 1 },
          { name: "S12345432345612345", colSpan: 1, rowSpan: 1 },
        ],
        [
          { name: "H", colSpan: 1, rowSpan: 1 },
          { name: "W1", colSpan: 1, rowSpan: 1 },
        ],
        [
          { name: "H", colSpan: 1, rowSpan: 1 },
          { name: "Y1", colSpan: 1, rowSpan: 1 },
        ],
        [
          { name: "D", colSpan: 1, rowSpan: 1 },
          { name: "D", colSpan: 1, rowSpan: 1 },
        ],
        [
          { name: "F", colSpan: 1, rowSpan: 1 },
          { name: "F1", colSpan: 1, rowSpan: 1 },
        ],
        [
          { name: "F", colSpan: 1, rowSpan: 1 },
          { name: "F1", colSpan: 1, rowSpan: 1 },
        ],
        [
          { name: "W", colSpan: 1, rowSpan: 1 },
          { name: "F1", colSpan: 1, rowSpan: 1 },
        ],
      ];

      let col3 = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
      let titleList = [
        ["1", "1", "1"],
        ["2", "2", "2"],
        ["3", "3", "3"],
        ["4", "4", "4"],
        ["5", "5", "5"],
        ["6", "6", "6"],
        ["7", "7", "7"],
        ["8", "8", "8"],
        ["9", "9", "9"],
        ["10", "10", "10"],
      ];
      let repeatTimes = 0;
      for (let i = 0; i < temp.length; i++) {
        // 合并行
        if (temp[i][1] && temp[i][0].name === temp[i][1].name) {
          temp[i] = [{ name: temp[i][0].name, colSpan: 2 }];
        }
        // 合并列
        else {
          if (repeatTimes > 0) {
            if (
              temp[i + 1] &&
              temp[i - repeatTimes][0].name == temp[i + 1][0].name
            ) {
              repeatTimes++;
              temp[i - repeatTimes + 1][0].rowSpan = repeatTimes + 1;
              temp[i - repeatTimes + 1][0].class = "outline";
              let some = JSON.parse(JSON.stringify(temp[i + 1][1]));
              temp[i + 1] = [some];
            } else {
              temp[i - repeatTimes][0].rowSpan = repeatTimes + 1;
              repeatTimes = 0;
            }
          } else if (temp[i + 1] && temp[i][0].name == temp[i + 1][0].name) {
            repeatTimes++;
            let some = JSON.parse(JSON.stringify(temp[i + 1][1]));
            temp[i + 1] = [some];
          }
        }
      }
      for (let i = 0; i < temp.length; i++) {
        temp[i] = temp[i].concat(col3[i]).concat(titleList[i]);
      }
      console.log(temp);
      return temp;
    },
    useBackFontData() {
      let res = {
        DATA: {
          dataList: [
            {
              "LK-P-LS-05": "DS",
              "210724-REPAIR-00": "DS",
              T0030: "DS",
              "210724-RE-01": "DS",
              "LK-GB-02": "DS",
              col2: "Build",
              col3: "Shift",
              "AA-CHENSHU001": "DS",
              col1: "Build",
            },
            {
              "LK-P-LS-05": "LK-P-LS-05",
              "210724-REPAIR-00": "210724-REPAIR-00",
              T0030: "T0030",
              "210724-RE-01": "210724-RE-01",
              "LK-GB-02": "LK-GB-02",
              col2: "Config",
              col3: "",
              "AA-CHENSHU001": "AA-CHENSHU001",
              col1: "Config",
            },
            {
              "LK-P-LS-05": "04/28",
              "210724-REPAIR-00": "07/31",
              T0030: "05/10",
              "210724-RE-01": "07/24",
              "LK-GB-02": "06/19",
              col2: "Input Date",
              col3: "",
              "AA-CHENSHU001": "07/26",
              col1: "Input Date",
            },
            {
              "LK-P-LS-05": 1000,
              "210724-REPAIR-00": 100,
              T0030: 20000000,
              "210724-RE-01": 100,
              "LK-GB-02": 1000,
              col2: "Plan Input",
              col3: 100,
              "AA-CHENSHU001": 100,
              col1: "Plan Input",
            },
            {
              "LK-P-LS-05": 6,
              "210724-REPAIR-00": 1,
              T0030: 38906,
              "210724-RE-01": 3,
              "LK-GB-02": 20,
              col2: "Total Actual Input",
              col3: 38937,
              "AA-CHENSHU001": 1,
              col1: "Total Actual Input",
            },
            {
              "LK-P-LS-05": "33.33%",
              "210724-REPAIR-00": "0.00%",
              T0030: "0.01%",
              "210724-RE-01": "0.00%",
              "LK-GB-02": "75.00%",
              col2: "Repair check in rate",
              col3: "0.00%",
              "AA-CHENSHU001": "100.00%",
              col1: "Repair check in rate",
            },
            {
              "LK-P-LS-05": 0,
              "210724-REPAIR-00": 0,
              T0030: 0,
              "210724-RE-01": 0,
              "LK-GB-02": 9,
              col2: "SECTION1",
              col3: 9,
              "AA-CHENSHU001": 0,
              col1: "WIP",
            },
            {
              "LK-P-LS-05": 0,
              "210724-REPAIR-00": 0,
              T0030: 152,
              "210724-RE-01": 0,
              "LK-GB-02": 0,
              col2: "SECTION2--SECTION3",
              col3: 152,
              "AA-CHENSHU001": 0,
              col1: "WIP",
            },
            {
              "LK-P-LS-05": 0,
              "210724-REPAIR-00": 0,
              T0030: 0,
              "210724-RE-01": 0,
              "LK-GB-02": 0,
              col2: "SECTION4--SECTION6",
              col3: 0,
              "AA-CHENSHU001": 0,
              col1: "WIP",
            },
            {
              "LK-P-LS-05": 0,
              "210724-REPAIR-00": 0,
              T0030: 152,
              "210724-RE-01": 0,
              "LK-GB-02": 0,
              col2: "SECTION7",
              col3: 152,
              "AA-CHENSHU001": 0,
              col1: "WIP",
            },
            {
              "LK-P-LS-05": 0,
              "210724-REPAIR-00": 0,
              T0030: 152,
              "210724-RE-01": 0,
              "LK-GB-02": 0,
              col2: "SECTION8",
              col3: 152,
              "AA-CHENSHU001": 0,
              col1: "WIP",
            },
            {
              "LK-P-LS-05": 2,
              "210724-REPAIR-00": 0,
              T0030: 3,
              "210724-RE-01": 0,
              "LK-GB-02": 15,
              col2: "Repair",
              col3: 0,
              "AA-CHENSHU001": 1,
              col1: "Repair",
            },
          ],
          titleList: [
            "col1",
            "col2",
            "col3",
            "LK-P-LS-05",
            "T0030",
            "LK-GB-02",
            "210724-RE-01",
            "AA-CHENSHU001",
            "210724-REPAIR-00",
          ],
        },
        RESULT: "PASS",
      };
      let titleList1 = res.DATA.titleList;
      let dataList = res.DATA.dataList;

      let temp = [
        [
          { name: "A", colSpan: 1, rowSpan: 1 },
          { name: "A", colSpan: 1, rowSpan: 1 },
        ],
        [
          { name: "B", colSpan: 1, rowSpan: 1 },
          { name: "B", colSpan: 1, rowSpan: 1 },
        ],
        [
          { name: "C", colSpan: 1, rowSpan: 1 },
          { name: "C", colSpan: 1, rowSpan: 1 },
        ],
        [
          { name: "H", colSpan: 1, rowSpan: 1 },
          { name: "S1", colSpan: 1, rowSpan: 1 },
        ],
        [
          { name: "H", colSpan: 1, rowSpan: 1 },
          { name: "W1", colSpan: 1, rowSpan: 1 },
        ],
        [
          { name: "H", colSpan: 1, rowSpan: 1 },
          { name: "Y1", colSpan: 1, rowSpan: 1 },
        ],
        [
          { name: "D", colSpan: 1, rowSpan: 1 },
          { name: "D1", colSpan: 1, rowSpan: 1 },
        ],
        [
          { name: "F", colSpan: 1, rowSpan: 1 },
          { name: "F1", colSpan: 1, rowSpan: 1 },
        ],
        [
          { name: "F", colSpan: 1, rowSpan: 1 },
          { name: "F1", colSpan: 1, rowSpan: 1 },
        ],
        // [{name:"W", colSpan: 1, rowSpan: 1}, {name: "F1", colSpan: 1, rowSpan: 1}],
      ];
      let col3 = ["0", "0", "0", "0", "0", "0", "0", "0", "0"];

      temp = [];
      col3 = [];

      // let titleList = [
      //     ["1", "1", "1"],
      //     ["2", "2", "2"],
      //     ["3", "3", "3"],
      //     ["4", "4", "4"],
      //     ["5", "5", "5"],
      //     ["6", "6", "6"],
      //     ["7", "7", "7"],
      //     ["8", "8", "8"],
      //     ["9", "9", "9"],
      // ]
      let titleList = [];

      dataList.forEach((item, index) => {
        temp.push([
          { name: dataList[index].col1, colSpan: 1, rowSpan: 1 },
          { name: dataList[index].col2, colSpan: 1, rowSpan: 1 },
        ]);
        let shoporder = [];
        // col3.push(dataList[index].col3);
        col3.push({ name: dataList[index].col3, colSpan: 1, rowSpan: 1 });
        titleList1.forEach((some, i) => {
          if (i > 2) {
            shoporder.push(dataList[index][some]);
          }
        });
        titleList.push(shoporder);
      });

      let repeatTimes = 0;
      for (let i = 0; i < temp.length; i++) {
        // 合并行
        if (temp[i][1] && temp[i][0].name === temp[i][1].name) {
          temp[i] = [{ name: temp[i][0].name, colSpan: 2 }];
        }
        // 合并列,整体思路就是判断当前与下一行的name值是否一致，如果一致，那就把下一行的这个name一致所在的对象给删了
        // 并且记录下当前的重复次数，因为删了一个对象，所以下一次就不能直接进行比较，要拿到最开始的那一个同值的name对象
        // 再进行下一次判断，如果判断的name值不一样了，那就把重复次数给置零；继续下一步
        else {
          //   有重复次数时进入此判断
          if (repeatTimes > 0) {
            //   如果最开始的 与 最新的相等，那就 重复次数再加一，并且给赋值过去，并且删掉下一行的包含name的对象
            if (
              temp[i + 1] &&
              temp[i - repeatTimes][0].name == temp[i + 1][0].name
            ) {
              repeatTimes++;
              temp[i - repeatTimes + 1][0].rowSpan = repeatTimes + 1;
              temp[i - repeatTimes + 1][0].class = "outline";
              let some = JSON.parse(JSON.stringify(temp[i + 1][1]));
              temp[i + 1] = [some];
            } else {
              // 虽然最新的一个与最开始的不同，但是因为之前有过重复次数，也得加进来，加进来之后，置零重复次数，进行下一波
              temp[i - repeatTimes][0].rowSpan = repeatTimes + 1;
              repeatTimes = 0;
            }
          }
          //   如果第一次有相同的，那么就加上重复次数，之后进行上面的循环，直到上面的循环把重复次数置零
          else if (temp[i + 1] && temp[i][0].name == temp[i + 1][0].name) {
            repeatTimes++;
            let some = JSON.parse(JSON.stringify(temp[i + 1][1]));
            temp[i + 1] = [some];
          }
          //   如果都不符合的话就不符合呗，就不对这个数据进行处理了，没有任何代码
        }
      }
      for (let i = 0; i < temp.length; i++) {
        if (col3[i + 1] && col3[i].name == "" && col3[i + 1].name == "" && i < 4) {
          col3[i].rowSpan++;
          col3[i + 1] = {};
        }
        if (col3[i].name !== undefined) {
          temp[i] = temp[i].concat(col3[i])
        }
        temp[i] = temp[i].concat(titleList[i]);
      }
      console.log(temp);
      return temp;
    },
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  vertical-align: middle;
}
td,
th {
  border: 1px solid black;
  display: table-cell;
  vertical-align: middle;
  min-width: 60px;
  font-weight: bold;
  padding: 0 3px;
}
.outline {
  width: 50px;
}
</style>
