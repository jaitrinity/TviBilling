import { Component, OnInit } from '@angular/core';
import { AuthenticateModel } from './model/AuthenticateModel';
import { Constant } from '../shared/constant/Constant';
import { Router } from '@angular/router';
import { CommonService } from '../shared/services/CommonService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mobileNumber = "";
  otpNumber = "";
  newPassword = "";
  confirmPassword = "";
  validOTPNumber = "";
  isOTP_Validate : boolean = false;
  public loginModel : AuthenticateModel;
  constructor(private sharedService : CommonService,
    private router:Router, 
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) {
    this.loginModel = new AuthenticateModel();
  }

  ngOnInit(): void {
    // $(document).ready(function() {
    //   alert('I am Called From jQuery');
    // });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Alert !", {
      duration: 3000,
    });
  }

  checkAuthenticate(){
    if(this.loginModel.username == ""){
      this.openSnackBar("enter valid username")
      return ;
    }
    if(this.loginModel.password == ""){
      this.openSnackBar("enter password")
      return ;
    }
    this.spinner.show();
    this.sharedService.authenticate(this.loginModel)
    .subscribe( (response) =>{
      // this.spinner.hide(); 
      //  console.log(response);
         if(response.responseCode === Constant.SUCCESSFUL_STATUS_CODE){
          // sessionStorage.setItem("username",this.loginModel.username);
          // sessionStorage.setItem("password", this.loginModel.password)
          // localStorage.setItem("empId",this.loginModel.username);
          localStorage.setItem("empName",response.wrappedList[0].empName);
          // localStorage.setItem("empRole",response.wrappedList[0].empRole);
          localStorage.setItem(btoa("isValidToken"),btoa(Constant.TRINITY_PRIVATE_KEY));
          this.router.navigate(['/layout']);
          this.spinner.hide();
        }
        else{
          this.openSnackBar('Invalid Login Credentials...');
          this.spinner.hide();
        }
  },
    (error)=>{
      this.openSnackBar(Constant.returnServerErrorMessage("authenticate"));
      this.spinner.hide();
    })

  }

  openForgetPasswordModel(){
    if(this.loginModel.username == ""){
      alert("please enter valid username");
      return;
    }
    $("#forgetPasswordModal").modal({
      backdrop : 'static',
      keyboard : false
    });
  }

  sendOTP(){
    this.isOTP_Validate = false;
    this.validOTPNumber = "";
    let json = {
      loginEmpId : this.loginModel.username,
      mobileNumber : this.mobileNumber
    }
    this.spinner.show();
    this.sharedService.sendOTP(json)
    .subscribe( (response) =>{
      this.spinner.hide(); 
       //console.log(response);
         if(response.responseCode === Constant.SUCCESSFUL_STATUS_CODE){
          this.validOTPNumber = response.wrappedList[0];
          this.spinner.hide();
        }
        else{
          this.toastr.info('Invalid username or mobile number, please check', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
          this.spinner.hide();
        }
  },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("sendOTPtoMobile"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.spinner.hide();
    })
  }

  VerifyOTP(){
    this.isOTP_Validate = false;
    if(this.otpNumber != this.validOTPNumber){
      alert("enter enter valid otp");
      return;
    }
    this.isOTP_Validate = true;

  }

  changePassword(){
    if(this.newPassword == ""){
      alert("enter new password");
      return ;
    }
    else if(this.confirmPassword != this.newPassword){
      alert("password confirmation incorrect please check");
      return;
    }
    this.spinner.show(); 
    let json = {
      loginEmpId : this.loginModel.username,
      mobileNumber : this.mobileNumber,
      newPassword : this.newPassword
    }
    this.sharedService.changePassword(json)
    .subscribe( (response) =>{
      this.spinner.hide(); 
       //console.log(response);
         if(response.responseCode === Constant.SUCCESSFUL_STATUS_CODE){
          this.toastr.success('password change successfully', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
          $("#forgetPasswordModal").modal("hide");
          this.otpNumber = "";
          this.mobileNumber = "";
          this.newPassword = "";
          this.confirmPassword = "";
          this.isOTP_Validate = false;
          this.spinner.hide();
        }
        else{
          this.toastr.info('Invalid username or mobile number, please check', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
          this.spinner.hide();
        }
  },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("changePassword"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.spinner.hide();
    })
  }

  closeModal(){
    let isConfirm = confirm("Do you want to close?");
    if(isConfirm){
      this.mobileNumber = "";
      this.otpNumber = "";
      this.newPassword = "";
      this.confirmPassword = "";
      this.isOTP_Validate = false;
      $("#forgetPasswordModal").modal("hide");
    }
  }

}


