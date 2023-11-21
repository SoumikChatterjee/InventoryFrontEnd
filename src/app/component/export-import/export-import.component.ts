import { Component } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { ProductService } from 'src/app/service/product.service';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Product } from 'src/app/models/Product';


@Component({
  selector: 'app-export-import',
  templateUrl: './export-import.component.html',
  styleUrls: ['./export-import.component.scss']
})
export class ExportImportComponent {
  fg:FormGroup
  constructor(private ps:ProductService, private http: HttpClient,private fb:FormBuilder){
    this.ps.getAllProducts().subscribe((data)=>{
      this.jsonData=data;
    });
    
    this.fg = this.fb.group({
      fc: '',
    });
  }


  jsonData:Array<Product>=[]
  exportCsv() {
    this.downloadFile(this.jsonData);
    console.log(this.fg.value.fc);
    
  }

  downloadFile(data: any[] , filename = 'data') {
    console.log(filename);
    
    const arrHeader = [...Object.keys(this.jsonData[0])];
    const csvData = this.ConvertToCSV(data, arrHeader);
    console.log(csvData)
    const blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    const dwldLink = document.createElement("a");
    const url = URL.createObjectURL(blob);
    const isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", this.fg.value.fc);
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  ConvertToCSV(objArray: string | any[], headerList: string[]) {
    console.log(objArray);
    console.log(headerList);
    const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';

    const newHeaders =["Id", "Name", "Description", "SKU", "Category", "Manufacturer", "Price", "Quantity Available", "Sold", "Images"];

    for (const index in newHeaders) {
      row += newHeaders[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + '';
      for (const index in headerList) {
        const head = headerList[index];

        line += ',' + this.strRep(array[i][head]);
      }
      str += line + '\r\n';
    }
    return str;
  }

  strRep(data:any) {
    if(typeof data == "string") {
      const newData = data.replace(/,/g, " ");
       return newData;
    }
    else if(typeof data == "undefined") {
      return "-";
    }
    else if(typeof data == "number") {
      return  data.toString();
    }
    else {
      return data;
    }
  }

  
}
