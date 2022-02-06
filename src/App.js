import './App.css';
import {useEffect, useRef, useState, useCallback} from "react";
import XLSX from 'xlsx';
import {saveAs} from 'file-saver';

function App() {
  const [uploaded, setUploaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [fileCount, setFileCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const fileUploader = useRef(null);
  const dragRef = useRef(null);
  const xlsMimeTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
    'application/vnd.ms-excel',
    'application/vnd.ms-excel.sheet.macroEnabled.12'];

  const [orders, setOrders] = useState({});

  const openFileUpload = () => {
    if (fileUploader.current) {
      fileUploader.current.click();
    }
  }

  function handleFileLoad(event) {
    const data = event.target.result;
    // orders = {};
    // totalAmount = 0;
    const xls = XLSX.read(data, { type: 'array' });
    console.log(xls);
    const sheet = xls.Sheets[xls.SheetNames[0]];
    let i = 22
    while (true) {
      if (!sheet[`C${i}`]) {
        break;
      }

      const fullName = sheet[`C${i}`].v;
      const amount = parseInt(sheet[`G${i}`].v);

      let name = fullName;
      let colorIdx = name.lastIndexOf(' ');
      const color = name.substring(colorIdx+1).trim();
      name = name.substring(0, colorIdx);

      let sizeIdx = name.lastIndexOf(' ');
      const size = name.substring(sizeIdx+1).trim();
      name = name.substring(0, sizeIdx)
        .replace('앤젤아이', '')
        .replace('엔젤아이', '')
        .replace('오렌지다몸', '')
        .replace('오렌지 다몸', '')
        .trim();

      i += 2;
      orders[name] = orders[name] || {}
      orders[name][color] = orders[name][color] || {}
      orders[name][color][size] = orders[name][color][size] ? orders[name][color][size] + amount : amount;
      setTotalAmount(t => t + amount);
    }
    setUploaded(true);
    setFileCount(f => f + 1);
    setOrders(o => orders)
    console.log(orders);
  }

  function saveXlsx() {
    const sizes = getSizes();
    const workBook = XLSX.utils.book_new();
    const workSheet = {
      'A1': {t: 's', v: '상품명'},
      'B1': {t: 's', v: '색상'},
    };
    XLSX.utils.book_append_sheet(workBook, workSheet, "주문표");
    // workBook.SheetNames.push("주문표")
    // workBook.Sheets["주문표"] = workSheet;
    for (const idx in sizes) {
      const size = sizes[idx];
      workSheet[`${String.fromCharCode('C'.charCodeAt(0)+parseInt(idx))}1`] = {t: 's', v: size};
    }
    let row = 2;
    for (const item of Object.keys(orders)) {
      let from = row;
      workSheet[`A${row}`] = {t: 's', v: item};
      for (const color of Object.keys(orders[item])) {
        workSheet[`B${row}`] = {t: 's', v: color}
        for (const size of Object.keys(orders[item][color])) {
          const idx = sizes.indexOf(size)
          workSheet[`${String.fromCharCode('C'.charCodeAt(0)+parseInt(idx))}${row}`] = {t: 'n', v: orders[item][color][size]}
        }
        row ++;
      }
      if (row > from + 1) {
        workSheet['!merges'] = workSheet['!merges'] || []
        workSheet['!merges'].push({s: {r: from-1, c: 0}, e: {r: row-2, c: 0}})
      }
      row ++;
    }
    workSheet[`A${row}`] = {t : 's', v: '총 수량'};
    workSheet[`B${row}`] = {t : 'n', v: totalAmount};
    workSheet['!ref'] = `A1:${String.fromCharCode('C'.charCodeAt(0)+sizes.length)}${row}`
    console.log(workBook);
    const workBookOut = XLSX.write(workBook, {bookType: 'xlsx', type: 'binary'});
    saveAs(new Blob([s2ab(workBookOut)], {type: 'application/octet-stream'}), '주문표.xlsx')
  }

  function getSizes() {
    return Object.values(orders)
      .flatMap(colors => Object.values(colors))
      .flatMap(sizes => Object.keys(sizes))
      .concat(['100', '110', '120', '130', '140', '150', '160', '170'])
      .filter((val, idx, self) => self.indexOf(val) == idx)
      .sort();
  }

  function isXlsFile(type) {
    return xlsMimeTypes.includes(type)
  }

  const handleFiles = (files) => {
    console.log(files);
    for (const file of files) {
      console.log(file);
      if (!isXlsFile(file.type)) {
        continue;
      }

      const fileReader = new FileReader();
      fileReader.onload = handleFileLoad;
      fileReader.readAsArrayBuffer(file);
    }
  }

  const onFileChange = (e) => {
    handleFiles(e.target.files);
  }

  const handleDragIn = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  }, []);

  const handleDrop = useCallback(e => {
      e.preventDefault();
      e.stopPropagation();

      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    []
  );

  const initDragEvents = useCallback(() => {
    // 앞서 말했던 4개의 이벤트에 Listener를 등록합니다. (마운트 될때)

    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter", handleDragIn);
      dragRef.current.addEventListener("dragleave", handleDragOut);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback(() => {
    // 앞서 말했던 4개의 이벤트에 Listener를 삭제합니다. (언마운트 될때)

    if (dragRef.current !== null) {
      dragRef.current.removeEventListener("dragenter", handleDragIn);
      dragRef.current.removeEventListener("dragleave", handleDragOut);
      dragRef.current.removeEventListener("dragover", handleDragOver);
      dragRef.current.removeEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  function s2ab(s) {
    let buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    let view = new Uint8Array(buf);  //create uint8array as viewer
    for (let i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
  }

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  function downloadXlsx() {
    console.log(orders);
    console.log(getSizes());
    saveXlsx();
  }

  return (
    <div className="App">
      <input type="file" name="file" ref={fileUploader} multiple={true}
             hidden={true} onChange={onFileChange}/>

      <div className="dropHere" ref={dragRef}>
        이곳에 파일을 드래그 하세요
       <p style={{fontSize: '12pt', margin: 5, marginTop: 10}}>등록 파일 수 : {fileCount}</p>
       <p style={{fontSize: '12pt', margin: 5}}>총 상품 수량 : {totalAmount}</p>
        <button className="upload" onClick={openFileUpload}>
            업로드
        </button>
        <button className="download" hidden={!uploaded} onClick={downloadXlsx}>
            다운로드
        </button>
      </div>

      <div className="background">
      </div>
    </div>
  );
}

export default App;
