import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as xlsx from 'xlsx';
import { CommonService } from '../shared/services/CommonService';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Constant } from '../shared/constant/Constant';
import { DatePipe } from '@angular/common';
import { CommonFunction } from '../shared/constant/CommonFunction';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export interface PeriodicElement {
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  displayedColumns: string[];
  dataSource = ELEMENT_DATA;
  
  spinnerColor: ThemePalette = 'accent';
  inProgress : boolean = false;
  inProgress1 : boolean = false;
  inProgress2 : boolean = false;
  inProgress3 : boolean = false;
  inProgress4 : boolean = false;
  inProgress5 : boolean = false;
  inProgress6 : boolean = false;
  inProgress7 : boolean = false;
  inProgress8 : boolean = false;
  inProgress9 : boolean = false;
  inProgress10 : boolean = false;
  inProgress11 : boolean = false;
  inProgressOther : boolean = false;
  isInProgress : boolean = false;
  isShowOperator : boolean = false;
  isShowCircle : boolean = false;

  startDate = "";
  endDate = "";
  operator = "";
  currentMonth = "";
  currentYear = "";
  month = "";
  year = "";
  type = "";
  dgPercentage = 0;
  ebPercentage = 0;
  energyPercentage = "";
  operatorList = [];
  selectedOperatorList = [];
  circleList = [];
  selectedCircleList = [];
  circleName = "";
  monthList = [];
  selectedMonthList1 = [];
  selectedMonthList2 = [];
  selectedMonthList3 = [];
  selectedMonthList4 = [];
  selectedMonthList5 = [];
  selectedMonthList6 = [];
  selectedMonthList7 = [];
  selectedMonthList8 = [];
  airtelManualBillingMonthList = [];
  rjioManualBillingMonthList = [];
  bsnlManualBillingMonthList = [];
  // vilManualBillingMonthList = [];
  otherManualBillingMonthList = [];
  operatorName = "";
  airtelCircle = "";
  @ViewChild('myInput') myInputVariable: ElementRef;
  @ViewChild('rjioFile') rjioFileVariable: ElementRef;
  @ViewChild('bsnlFile') bsnlFileVariable: ElementRef;
  // @ViewChild('vilFile') vilFileVariable: ElementRef;
  @ViewChild('otherFile') otherFileVariable: ElementRef;
  multiSelectdropdownSettings = {};
  singleSelectdropdownSettings = {};
  phpServerURL = "";
  username : string;
  constructor(private commonService : CommonService, private toastr: ToastrService,
    private _snackBar: MatSnackBar,private datePipe : DatePipe, private router:Router) { 
      this.username = localStorage.getItem("empName");
    }

  ngOnInit(): void {
    this.multiSelectdropdownSettings = {
      singleSelection: false,
      idField: 'paramCode',
      textField: 'paramDesc',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    this.singleSelectdropdownSettings = {
      singleSelection: true,
      idField: 'paramCode',
      textField: 'paramDesc',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      closeDropDownOnSelection : true
    };

    // this.month = this.datePipe.transform(new Date(),'dd-MM-yy');
    // this.currentMonth = this.datePipe.transform(new Date(),'MMM');
    this.currentYear = this.datePipe.transform(new Date(),'yy');
    let previousYear = parseInt(this.currentYear) - 1;
    let nextYear = parseInt(this.currentYear) + 1;
    // this.month = this.currentMonth+""+this.currentYear;
    // this.operatorList = ["Airtel","BSNL","IDEA","PB_HFCL","RJIO","Sify","TCL_IOT","TCL_NLD","TCL_Redwin","TCL_Wimax","TTSL_CDMA","TTSL","Vodafone","ZTS"];
    this.operatorList = ["Airtel","BSNL","IDEA","PB_HFCL","RJIO","Sify","TCL_IOT","TCL_NLD","TCL_Redwin","TCL_Wimax","Pulse_Telesystem","TTSL","Vodafone","ZTS"];
    this.monthList  = [
      "Apr-"+previousYear,
      "May-"+previousYear,
      "Jun-"+previousYear,
      "Jul-"+previousYear,
      "Aug-"+previousYear,
      "Sep-"+previousYear,
      "Oct-"+previousYear,
      "Nov-"+previousYear,
      "Dec-"+previousYear,
      "Jan-"+this.currentYear,
      "Feb-"+this.currentYear,
      "Mar-"+this.currentYear,
      "Apr-"+this.currentYear,
      "May-"+this.currentYear,
      "Jun-"+this.currentYear,
      "Jul-"+this.currentYear,
      "Aug-"+this.currentYear,
      "Sep-"+this.currentYear,
      "Oct-"+this.currentYear,
      "Nov-"+this.currentYear,
      "Dec-"+this.currentYear,
      "Jan-"+nextYear,
      "Feb-"+nextYear,
      "Mar-"+nextYear
    ]
    // this.monthList = [
    //   {paramCode : "Jan"+this.currentYear, paramDesc : "January"},
    //   {paramCode : "Feb"+this.currentYear, paramDesc : "February"},
    //   {paramCode : "Mar"+this.currentYear, paramDesc : "March"},
    //   {paramCode : "Apr"+this.currentYear, paramDesc : "April"},
    //   {paramCode : "Mar"+this.currentYear, paramDesc : "May"},
    //   {paramCode : "Jun"+this.currentYear, paramDesc : "June"},
    //   {paramCode : "Jul"+this.currentYear, paramDesc : "July"},
    //   {paramCode : "Aug"+this.currentYear, paramDesc : "August"},
    //   {paramCode : "Sep"+this.currentYear, paramDesc : "September"},
    //   {paramCode : "Oct"+this.currentYear, paramDesc : "October"},
    //   {paramCode : "Nov"+this.currentYear, paramDesc : "November"},
    //   {paramCode : "Dec"+this.currentYear, paramDesc : "December"}
    // ];

    // console.log(JSON.stringify(this.monthList));
    // this.openSnackBar("hello")

    this.phpServerURL = Constant.phpServerURL+"php/";
    this.getCirclenamelist();
  }

  logout(){
    let isConfirm = confirm("Do you want to logout ?");
    if(isConfirm){
      localStorage.clear();
      this.router.navigate(['/login']);
    }
    
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Alert !", {
      duration: 3000,
    });
  }

  onSelectOrDeselect5(items){
    this.getBillingReportPeriodMonth();
  }

  getBillingReportPeriodMonth(){
    this.isShowOperator = false;
    this.isShowCircle = false;
    let month = CommonFunction.createCommaSeprate(this.selectedMonthList5);
    if(month != ''){
      
      this.commonService.getAllListBySearchType("billingCount&period="+month)
      .subscribe((response) =>{
        let billing_report_count = response.billing_report_count;
        if(billing_report_count != 0){
          this.isShowOperator = true;
          this.isShowCircle = true;
        }
      },
      (error)=>{
        //this.toastr.warning(Constant.returnServerErrorMessage("getCategorySubcategoryByRole"),"Alert !",{timeOut : this.alertFadeoutTime});
      });
    }
  }

  importFile(event){
    this.readThis(event.target);
  }

  excelBase64Str : any = "";
  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      let image = myReader.result;
      this.excelBase64Str = image;
      // console.log(this.excelBase64Str)
    }
    myReader.readAsDataURL(file);
  }

  getCirclenamelist(){ 
    this.commonService.getAllListBySearchType("circleName")
    .subscribe((response) =>{
      // console.log(response);
      this.circleList = response.circleList;
    },
    (error)=>{
      //this.toastr.warning(Constant.returnServerErrorMessage("getCategorySubcategoryByRole"),"Alert !",{timeOut : this.alertFadeoutTime});
    });
  }

  upload() {
    let jsonData = {
      operator : this.operator,
      month : this.month,
      type : this.type,
      excelBase64Str : this.excelBase64Str
    }
    this.inProgress = true;
    this.commonService.importData(jsonData)
    .subscribe( response => {
      this.inProgress = false;
        if(response.responseCode === Constant.SUCCESSFUL_STATUS_CODE){
          this.openSnackBar("DATA_SUCCESSFULLY_IMPORT");
          // location.reload();
          
        }
        else{
          this.openSnackBar(response.errorsMap.GENERIC_DATABASE_ERROR);
        }
    })
       
  }

  downloadFormat(billingType){
    if(billingType == "Airtel"){
      let url = Constant.phpServerURL+"format/Airtel_Manual_"+this.airtelCircle+".xlsx";
      window.open(url);
    }
    else if(billingType == "RJIO"){
      let url = Constant.phpServerURL+"format/RJIO_Manual.xlsx";
      window.open(url);
    }
    else if(billingType == "BSNL"){
      let url = Constant.phpServerURL+"format/BSNL_Manual.xlsx";
      window.open(url);
    }
    else if(billingType == "VIL"){
      let url = Constant.phpServerURL+"format/VIL_Manual.xlsx";
      window.open(url);
    }
    
  }

  downloadFormatOther(){
    let url = Constant.phpServerURL+"format/"+this.operatorName+"_Manual.xlsx";
    window.open(url);
  }

  excelUrl1 = "";
  excelUrl2 = "";
  excelUrl3 = "";
  excelUrl4 = "";
  excelUrl5 = "";
  excelUrl6 = "";
  excelUrl7 = "";
  previous = "";
  current = "";
  downloadReport(reportType,id){
    this.operator = CommonFunction.createCommaSeprate(this.selectedOperatorList);
    this.circleName = CommonFunction.createCommaSeprateByParamCode(this.selectedCircleList);
    if(id == 1 && this.selectedMonthList1.length == 0){
      this.openSnackBar("Please select month");
      return ;
    }
    else if(id == 2 && this.selectedMonthList2.length == 0){
      this.openSnackBar("Please select month");
      return ;
    }
    else if(id == 3 && this.selectedMonthList3.length == 0){
      this.openSnackBar("Please select month");
      return ;
    }
    else if(id == 4 && this.selectedMonthList4.length == 0){
      this.openSnackBar("Please select month");
      return ;
    }
    else if(id == 5 && this.selectedMonthList5.length == 0){
      this.openSnackBar("Please select Bill Month");
      return ;
    }
    // else if(id == 5 && this.selectedOperatorList.length == 0){
    //   this.openSnackBar("Please select atleast one operator");
    //   return ;
    // }
    else if(id == 6 && this.selectedMonthList6.length == 0){
      this.openSnackBar("Please select month");
      return ;
    }
    else if(id == 6 && this.selectedOperatorList.length == 0){
      this.openSnackBar("Please select atleast one operator");
      return ;
    }
    // else if(id == 7 && this.selectedMonthList7.length == 0){
    //   this.openSnackBar("Please select month");
    //   return ;
    // }
    else if(id == 7 && this.startDate == ""){
      this.openSnackBar("Please select a start date");
      return ;
    }
    else if(id == 7 && this.endDate == ""){
      this.openSnackBar("Please select a end date");
      return ;
    }
    else if(id == 7 && this.energyPercentage == ""){
      this.openSnackBar("Please enter energy %");
      return ;
    }
    this.month = "";
    if(id == 1)this.month = CommonFunction.createCommaSeprate(this.selectedMonthList1);
    else if(id == 2)this.month = CommonFunction.createCommaSeprate(this.selectedMonthList2);
    else if(id == 3)this.month = CommonFunction.createCommaSeprate(this.selectedMonthList3);
    else if(id == 4)this.month = CommonFunction.createCommaSeprate(this.selectedMonthList4);
    else if(id == 5)this.month = CommonFunction.createCommaSeprate(this.selectedMonthList5);
    else if(id == 6)this.month = CommonFunction.createCommaSeprate(this.selectedMonthList6);
    else if(id == 7){
      // this.month = CommonFunction.createCommaSeprate(this.selectedMonthList7);
      // this.previous = this.datePipe.transform(new Date(this.startDate),'MMMyyyy');
      // this.current = this.datePipe.transform(new Date(this.endDate),'MMMyyyy');
      this.previous = this.datePipe.transform(new Date(this.startDate),'MMM-yy');
      this.current = this.datePipe.transform(new Date(this.endDate),'MMM-yy');
      if(this.previous == this.current){
        this.openSnackBar("End date should be next month date of start date.");
        return ;
      }
    }
    
    let jsonData = {
      month : this.month,
      reportType : reportType,
      operator : this.operator,
      circleName : this.circleName,
      dgPercentage : this.dgPercentage,
      ebPercentage : this.ebPercentage,
      energyPercentage : this.energyPercentage,
      startDate : this.previous,
      endDate : this.current
    }
    //console.log(this.operator)
    if(id == 1){
      window.open(this.phpServerURL+"PnLSitewise.php?period="+this.month);
      return;
    }
    else if(id == 3){
      if(this.operator ==""){
        window.open(this.phpServerURL+"circleSummaryReport.php?period="+this.month);
      }
      else{
        window.open(this.phpServerURL+"opcowise.php?period="+this.month+"&operatorName="+this.operator);
      }
      return;
    }
    else if(id == 5){
      let queryParam = "";
      if(this.operator != "") queryParam+= "&operatorName="+this.operator+"&circleName=";
      if(this.circleName != "") queryParam += ""+this.circleName;
      window.open(this.phpServerURL+"billingReport.php?period="+this.month+queryParam);
      return ;
    }
    else if(id == 6){
      let queryParam = "";
      if(this.operator != "") queryParam += "&operatorName="+this.operator+"&circleName=";
      if(this.circleName != "") queryParam += ""+this.circleName;
      window.open(this.phpServerURL+"/missingPeriodReport.php?period="+this.month+queryParam);
      return ;
    }
    // if(id == 1)this.inProgress1 = true;
    if(id == 2)this.inProgress2 = true;
    if(id == 4)this.inProgress4 = true;
    if(id == 7)this.inProgress7 = true;
    this.commonService.downloadReport(jsonData)
    .subscribe( response => {
      // if(id == 1) {this.inProgress1 = false; this.excelUrl1 = response.wrappedList[0]};
      if(id == 2) {this.inProgress2 = false; this.excelUrl2 = response.wrappedList[0]};
      if(id == 4) {this.inProgress4 = false; this.excelUrl4 = response.wrappedList[0]};
      if(id == 7) {this.inProgress7 = false; this.excelUrl5 = response.wrappedList[0]};
      window.open(response.wrappedList[0]);
    })
  }

  downloadBillingStatus(){
    if(this.selectedMonthList8.length == 0){
      this.openSnackBar("Please select month");
      return ;
    }
    this.isInProgress = true;
    this.month = CommonFunction.createCommaSeprate(this.selectedMonthList8);
    
    // window.open(this.phpServerURL+"downloadBillingStatus.php?period="+this.month);

    let jsonData = {
      month : this.month
    }
    this.commonService.postRequestForAnyService('downloadBillingStatus',jsonData)
    .subscribe( response => {
      // console.log(response);
      this.displayedColumns = response.tableColumnList
      this.dataSource = response.tableData;
      this.isInProgress = false;
    })
  }

  selectAirtelCircle(){
    this.airtelManualBillingMonthList = [];
    this.myInputVariable.nativeElement.value = "";
  }

  arrayBuffer : any;
  importData : any = [];
  selectFileForUpload(event,billingType){
    var file : File = event.target.files[0];
    // console.log(file);
    if(billingType == 'Airtel' && this.airtelCircle == "AP" && file.name != "Airtel_Manual_AP.xlsx"){
      this.myInputVariable.nativeElement.value = "";
      this.openSnackBar("Please select `Airtel_Manual_AP.xlsx` file for upload");
      return ;
    }
    else if(billingType == 'Airtel' && this.airtelCircle == "TN" && file.name != "Airtel_Manual_TN.xlsx"){
      this.myInputVariable.nativeElement.value = "";
      this.openSnackBar("Please select `Airtel_Manual_TN.xlsx` file for upload");
      return ;
    }
    else if(billingType == 'RJIO' && file.name != "RJIO_Manual.xlsx"){
      this.rjioFileVariable.nativeElement.value = "";
      this.openSnackBar("Please select `RJIO_Manual.xlsx` file for upload");
      return ;
    }
    else if(billingType == 'BSNL' && file.name != "BSNL_Manual.xlsx"){
      this.bsnlFileVariable.nativeElement.value = "";
      this.openSnackBar("Please select `BSNL_Manual.xlsx` file for upload");
      return ;
    }
    // else if(billingType == 'VIL' && file.name != "VIL_Manual.xlsx"){
    //   this.vilFileVariable.nativeElement.value = "";
    //   this.openSnackBar("Please select `VIL_Manual.xlsx` file for upload");
    //   return ;
    // }
    else if(billingType == 'Other'){
      let fileName = this.operatorName+"_Manual.xlsx";
      if(file.name != fileName){
        this.otherFileVariable.nativeElement.value = "";
        this.openSnackBar("Please select `"+fileName+"` file for upload");
        return ;
      }
      
    }
    
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = xlsx.read(bstr, {type:"binary",cellText:false,cellDates:true});
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.importData = xlsx.utils.sheet_to_json(worksheet,{raw:false,dateNF: "dd-MMM-yy"});
      // console.log(this.importData);
    }
    fileReader.readAsArrayBuffer(file);
  }
  notInsertSiteAirtel = [];
  notInsertSiteRJIO = [];
  notInsertSiteBSNL = [];
  notInsertSiteVIL = [];
  notInsertSiteOther = [];
  uploadManualBilling(billingType : any){
    this.month = "";
    if(billingType == 'Airtel'){
      this.month = CommonFunction.createCommaSeprate(this.airtelManualBillingMonthList);
      let notMatchCircle = [];
      for (let obj of this.importData) {
        for (let key in obj) {
            if(key == "Circle Name" && !(obj[key] == "AP" || obj[key] == "TN")){
              notMatchCircle.push(obj[key])
            }
        }
      }
      let alertMsg = "Only `AP` and `TN` circle are valid.\n"
      if(notMatchCircle.length != 0){
        alert(alertMsg+"Please remove "+notMatchCircle+" circle(s) from excel.");
        return ;
      }
    }
    else if(billingType == 'RJIO'){
      this.month = CommonFunction.createCommaSeprate(this.rjioManualBillingMonthList);
      // let notMatchSite = [];
      // for (let obj of this.importData) {
      //   for (let key in obj) {
      //       if(key == "TVI Site ID" && !(obj[key] == "VFUPLKO0473" || obj[key] == "SPPUFER0217")){
      //         notMatchSite.push(obj[key])
      //       }
      //   }
      // }
      // let alertMsg = "Only `VFUPLKO0473` and `SPPUFER0217` site are valid.\n"
      // if(notMatchSite.length != 0){
      //   alert(alertMsg+"Please remove "+notMatchSite+" site(s) from excel.");
      //   return ;
      // }
    }
    else if(billingType == 'BSNL'){
      this.month = CommonFunction.createCommaSeprate(this.bsnlManualBillingMonthList);
      // let notMatchSite = [];
      // for (let obj of this.importData) {
      //   for (let key in obj) {
      //       if(key == "IP Site ID" && !(obj[key] == "ATGJKTC0278")){
      //         notMatchSite.push(obj[key])
      //       }
      //   }
      // }
      // let alertMsg = "Only `ATGJKTC0278` site is valid.\n"
      // if(notMatchSite.length != 0){
      //   alert(alertMsg+"Please remove "+notMatchSite+" site(s) from excel.");
      //   return ;
      // }
    }
    // else if(billingType == 'VIL'){
    //   this.month = CommonFunction.createCommaSeprate(this.vilManualBillingMonthList);
    // }
    else if(billingType == 'Other'){
      this.month = CommonFunction.createCommaSeprate(this.otherManualBillingMonthList);
    }

    if(billingType == "Airtel" && this.airtelCircle == ""){
      this.openSnackBar("Please select circle");
      return ;
    }
    else if(billingType == "Other" && this.operatorName == ""){
      this.openSnackBar("Please select Operator");
      return ;
    }
    else if(this.month == ""){
      this.openSnackBar("Please select Bill Month");
      return ;
    }
    else if(this.importData.length == 0){
      this.openSnackBar("Please choose a correct file for upload");
      return ;
    }
    let jsonData = {
      month: this.month,
      excelData : this.importData,
      billingType : billingType,
      operatorName : this.operatorName
    }
    if(billingType == 'Airtel') this.inProgress8 = true;
    else if(billingType == 'RJIO') this.inProgress9 = true;
    else if(billingType == 'BSNL') this.inProgress10 = true;
    else if(billingType == 'VIL') this.inProgress11 = true;
    else if(billingType == 'Other') this.inProgressOther = true;
    this.commonService.postRequestForAnyService("uploadExcel",jsonData)
    .subscribe( response => {
      //console.log(response);
      
      this.notInsertSiteAirtel = response.wrappedList;
      if(billingType == 'Airtel'){
        this.inProgress8 = false;
        this.notInsertSiteAirtel = response.wrappedList;
      }
      else if(billingType == 'RJIO'){
        this.inProgress9 = false;
        this.notInsertSiteRJIO = response.wrappedList;
      }
      else if(billingType == 'BSNL'){
        this.inProgress10 = false;
        this.notInsertSiteBSNL = response.wrappedList;
      } 
      else if(billingType == 'VIL'){
        this.inProgress11 = false;
        this.notInsertSiteVIL = response.wrappedList;
      } 
      else if(billingType == 'Other'){
        this.inProgressOther = false;
        this.notInsertSiteOther = response.wrappedList;
      } 

      if(response.responseCode == Constant.SUCCESSFUL_RESPONSE){
        this.toastr.success("Successfully uploaded.","Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
        this.getAllDefault();
      }
      else{
        this.openSnackBar("Please try again");
      }
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("uploadManualBilling"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
    })
  }

  getAllDefault(){
    this.airtelManualBillingMonthList = [];
    this.myInputVariable.nativeElement.value = "";

    this.rjioManualBillingMonthList = [];
    this.rjioFileVariable.nativeElement.value = "";

    this.bsnlManualBillingMonthList = [];
    this.bsnlFileVariable.nativeElement.value = "";

    // this.vilManualBillingMonthList = [];
    // this.vilFileVariable.nativeElement.value = "";

    this.otherManualBillingMonthList = [];
    this.otherFileVariable.nativeElement.value = "";

    this.airtelCircle = "";
    this.operatorName = "";
  }
  

}
