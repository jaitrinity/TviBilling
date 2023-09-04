export class Constant{
    
    // public static serverURL = "http://localhost:8080/TVI_Billing/billing/";

    // public static serverURL = "http://www.in3.co.in:8080/TVI_Billing/billing/";
    // public static phpServerURL = "http://www.in3.co.in/in3.co.in/TVI_CP/";

    public static phpServerURL = "http://66.23.200.162/TVI_Billing/";
    // public static serverURL = "http://66.23.200.162:8080/TVI_Billing/billing/";
    public static serverURL = "/TVI_Billing/billing/";
    
    public static SUCCESSFUL_RESPONSE = "100000";
    public static SUCCESSFUL_STATUS_CODE = "100000";
    public static GENERIC_DATABASE_ERROR = "-102003";
    public static NO_RECORDS_FOUND_CODE = "102001";
    public static NO_RECORD_FOUND = "No Record Found";
    public static TRINITY_PRIVATE_KEY = "TRINITYPRIVATEKEY";
    public static GOOGLE_MAP_API_KEY = "AIzaSyDkv0_3UwK1Y_EpQ1LHQr5KA5oVBMc1160";
    public static SERVER_ERROR = "Server Error";
    public static MINUTES_UNITL_AUTO_LOGOUT = 30; // in mins
    public static CHECK_INTERVAL = 15000; // in ms
    public static STORE_KEY =  'lastAction';
    public static TOSTER_FADEOUT_TIME = 1000;

    public static returnServerErrorMessage(serviceName:string):string{
        return "Server error while invoking "+serviceName+ " serive";
    }
    
}