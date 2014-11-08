
 //.V2UH
 //#UH_feedup
 //#RH_feedup
 //#n_feedup
 //#UHM_feedup
 //#RHM_feedup
 //#nM_feedup

 var iyaaa = new function () {
   var V2UH,
       UH_feedup_line,
       RH_feedup_line,
       KH_feedup_line,
       n_feedup_line,
       UHM_feedup_line,
       RHM_feedup,
       KHM_feedup,
       nM_feedup,
       UCA_feedup,
       Sigma_feedup,
       Mu_feedup;
       inputPattern = '^(([0-9]*)|([0-9]*[.][0-9]+))$';//2,2.2,.2

  var hya = function (ooo) {
    //(isNaN(ooo) || ooo === 0 || ooo === '')
    if (!ooo || !isFinite(ooo)) {return '呜喵';}
    else {return ooo};
  };
  var getFeedUps = function () {
    V2UH = document.querySelectorAll('.V2UH input:not(#UCA)');
    UCA = document.querySelector('#UCA');
    B = document.querySelector('#B');
    UH_feedup_line = document.querySelector('#UH_feedup');
    RH_feedup_line = document.querySelector('#RH_feedup');
    KH_feedup_line = document.querySelector('#KH_feedup');
    n_feedup_line = document.querySelector('#n_feedup');
    UHM_feedup_line = document.querySelector('#UHM_feedup');
    RHM_feedup = document.querySelector('#RHM_feedup');
    KHM_feedup = document.querySelector('#KHM_feedup');
    nM_feedup = document.querySelector('#nM_feedup');
    UCA_feedup = document.querySelector('#UCA_feedup');
    Sigma_feedup = document.querySelector('#Sigma_feedup');
    Mu_feedup = document.querySelector('#Mu_feedup');
  };

  var calculateV2UH = function (ipt) {
    var papa = ipt.parentNode.parentNode;
    var means = 0;    [].forEach.call(papa.children,function(td,idx){
      if(idx > 0 && idx < 5){
        means +=+td.firstChild.value;
      }
      else if ( idx == 5 ){
        var mua = means/4;
        if (isNaN(mua) || mua == 0 || mua == '') {td.innerHTML = "呜喵";}
        else {td.innerHTML = +mua.toFixed(5);}
      }
    });
  };

  var calculatyall = function () {
    var V2UHes = document.querySelectorAll('.V2UH');
    var f2_UHes = document.querySelectorAll('#UH-IS .V2UH>td:last-child');
    var f4_UHes = [].slice.call(UH_feedup_line.children,1);

    //data for calculate
    var caUHes = [],
        caKHes = [],
        caRHes = [],
        canes = [],
        cKHM = 0,
        cRHM = 0,
        cnM = 0,
        cSigma = 0,
        cMu = 0,
        cIS = .004,
        cUCA = +UCA.value * .001,
        cb = .004,
        cL = .003,
        cd = .0005;
        ce = 1.602176565e-19;
        cB = +B.value * .001;
    //recalculate all UH
    [].filter.call(V2UHes,function(el,index,arr){el.children[1].firstChild.dispatchEvent(new Event('change'));});

    //copy all UH from table#2 to table #4, set caUHes value
    [].filter.call(f2_UHes,function(el,index,arr){f4_UHes[index].innerHTML = el.innerHTML;caUHes.push( +el.innerHTML * .001 )});

    UCA_feedup.innerHTML = ' ' + cUCA;
    //calculate every KH
    caUHes.filter(function(value,index,arr){
      caKHes.push( ( +caUHes[index] / ( (index + 1) * .001 * cB) ) );
    });

    //calculate averange of KH
    cKHM = caKHes.reduce(function (a,b) { return a + b; }) / caKHes.length;

    //calculate every RH,n
    caKHes.filter(function(kh,index,arr){
      caRHes.push(caKHes[index] * cd);
      canes.push(1/(caRHes[index] * ce));
    });

    cRHM = caRHes.reduce(function (a,b) { return(+a+b); }) / caRHes.length;
    cnM = canes.reduce(function (a,b) { return(+a+b); }) / canes.length;

    cSigma = .2 * .001 * cL / (cUCA * cb * cd );
    cMu = cSigma * Math.abs(cRHM);

    //let's feedup data
    [].filter.call(KH_feedup_line.children,function (el,index,arr) {
      if(index > 0) el.innerHTML = hya(caKHes[index-1]);
    });
    [].filter.call(RH_feedup_line.children,function (el,index,arr) {
      if(index > 0) el.innerHTML = hya(caRHes[index-1]);
    });
    [].filter.call(n_feedup_line.children,function (el,index,arr) {
      if(index > 0) el.innerHTML = hya(canes[index-1]);
    });

    KHM_feedup.children[1].innerHTML = hya(cKHM);
    RHM_feedup.children[1].innerHTML = hya(cRHM);
    nM_feedup.children[1].innerHTML = hya(cnM);
    Sigma_feedup.innerHTML = hya(cSigma);
    Mu_feedup.innerHTML = hya(cMu);
  };
  var bindEvents = function () {
    [].forEach.call(V2UH,function(ipt,idx){
      ipt.addEventListener('keyup',function(){calculateV2UH(ipt)});
      ipt.addEventListener('change',function(){calculateV2UH(ipt)});
      ipt.setAttribute('pattern',inputPattern );
    });
    UCA.addEventListener('keyup',calculatyall);
    UCA.addEventListener('change',calculatyall);
    UCA.setAttribute('pattern',inputPattern );
    B.addEventListener('keyup',calculatyall);
    B.addEventListener('change',calculatyall);
    B.setAttribute('pattern',inputPattern );
  };
  this.da = function() {
     getFeedUps();
     bindEvents();
   };
};
