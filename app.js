const amt = document.querySelector('#loan-amount'),
    rate = document.querySelector('#interest-rate'),
    duration = document.querySelector('#duration'),
    loanform = document.querySelector("#loan-form"),
    mthlyInt = document.querySelector('.mthly-int-amt'),
    totalInt = document.querySelector('.total-int-amt'),
    totalloan = document.querySelector('.total-loan-sum'),
    innertopContainer = document.querySelector('.inner-top'),
    bottomContainer = document.querySelector('.btm'),
    loader = document.querySelector('.loader');
    
let alertCount = 0;

bottomContainer.style.display = 'none';

loadEventListeners();
function loadEventListeners(){
    loanform.addEventListener("submit",calculateLoan);
}
function calculateLoan(e){
    var missingField = document.createElement('div');
    missingField.id = "alert-field";
    missingField.className = "redalert row justify-content-center";
    missingField.innerHTML = '<div class="alert alert-danger col-sm-3">Enter all fields</div>';
    
    const alert = document.querySelector('.redalert');

    if (amt.value === '' || rate.value === '' || duration.value === ''){
        if (alertCount === 0){    
            innertopContainer.insertBefore(missingField,innertopContainer.childNodes[0]);
            alertCount += 1;
        }
        else{
            alert.style.display = "";
        }

    }else{
        if (alertCount > 0){
            alert.style.display = "none";
        }
        loader.style.display = "";
        bottomContainer.style.display = "none";
        setTimeout(timer, 2000);
        mthlyInt.value = "$";
        mthlyInt.value += calculateMthlyInt();
        totalInt.value = "$" 
        totalInt.value += (parseFloat(calculateMthlyInt()) * duration.value * 12).toFixed(2);
        totalloan.value = "$"
        totalloan.value += ((parseFloat(calculateMthlyInt()) * duration.value * 12) + parseFloat(amt.value)).toFixed(2);
        
    }
    e.preventDefault();
}

function calculateMthlyInt(){
    // calculate interest rate per month
    var R = rate.value / (12 * 100);

    // calculate mthly interest 
    var x =  (amt.value * R * Math.pow((1 + R),(duration.value*12))) / Math.pow((1+R),((duration.value*12)-1));
    mthlyInterestAmt = parseFloat(x).toFixed(2);
    return mthlyInterestAmt;
}

function timer(){
    loader.style.display = "none"
    bottomContainer.style.display = "block";
};

