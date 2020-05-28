// var page = "data/长部/人牛王经/index.html";
//
// page = page.replace(/\n/g, "")
// var patt = /(.*\/)/g
// page = page.split(patt)
// console.log(page)


// var linkList = page.match(patt);
// console.log(linkList)
// for (let i = 0; i < linkList.length; i++) {
//     var p = /<a href="(.*?)">(.*?)<\/a>/g
//     var mdl = linkList[i].split(p);
//     var link = mdl[0] + "<a @click=\"switchChapter('" + mdl[1] + "')\">" + mdl[2] + "</a>" + mdl[3];
//     console.log(link)
// }

// function doReplace(page) {
//     let outPage = ""
//     page = page.replace(/\n/g, "") //去除空格
//     var patt = /<p.*?<a.*?<\/a>.*?<\/p>/g
//     var linkList = page.match(patt);
//     for (let i = 0; i < linkList.length; i++) {
//         var p = /<a href="(.*?)">(.*?)<\/a>/g
//         var mdl = linkList[i].split(p);
//         var link = mdl[0] + "<a @click=\"switchChapter('" + mdl[1] + "')\">" + mdl[2] + "</a>" + mdl[3];
//         outPage += link + "\n";
//     }
//     return outPage;
// }
//
// var ddd = doReplace(page)
// console.log(ddd)


let obj1 = {"name": "one","dogs":["dog1","dog2"]};
// let obj2 = Object.assign({},obj1);
let obj2 = JSON.parse(JSON.stringify(obj1))
obj2.name = "two";
obj2.dogs[0] = "haha"
delete obj2["dogs"]
console.log(obj1);
console.log(obj2);

