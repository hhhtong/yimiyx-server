let idTmr
function getExplorer () {
  const explorer = window.navigator.userAgent
  if (explorer.indexOf('MSIE') >= 0) {
    // ie
    return 'ie'
  } else if (explorer.indexOf('Firefox') >= 0) {
    // firefox
    return 'Firefox'
  } else if (explorer.indexOf('Chrome') >= 0) {
    // Chrome
    return 'Chrome'
  } else if (explorer.indexOf('Opera') >= 0) {
    // Opera
    return 'Opera'
  } else if (explorer.indexOf('Safari') >= 0) {
    // Safari
    return 'Safari'
  }
}
function tranform (table, aId, name) {
  const tableHead = table.$children[0].$el
  const tableBody = table.$children[1].$el
  let tableInnerHTML = '<thead><tr>'
  if (table.$children.length !== 1) {
    const len = tableBody.rows.length
    let i = -1
    while (i < len) {
      if (i === -1) {
        Array.from(tableHead.rows[0].children).forEach((td) => {
          tableInnerHTML = tableInnerHTML + '<th>' + td.children[0].children[0].innerHTML + '</th>'
        })
        tableInnerHTML += '</tr><thead><tbody>'
      } else {
        tableInnerHTML += '<tr>'
        Array.from(tableBody.rows[i].children).forEach((td) => {
          tableInnerHTML = tableInnerHTML + '<td>' + td.children[0].children[0].innerHTML + '</td>'
        })
        tableInnerHTML += '</tr>'
      }
      i++
    }
    tableInnerHTML += '</tbody>'
  }

  if (getExplorer() !== 'Safari' && name.substr(-1, 4) !== '.xls') {
    name += '.xls'
  }

  if (getExplorer() === 'ie') {
    const curTbl = table
    let oXL = new ActiveXObject('Excel.Application')
    const oWB = oXL.Workbooks.Add()
    const xlsheet = oWB.Worksheets(1)
    const sel = document.body.createTextRange()
    sel.moveToElementText(curTbl)
    sel.select()
    sel.execCommand('Copy')
    xlsheet.Paste()
    oXL.Visible = true

    try {
      var fname = oXL.Application.GetSaveAsFilename('Excel.xls', 'Excel Spreadsheets (*.xls), *.xls')
    } catch (e) {
      print('Nested catch caught ' + e)
    } finally {
      oWB.SaveAs(fname)
      // oWB.Close(savechanges = false);
      oXL.Quit()
      oXL = null
      idTmr = setInterval(Cleanup(), 1)
    }
  } else {
    tableToExcel(tableInnerHTML, aId, name)
  }
}
function Cleanup () {
  window.clearInterval(idTmr)
  // CollectGarbage();
}
let tableToExcel = (function () {
  const uri = 'data:application/vnd.ms-excel;base64,'
  const template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>'
  const base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
  const format = function (s, c) {
    return s.replace(/{(\w+)}/g, function (m, p) { return c[p] })
  }
  return function (table, aId, name) {
    const ctx = { worksheet: name || 'Worksheet', table }
    document.getElementById(aId).href = uri + base64(format(template, ctx))
    document.getElementById(aId).download = name
    document.getElementById(aId).click()
  }
})()

const table2excel = {}

table2excel.transform = tranform

export default table2excel
