// 记录操作历史全部的
class History {

    constructor() {
        this.historyList = [];
    }

    addRecord(map) {
        // 引用数据类型的修改，需要深拷贝
        let json = JSON.parse(JSON.stringify(map.json));
        this.historyList.push(json);

        console.log(this.historyList);
    }

    ctrlZ() {
        // 第一条数据不能删除
        if (this.historyList.length === 1) {
            return ;
        }
        this.historyList.pop();
    }

    getHistory() {
        return this.historyList[this.historyList.length - 1];
    }

}