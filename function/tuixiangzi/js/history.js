// 记录操作历史全部的
class History {

    constructor() {
        this.historyList = [];
    }

    addRecord(json) {
        this.historyList.push(json);
        console.log(this.historyList);
    }

    ctrlZ() {
        this.historyList.pop();
    }

    getHistory() {
        return this.historyList[this.historyList.length - 1];
    }

}