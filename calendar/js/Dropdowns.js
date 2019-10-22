function DateSelector(selYear, selMonth, selDay) {//定義函式
    this.selYear = selYear;
    this.selMonth = selMonth;
    this.selDay = selDay;
    this.selYear.Group = this;
    this.selMonth.Group = this;
    // 給年份、月份下拉選單新增處理onchange事件的函式
    if (window.document.all != null) // IE
    {
        this.selYear.attachEvent("onchange", DateSelector.Onchange);
        this.selMonth.attachEvent("onchange", DateSelector.Onchange);
    }
    else // Firefox
    {
        this.selYear.addEventListener("change", DateSelector.Onchange, false);
        this.selMonth.addEventListener("change", DateSelector.Onchange, false);
    }
    if (arguments.length == 4) // 如果傳入引數個數為4,最後一個引數必須為Date物件
        this.InitSelector(arguments[3].getFullYear(), arguments[3].getMonth() + 1, arguments[3].getDate());
    else if (arguments.length == 6) // 如果傳入引數個數為6,最後三個引數必須為初始的年月日數值
        this.InitSelector(arguments[3], arguments[4], arguments[5]);
    else // 預設使用當前日期
    {
        var dt = new Date();
        this.InitSelector(dt.getFullYear(), dt.getMonth() + 1, dt.getDate());
    }
}
// 增加一個最小年份的屬性--最老年份
DateSelector.prototype.MinYear = 1960;
// 增加一個最大年份的屬性--最新年份,即當前時期getFullYear()
DateSelector.prototype.MaxYear = (new Date()).getFullYear();
// 初始化年份
DateSelector.prototype.InitYearSelect = function () {
    // 迴圈新增OPION元素到年份select物件中
    for (var i = this.MaxYear; i >= this.MinYear; i--) {
        // 新建一個OPTION物件
        var op = window.document.createElement("OPTION");
        // 設定OPTION物件的值
        op.value = i;
        // 設定OPTION物件的內容
        op.innerHTML = i;
        // 新增到年份select物件
        this.selYear.appendChild(op);
    }
}
// 初始化月份
DateSelector.prototype.InitMonthSelect = function () {
    // 迴圈新增OPION元素到月份select物件中
    for (var i = 1; i < 13; i++) {
        // 新建一個OPTION物件
        var op = window.document.createElement("OPTION");
        // 設定OPTION物件的值
        op.value = i;
        // 設定OPTION物件的內容
        op.innerHTML = i;
        // 新增到月份select物件
        this.selMonth.appendChild(op);
    }
}
// 根據年份與月份獲取當月的天數
DateSelector.DaysInMonth = function (year, month) {
    var date = new Date(year, month, 0);
    return date.getDate();
}
// 初始化天數
DateSelector.prototype.InitDaySelect = function () {
    // 使用parseInt函式獲取當前的年份和月份
    var year = parseInt(this.selYear.value);
    var month = parseInt(this.selMonth.value);
    // 獲取當月的天數
    var daysInMonth = DateSelector.DaysInMonth(year, month);
    // 清空原有的選項
    this.selDay.options.length = 0;
    // 迴圈新增OPION元素到天數select物件中
    for (var i = 1; i <= daysInMonth; i++) {
        // 新建一個OPTION物件
        var op = window.document.createElement("OPTION");
        // 設定OPTION物件的值
        op.value = i;
        // 設定OPTION物件的內容
        op.innerHTML = i;
        // 新增到天數select物件
        this.selDay.appendChild(op);
    }
}
// 處理年份和月份onchange事件的方法,它獲取事件來源物件(即selYear或selMonth)
// 並呼叫它的Group物件(即DateSelector例項,請見建構函式)提供的InitDaySelect方法重新初始化天數
// 引數e為event物件
DateSelector.Onchange = function (e) {
    var selector = window.document.all != null ? e.srcElement : e.target;
    selector.Group.InitDaySelect();
}
// 根據引數初始化下拉選單選項
DateSelector.prototype.InitSelector = function (year, month, day) {
    // 由於外部是可以呼叫這個方法,因此我們在這裡也要將selYear和selMonth的選項清空掉
    // 另外因為InitDaySelect方法已經有清空天數下拉選單,因此這裡就不用重複工作了
    this.selYear.options.length = 0;
    this.selMonth.options.length = 0;
    // 初始化年、月
    this.InitYearSelect();
    this.InitMonthSelect();
    // 設定年、月初始值
    this.selYear.selectedIndex = this.MaxYear - year;
    this.selMonth.selectedIndex = month - 1;
    // 初始化天數
    this.InitDaySelect();
    // 設定天數初始值
    this.selDay.selectedIndex = day - 1;
}