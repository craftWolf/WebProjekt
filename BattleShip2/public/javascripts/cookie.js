var counter = 0;

function setCookie(name,value,expireD){
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expireD);
    document.cookie = name + "=" + escape(value) +
                    ((expireD == null) ? "" : ";expires=" + exdate.toGMTString());

}

function getCookie(name){
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(name + "=");
        if (c_start != -1) {
            c_start = c_start + name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function checkCookie(){
    counter = getCookie("visits");
    counter++;
    if(document.cookie.length<=0) setCookie('visits', 1, 180);
    else{
        if(counter!=null && counter!=0){
            setCookie("visits",counter,30);
            var elem = document.getElementById("visited");
            // counter = 0;
            elem.innerHTML="Total Number of Visits:"+counter;
        }
    }
}
checkCookie();

module.exports(counter)